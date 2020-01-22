<template>
  <div class="dataTable">
    <div class="actions">
      <b-field>
        <b-input
          placeholder="Search..."
          v-model="search"
          type="search"
          icon="magnify"
        ></b-input>
      </b-field>
      <div class="buttons">
        <b-button
          type="is-success"
          class="button-add"
          icon-left="plus"
          outlined
          @click="createUser()"
          >Criar um novo</b-button
        >
        <b-button
          type="is-info"
          class="button-add"
          icon-left="file"
          outlined
          disabled
          >Export</b-button
        >
      </div>
    </div>
    <b-table
      class="table"
      :data="dataFilter"
      ref="table"
      paginated
      hoverable
      detailed
      detail-key="_id"
      :checked-rows.sync="checkedRows"
      per-page="10"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <template slot-scope="props">
        <b-table-column label="Nome">{{ props.row.firstName }}</b-table-column>
        <b-table-column label="Email">{{ props.row.email }}</b-table-column>
        <b-table-column>
          <b-dropdown aria-role="list">
            <b-icon icon="dots-vertical" slot="trigger"></b-icon>

            <b-dropdown-item
              aria-role="listitem"
              @click.native="editUser(props.row)"
              >Editar</b-dropdown-item
            >
            <b-dropdown-item
              aria-role="listitem"
              @click.native="deleteUser(props.row)"
              >Deletar</b-dropdown-item
            >
          </b-dropdown>
        </b-table-column>
      </template>
      <template slot="detail" slot-scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <div class="detail-user">
                <b-table
                  :data="dataFilter.filter(data => data._id === props.row._id)"
                >
                  <b-table-column label="ID">
                    <b-tooltip :label="props.row._id" position="is-bottom">
                      ...{{ props.row._id.substring(15) }}
                    </b-tooltip>
                  </b-table-column>
                  <b-table-column label="Nome">
                    {{ props.row.firstName }}
                  </b-table-column>
                  <b-table-column label="Sobrenome">
                    {{ props.row.lastName }}
                  </b-table-column>
                  <b-table-column label="Sexo">
                    {{ props.row.genre == "MALE" ? "Masculino" : "Feminino" }}
                  </b-table-column>
                  <b-table-column label="Telefone">
                    {{ props.row.phone.map(ph => ph.number).join(", ") }}
                  </b-table-column>
                  <b-table-column label="Batizado?">
                    {{ props.row.baptized ? "Sim" : "Não" }}
                  </b-table-column>
                  <b-table-column label="Nascimento">
                    {{ $moment(props.row.birthdate).format("DD/MM/YYYY") }}
                  </b-table-column>
                  <b-table-column label="Ingresso">
                    {{ $moment(props.row.dateTicket).format("DD/MM/YYYY") }}
                  </b-table-column>
                  <b-table-column label="Membresia">
                    {{
                      memberType.filter(
                        member => member.value === props.row.memberType
                      )[0].label
                    }}
                  </b-table-column>
                  <b-table-column label="CPF" v-if="props.row.cpf">
                    {{ props.row.cpf }}
                  </b-table-column>
                </b-table>
              </div>
            </div>
          </div>
        </article>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"></b-icon>
            </p>
            <p>Nenhum dado encontrado</p>
          </div>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CreateUserModal from "@/components/users/CreateUserModal";
export default {
  computed: {
    ...mapState({
      users: state => state.users.users
    }),
    ...mapState("users", ["memberType"]),
    dataFilter() {
      return this.users
        .filter(
          user =>
            user.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
            user.email.toLowerCase().includes(this.search.toLowerCase()) ||
            user.lastName.toLowerCase().includes(this.search.toLowerCase())
        )
        .map(user =>
          this._.pick(user, [
            "email",
            "firstName",
            "lastName",
            "genre",
            "baptized",
            "memberType",
            "username",
            "birthdate",
            "dateTicket",
            "cpf",
            "phone",
            "role",
            "_id"
          ])
        )
        .map(user => ({
          ...user,
          birthdate: this.$moment(user.birthdate).toDate(),
          dateTicket: this.$moment(user.dateTicket).toDate()
        }));
    }
  },
  data: () => ({
    search: "",
    checkedRows: [],
    subColumns: [
      {
        field: "_id",
        label: "ID",
        width: "20px"
      },
      {
        field: "email",
        label: "email"
      },
      {
        field: "firstName",
        label: "Nome"
      },
      {
        field: "lastName",
        label: "Sobrenome"
      },
      {
        field: "genre",
        label: "Sexo"
      }
    ],
    columns: [
      {
        field: "_id",
        label: "ID",
        width: "40",
        sortable: true
      },
      {
        field: "email",
        label: "Email",
        sortable: true
      },
      {
        field: "firstName",
        label: "First Name",
        sortable: true
      },
      {
        field: "lastName",
        label: "Last Name",
        sortable: true
      }
    ]
  }),
  async mounted() {
    await this.getUsers();
  },
  methods: {
    ...mapActions("users", ["getUsers", "removeUser"]),
    createUser() {
      this.$buefy.modal.open({
        parent: this,
        component: CreateUserModal,
        hasModalCard: true
      });
    },
    editUser(user) {
      this.$buefy.modal.open({
        parent: this,
        component: CreateUserModal,
        hasModalCard: true,
        props: {
          user,
          edit: true
        }
      });
    },
    async deleteUser(user) {
      this.$buefy.dialog.confirm({
        title: "Deletar",
        message: "Tem certeza?",
        confirmText: "Deletar",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          await this.removeUser(user);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-user {
  display: flex;
  justify-content: space-between;
  width: 80vw;
  flex-wrap: wrap;
  div {
    flex-grow: 1;
    width: 33%;
    height: 70px;
  }
}
.dataTable {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .table {
    width: 80vw;
  }
  .actions {
    width: 80vw;
    display: flex;
    justify-content: space-between;
    margin: 20px;
    .field {
      width: 300px;
    }
    // .button-add {
    //   margin-right: 10px;
    // }
  }
}
</style>
