<template>
  <div class="modal-card" :style="width">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ edit === true ? "Editar Grupo" : "Cadastrar Grupo" }}
      </p>
    </header>
    <section class="modal-card-body">
      <b-tabs position="is-centered" class="block">
        <b-tab-item label="Dados" icon="database">
          <form class="form-group" @submit.prevent="save">
            <div class="flex">
              <b-field
                label="Nome"
                :type="{ 'is-danger': errors.has('nome') }"
                :message="errors.first('nome')"
              >
                <b-input
                  v-validate="'required'"
                  v-model="group.name"
                  name="nome"
                  placeholder="Digite o nome"
                  type="text"
                  :data-vv-as="'Nome'"
                  required
                ></b-input>
              </b-field>
              <b-field
                label="Tipo do Grupo"
                :type="{ 'is-danger': errors.has('groupTypes') }"
                :message="errors.first('groupTypes')"
              >
                <b-select
                  placeholder="Selecione o tipo"
                  name="groupTypes"
                  v-model="group.type"
                  :data-vv-as="'Tipo de Grupo'"
                  v-validate="'required'"
                >
                  <option
                    v-for="(option, i) in groupTypes"
                    :value="option.value"
                    :key="i"
                    >{{ option.label }}</option
                  >
                </b-select>
              </b-field>
            </div>
            <div class="flex">
              <b-field
                label="Data de Criação"
                :type="{ 'is-danger': errors.has('creationDate') }"
                :message="errors.first('creationDate')"
                class="creationDate"
              >
                <b-datepicker
                  class="creationDate"
                  placeholder="Click para selecionar..."
                  icon="calendar-today"
                  v-model="group.creationDate"
                  name="creationDate"
                  :data-vv-as="'Data de Criação'"
                  v-validate="'required'"
                  :date-formatter="date => date.toLocaleDateString('pt-br')"
                ></b-datepicker>
              </b-field>
              <b-field
                label="Dia do Grupo"
                :type="{ 'is-danger': errors.has('dayOfTheWeek') }"
                :message="errors.first('dayOfTheWeek')"
              >
                <b-select
                  placeholder="Selecione o dia"
                  name="dayOfTheWeek"
                  v-model="group.dayOfTheWeek"
                  :data-vv-as="'Dia'"
                  v-validate="'required'"
                >
                  <option
                    v-for="(option, i) in dayOfTheWeek"
                    :value="option.value"
                    :key="i"
                    >{{ option.label }}</option
                  >
                </b-select>
              </b-field>
            </div>
            <b-field
              label="Quais são os Líderes?"
              :type="{ 'is-danger': errors.has('leaders') }"
              :message="errors.first('leaders')"
            >
              <b-taginput
                v-model="group.leaders"
                :data="filterUsers"
                name="leaders"
                autocomplete
                :allow-new="true"
                :open-on-focus="true"
                field="firstName"
                icon="label"
                maxtags="3"
                placeholder="Procure e adicione o Lider"
                @typing="getFilteredTags"
                :data-vv-as="'Líder'"
                v-validate="'required'"
              >
              </b-taginput>
            </b-field>

            <div v-if="group.type === 'SMALL'">
              <b-field
                label="Quem são os Auxiliares?"
                :type="{ 'is-danger': errors.has('auxLeaders') }"
                :message="errors.first('auxLeaders')"
              >
                <b-taginput
                  v-model="group.auxLeaders"
                  :data="filterUsers"
                  name="auxLeaders"
                  autocomplete
                  :allow-new="true"
                  :open-on-focus="true"
                  field="firstName"
                  icon="label"
                  placeholder="Procure e adicione o Auxiliar"
                  @typing="getFilteredTags"
                  :data-vv-as="'Auxiliar'"
                  v-validate="''"
                >
                </b-taginput>
              </b-field>
              <div class="flex">
                <b-field
                  label="Quais são os membros?"
                  :type="{ 'is-danger': errors.has('members') }"
                  :message="errors.first('members')"
                  class="members"
                >
                  <b-taginput
                    v-model="group.members"
                    :data="filterUsers"
                    name="members"
                    autocomplete
                    :allow-new="true"
                    :open-on-focus="true"
                    field="firstName"
                    icon="account-multiple"
                    placeholder="Procure e adicione o Membro"
                    @typing="getFilteredTags"
                    :data-vv-as="'Membro'"
                    v-validate="''"
                  >
                  </b-taginput>
                </b-field>
                <b-button
                  type="is-info"
                  class="create-user"
                  @click.native="createUser"
                >
                  Criar Membro
                </b-button>
              </div>
            </div>

            <b-field
              label="Qual é o Grupo Pai?"
              :type="{ 'is-danger': errors.has('parent') }"
              :message="errors.first('parent')"
            >
              <b-taginput
                v-model="group.parent"
                :data="filterGroups"
                name="parent"
                autocomplete
                :allow-new="true"
                :open-on-focus="true"
                field="name"
                icon="account-multiple"
                placeholder="Procure e adicione o Grupo"
                @typing="getGroupFilteredTags"
                :data-vv-as="'Grupo Pai'"
                v-validate="''"
                maxtags="1"
              >
              </b-taginput>
            </b-field>
          </form>
        </b-tab-item>
        <b-tab-item label="Acesso" icon="login" :disabled="edit != true">
          <div class="access">
            <b-field label="Tipo de Permissões">
              <b-select placeholder="Selecione o tipo" v-model="role">
                <option value="USER">Usuário</option>
                <option value="ADMIN">Administrador</option>
              </b-select>
            </b-field>
            <b-button icon-left="account" type="is-info" @click.native="access"
              >Solicitar acesso para plataforma</b-button
            >
            <b-button
              class="password"
              v-if="url"
              icon-left="account"
              type="is-warning"
              @click.native="goTo(url)"
              >Crie a senha desse usuário</b-button
            >
          </div>
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
import CreateUserModal from "../users/CreateUserModal";
export default {
  computed: {
    ...mapState("groups", ["dayOfTheWeek", "groupTypes", "groups", "types"]),
    ...mapState("users", ["users"]),
    ...mapState("auth", { authUser: "user" })
  },
  props: {
    group: {
      type: Object,
      default: () => ({
        type: "SMALL",
        dayOfTheWeek: "WEDNESDAY",
        leaders: [],
        auxLeaders: []
      })
    },
    edit: {
      type: Boolean,
      default: false
    },
    width: String
  },
  mounted() {
    this.filterUsers = this.users;
    this.filterGroups = this.groups
      .filter(group => group.type !== "SMALL")
      .map(group => ({
        ...group,
        name: `${group.name} (${group.leaders
          .map(leader => leader.firstName)
          .join(", ")})`
      }));
  },
  data: () => ({
    phoneTypes: [
      { value: "RESIDENTIAL", label: "Residencial" },
      { value: "COMMERCIAL", label: "Trabalho" },
      { value: "CELL-PHONE", label: "Celular" }
    ],
    filterUsers: [],
    filterGroups: [],
    is_valid: false,
    role: "USER",
    url: null
  }),
  methods: {
    ...mapActions("groups", ["createOrUpdateGroup"]),
    nextType(group) {
      return this.types.find((type, i) => {
        let next = this.types[--i];
        if (next && next === group.type) {
          return next;
        }
      });
    },
    goTo(url) {
      window.open(url, "_blank");
    },
    createUser() {
      this.$buefy.modal.open({
        parent: this,
        component: CreateUserModal,
        hasModalCard: true
      });
    },
    async save() {
      this.is_valid = await this.$validator.validateAll();
      if (this.is_valid) {
        try {
          let group = {
            ...this.group,
            leaders: this.group.leaders.map(l => l._id),
            auxLeaders: !this._.isEmpty(this.group.auxLeaders)
              ? this.group.auxLeaders.map(l => l._id)
              : undefined,
            members: !this._.isEmpty(this.group.auxLeaders)
              ? this.group.members.map(l => l._id)
              : undefined,
            parent: !this._.isEmpty(this.group.parent)
              ? this._.first(this.group.parent.map(l => l._id))
              : undefined,
            creationDate: this.$moment(this.group.creationDate)
              .toDate()
              .toISOString()
          };
          await this.createOrUpdateGroup({ ...group, edit: this.edit });
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
    },
    getFilteredTags(text) {
      this.filterUsers = this.users.filter(option => {
        return option.firstName.toLowerCase().includes(text.toLowerCase());
      });
    },
    getGroupFilteredTags(text) {
      this.filterGroups = this.groups
        .filter(group => group.type !== "SMALL")
        .filter(option =>
          option.name.toLowerCase().includes(text.toLowerCase())
        )
        .map(group => ({
          ...group,
          name: `${group.name} (${group.leaders
            .map(leader => leader.firstName)
            .join(", ")})`
        }));
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
