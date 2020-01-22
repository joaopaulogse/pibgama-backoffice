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
          :type="{ 'is-danger': errors.has('types') }"
          :message="errors.first('types')"
        >
          <b-select
            placeholder="Selecione o tipo"
            name="types"
            v-model="filterPerType"
          >
            <option :value="null">Todos</option>
            <option v-for="(option, i) in types" :value="option" :key="i">{{
              option
            }}</option>
          </b-select>
        </b-field>
      </div>

      <div class="buttons">
        <b-button
          type="is-success"
          class="button-add"
          icon-left="plus"
          outlined
          @click="createCult()"
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
        <b-table-column label="ID">
          <b-tooltip :label="props.row._id" position="is-bottom">
            ...{{ props.row._id.substring(15) }}
          </b-tooltip>
        </b-table-column>
        <b-table-column label="Nome">{{ props.row.name }}</b-table-column>
        <b-table-column label="Quantidade">{{
          props.row.count
        }}</b-table-column>
        <b-table-column label="Data">{{
          $moment(props.row.date).format("DD/MM/YYYY")
        }}</b-table-column>
        <b-table-column label="Tipo">{{ props.row.type }}</b-table-column>
        <b-table-column label="Observações">{{
          props.row.note
        }}</b-table-column>
        <b-table-column>
          <b-dropdown aria-role="list">
            <b-icon icon="dots-vertical" slot="trigger"></b-icon>

            <b-dropdown-item
              aria-role="listitem"
              @click.native="editCult(props.row)"
              >Editar</b-dropdown-item
            >
            <b-dropdown-item
              aria-role="listitem"
              @click.native="deleteCult(props.row)"
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
import CreateCultRegisterModalVue from "../components/cults/CreateCultRegisterModal.vue";
export default {
  computed: {
    ...mapState("cults", ["cults", "types"]),
    dataFilter() {
      return this.cults
        .filter(
          cult =>
            cult.name.toLowerCase().includes(this.search.toLowerCase()) ||
            cult.type.toLowerCase().includes(this.search.toLowerCase())
        )
        .filter(cult => {
          if (this.filterPerType) {
            return cult.type == this.filterPerType;
          } else {
            return true;
          }
        })
        .map(cult => ({
          ...cult,
          date: this.$moment(cult.date).toDate()
        }));
    }
  },
  async mounted() {
    await this.getCults();
  },
  data: () => ({
    search: "",
    filterPerType: null,
    checkedRows: []
  }),
  methods: {
    ...mapActions("cults", ["getCults", "removeCult"]),
    createCult() {
      this.$buefy.modal.open({
        parent: this,
        component: CreateCultRegisterModalVue,
        hasModalCard: true
      });
    },
    editCult(cult) {
      this.$buefy.modal.open({
        parent: this,
        component: CreateCultRegisterModalVue,
        hasModalCard: true,
        props: {
          cult,
          edit: true
        }
      });
    },
    async deleteCult(group) {
      this.$buefy.dialog.confirm({
        title: "Deletar",
        message: "Tem certeza?",
        confirmText: "Deletar",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          await this.removeCult(group);
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
