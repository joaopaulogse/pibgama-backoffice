<template>
  <div class="modal-card" :style="width">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ edit === true ? "Editar Culto" : "Cadastrar Culto" }}
      </p>
    </header>
    <section class="modal-card-body">
      <b-tabs position="is-centered" class="block">
        <b-tab-item label="Dados" icon="database">
          <form class="form-cult" @submit.prevent="save">
            <div class="flex">
              <b-field
                label="Nome"
                :type="{ 'is-danger': errors.has('nome') }"
                :message="errors.first('nome')"
              >
                <b-input
                  v-validate="'required'"
                  v-model="cult.name"
                  name="nome"
                  placeholder="Digite o nome"
                  type="text"
                  :data-vv-as="'Nome'"
                  required
                ></b-input>
              </b-field>
              <b-field
                label="Quantidade de Pessoas"
                :type="{ 'is-danger': errors.has('count') }"
                :message="errors.first('count')"
              >
                <b-input
                  v-validate="'required'"
                  v-model="cult.count"
                  name="count"
                  placeholder="Digite a quantidade"
                  type="number"
                  :data-vv-as="'Quantidade'"
                  required
                ></b-input>
              </b-field>
              <b-field
                label="Tipo do Culto"
                :type="{ 'is-danger': errors.has('cultTypes') }"
                :message="errors.first('cultTypes')"
              >
                <b-select
                  placeholder="Selecione o tipo"
                  name="cultTypes"
                  v-model="cult.type"
                  :data-vv-as="'Tipo de Culto'"
                  v-validate="'required'"
                >
                  <option
                    v-for="(option, i) in types"
                    :value="option"
                    :key="i"
                    >{{ option }}</option
                  >
                </b-select>
              </b-field>
            </div>
            <div class="flex">
              <b-field
                label="Data do Culto"
                :type="{ 'is-danger': errors.has('creationDate') }"
                :message="errors.first('creationDate')"
                class="creationDate"
              >
                <b-datepicker
                  class="creationDate"
                  placeholder="Click para selecionar..."
                  icon="calendar-today"
                  v-model="cult.date"
                  name="creationDate"
                  :data-vv-as="'Data de Criação'"
                  v-validate="'required'"
                  :date-formatter="date => date.toLocaleDateString('pt-br')"
                ></b-datepicker>
              </b-field>
            </div>
            <b-field label="Observações">
              <b-input
                maxlength="200"
                type="textarea"
                v-model="cult.note"
              ></b-input>
            </b-field>
          </form>
        </b-tab-item>
        <b-tab-item label="Acesso" icon="login" :disabled="edit != true">
        </b-tab-item>
      </b-tabs>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Fechar
      </button>
      <button class="button is-primary" type="submit" @click="save">
        Salvar
      </button>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("cults", ["cults", "types"])
  },
  props: {
    cult: {
      type: Object,
      default: () => ({})
    },
    edit: {
      type: Boolean,
      default: false
    },
    width: String
  },
  data: () => ({
    is_valid: false,
    role: "USER",
    url: null
  }),
  methods: {
    ...mapActions("cults", ["createOrUpdateCult"]),
    goTo(url) {
      window.open(url, "_blank");
    },
    async save() {
      this.is_valid = await this.$validator.validateAll();
      if (this.is_valid) {
        try {
          let cult = {
            ...this.cult,
            date: this.$moment(this.cult.date)
              .toDate()
              .toISOString()
          };
          await this.createOrUpdateCult({ ...cult, edit: this.edit });
          this.$parent.close();
        } catch (error) {
          this.$buefy.toast.open({
            duration: 5000,
            message: `Error ao salvar`,
            position: "is-bottom",
            type: "is-danger"
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.access {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.input-phone {
  display: flex;
  justify-content: flex-start;
  align-items: space-between;
  .control {
    padding: 5px 2px;
  }
  .input {
    margin-top: 5px;
    width: 200px;
  }
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  margin: 20px 0;
  .members {
    width: 320px;
    div {
      width: 300px;
      margin-right: 0px;
    }
  }
  .field {
  }
  .create-user {
  }
  div {
    padding: 0 20px 0 0;
  }
  button {
    margin: 32px 0px 0 0px;
  }
}
.password {
  margin: 10px 0;
}
</style>
