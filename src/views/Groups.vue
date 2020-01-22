<template>
  <div class="dataTable">
    <div class="actions">
      <div class="filters">
        <b-field>
          <b-input
            placeholder="Search..."
            v-model="search"
            type="search"
            icon="magnify"
          ></b-input>
        </b-field>
        <b-field
          :type="{ 'is-danger': errors.has('groupTypes') }"
          :message="errors.first('groupTypes')"
        >
          <b-select
            placeholder="Selecione o tipo"
            name="groupTypes"
            v-model="filterPerType"
          >
            <option :value="null">Todos</option>
            <option
              v-for="(option, i) in groupTypes"
              :value="option.value"
              :key="i"
              >{{ option.label }}</option
            >
          </b-select>
        </b-field>
      </div>

      <div class="buttons">
        <b-button
          type="is-success"
          class="button-add"
          icon-left="plus"
          outlined
          @click="createGroup()"
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
      :checked-rows.sync="checkedRows"
      per-page="10"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <template slot-scope="props">
        <b-table-column label="Nome" @click.native="openDetails(props.row)">{{
          props.row.name
        }}</b-table-column>
        <b-table-column
          label="Líder(es)"
          @click.native="openDetails(props.row)"
          >{{
            props.row.leaders.map(leader => leader.firstName).join(", ")
          }}</b-table-column
        >
        <b-table-column label="Tipo" @click.native="openDetails(props.row)">{{
          $t(`group.types.${props.row.type}`)
        }}</b-table-column>
        <b-table-column
          label="Grupo Pai"
          @click.native="openDetails(props.row)"
          >{{ props.row.parent ? props.row.parent.name : "" }}</b-table-column
        >
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
              @click.native="deleteGroup(props.row)"
              >Deletar</b-dropdown-item
            >
          </b-dropdown>
        </b-table-column>
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
import CreateGroupModal from "@/components/groups/CreateGroupModal";
import GroupDetailsModalVue from "../components/groups/GroupDetailsModal.vue";
export default {
  computed: {
    ...mapState({
      groups: state => state.groups.groups
    }),
    ...mapState("groups", ["groupTypes"]),
    dataFilter() {
      return this.groups
        .filter(group =>
          group.name.toLowerCase().includes(this.search.toLowerCase())
        )
        .filter(group => {
          if (this.filterPerType) {
            return group.type == this.filterPerType;
          } else {
            return true;
          }
        })
        .map(group => ({
          ...group,
          creationDate: this.$moment(group.creationDate).toDate()
        }));
    }
  },
  data: () => ({
    search: "",
    filterPerType: null,
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
    await this.getGroups();
    await this.getUsers();
  },
  methods: {
    ...mapActions("groups", ["getGroups", "removeGroup"]),
    ...mapActions("users", ["getUsers"]),
    createGroup() {
      this.$buefy.modal.open({
        parent: this,
        component: CreateGroupModal,
        hasModalCard: true
      });
    },
    openDetails(group) {
      this.$buefy.modal.open({
        parent: this,
        component: GroupDetailsModalVue,
        hasModalCard: true,
        props: {
          group
        }
      });
    },
    editUser(group) {
      this.$buefy.modal.open({
        parent: this,
        component: CreateGroupModal,
        hasModalCard: true,
        props: {
          group: {
            ...group,
            parent: [group.parent]
          },
          edit: true
        }
      });
    },
    async deleteGroup(group) {
      this.$buefy.dialog.confirm({
        title: "Deletar",
        message: "Tem certeza?",
        confirmText: "Deletar",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          await this.removeGroup(group);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  .field {
    margin-right: 10px;
  }
}
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
