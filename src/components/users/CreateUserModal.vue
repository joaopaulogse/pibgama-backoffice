<template>
  <div class="modal-card" :style="width">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ edit === true ? "Editar" : "Cadastrar" }}
      </p>
    </header>
    <section class="modal-card-body">
      <b-tabs position="is-centered" class="block">
        <b-tab-item label="Dados" icon="database">
          <form class="form-user" @submit.prevent="save">
            <b-field
              label="Nome"
              :type="{ 'is-danger': errors.has('firstName') }"
              :message="errors.first('firstName')"
            >
              <b-input
                v-validate="'required'"
                v-model="user.firstName"
                name="firstName"
                placeholder="Digite o seu nome"
                type="text"
                :data-vv-as="'Nome'"
                required
              ></b-input>
            </b-field>
            <b-field
              label="Sobrenome"
              :type="{ 'is-danger': errors.has('lastName') }"
              :message="errors.first('lastName')"
            >
              <b-input
                type="text"
                v-model="user.lastName"
                name="lastName"
                placeholder="Digite o seu sobrenome"
                :data-vv-as="'Sobrenome'"
                v-validate="'required'"
                required
              ></b-input>
            </b-field>
            <b-field
              label="Email"
              :type="{ 'is-danger': errors.has('email') }"
              :message="errors.first('email')"
            >
              <b-input
                v-model="user.email"
                name="email"
                placeholder="Digite um email"
                v-validate="'required|email'"
                :data-vv-as="'Email'"
                required
              ></b-input>
            </b-field>
            <b-field
              label="CPF"
              :type="{ 'is-danger': errors.has('cpf') }"
              :message="errors.first('cpf')"
            >
              <the-mask
                type="text"
                v-model="user.cpf"
                class="input"
                name="cpf"
                placeholder="Informe o CPF"
                v-validate="'cpf|min:11'"
                :mask="['###.###.###-##']"
                :data-vv-as="'CPF'"
                required
              ></the-mask>
            </b-field>
            <div class="flex">
              <b-field
                label="Data de Nascimento"
                :type="{ 'is-danger': errors.has('birthdate') }"
                :message="errors.first('birthdate')"
                class="birthdate"
              >
                <b-datepicker
                  class="birthdate"
                  position="is-top-right"
                  placeholder="Click para selecionar..."
                  icon="calendar-today"
                  v-model="user.birthdate"
                  name="birthdate"
                  :date-formatter="date => date.toLocaleDateString('pt-br')"
                ></b-datepicker>
              </b-field>
              <b-field
                label="Data de Ingresso"
                :type="{ 'is-danger': errors.has('dateTicket') }"
                :message="errors.first('dateTicket')"
              >
                <b-datepicker
                  position="is-top-left"
                  placeholder="Click para selecionar..."
                  icon="calendar-today"
                  v-model="user.dateTicket"
                  name="dateTicket"
                  class="dateTicket"
                  :date-formatter="date => date.toLocaleDateString('pt-br')"
                ></b-datepicker>
              </b-field>
            </div>
            <div class="flex">
              <div>
                <b-field label="Sexo">
                  <b-radio
                    v-model="user.genre"
                    size="is-small"
                    name="genre"
                    native-value="MALE"
                    v-validate="'required'"
                    :data-vv-as="'Sexo'"
                    >Masculino</b-radio
                  >
                </b-field>

                <b-field
                  :type="{ 'is-danger': errors.has('genre') }"
                  :message="errors.first('genre')"
                >
                  <b-radio
                    v-model="user.genre"
                    size="is-small"
                    name="genre"
                    native-value="FEMALE"
                    v-validate="'required'"
                    :data-vv-as="'Sexo'"
                    >Feminino</b-radio
                  >
                </b-field>
              </div>
              <b-field
                label="Batizado?"
                :type="{ 'is-danger': errors.has('baptized') }"
                :message="errors.first('baptized')"
              >
                <b-switch
                  v-model="user.baptized"
                  size="is-small"
                  name="baptized"
                  native-value="MALE"
                  v-validate="'required'"
                  :data-vv-as="'Batismo'"
                  >{{ user.baptized ? "Sim" : "Não" }}</b-switch
                >
              </b-field>
              <b-field
                label="Qual o Tipo de Membresia"
                :type="{ 'is-danger': errors.has('memberType') }"
                :message="errors.first('memberType')"
              >
                <b-select
                  placeholder="Selecione o tipo"
                  name="memberType"
                  v-model="user.memberType"
                  :data-vv-as="'Membresia'"
                  v-validate="'required'"
                >
                  <option
                    v-for="(option, i) in memberType"
                    :value="option.value"
                    :key="i"
                    >{{ option.label }}</option
                  >
                </b-select>
              </b-field>
            </div>
            <div class="phone">
              <label class="label">Telefone</label>
              <div
                class="input-phone"
                v-for="(phone, i) in user.phone"
                :key="i"
              >
                <b-field
                  :type="{ 'is-danger': errors.has('phone') }"
                  :message="errors.first('phone')"
                >
                  <the-mask
                    type="text"
                    v-model="user.phone[i].number"
                    class="input"
                    name="phone"
                    placeholder="Seu telefone"
                    v-validate="'min:11'"
                    :mask="['(##) #####-####']"
                    :data-vv-as="'Telefone'"
                    required
                  ></the-mask>
                </b-field>
                <b-field
                  :type="{ 'is-danger': errors.has('type_phone') }"
                  :message="errors.first('type_phone')"
                >
                  <b-select
                    placeholder="Tipo do telefone"
                    name="type_phone"
                    v-model="user.phone[i].type"
                    :data-vv-as="'Tipo de Telefone'"
                    v-validate="''"
                    :value="user.phone[0].type"
                  >
                    <option
                      v-for="(option, i) in phoneTypes"
                      :value="option.value"
                      :key="i"
                      >{{ option.label }}</option
                    >
                  </b-select>
                </b-field>
                <p class="control">
                  <b-button
                    type="is-success"
                    icon-right="plus"
                    @click.native="user.phone.push({ number: null, type: '' })"
                  ></b-button>
                  <b-button
                    type="is-danger"
                    icon-right="delete"
                    :disabled="user.phone.length === 1"
                    @click.native="user.phone.splice(i, 1)"
                  ></b-button>
                </p>
              </div>
            </div>
            <b-field
              label="Tipo de Permissões"
              v-if="authUser.role === 'ADMIN'"
            >
              <b-select placeholder="Selecione o tipo" v-model="user.role">
                <option value="USER">Usuário</option>
                <option value="ADMIN">Administrador</option>
              </b-select>
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
import { formErrorMessageMixin } from "@/mixins";

export default {
  mixins: [formErrorMessageMixin],
  computed: {
    ...mapState("users", ["memberType"]),
    ...mapState("auth", { authUser: "user" })
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        phone: [{ number: null, type: "CELL-PHONE" }],
        baptized: false,
        role: "USER"
      })
    },
    edit: {
      type: Boolean,
      default: false
    },
    width: String
  },
  data: () => ({
    phoneTypes: [
      { value: "RESIDENTIAL", label: "Residencial" },
      { value: "COMMERCIAL", label: "Trabalho" },
      { value: "CELL-PHONE", label: "Celular" }
    ],
    is_valid: false,
    role: "USER",
    url: null
  }),
  methods: {
    ...mapActions("users", ["createOrUpdateUser", "plataformAccess"]),
    goTo(url) {
      window.open(url, "_blank");
    },
    async access() {
      this.url = await this.plataformAccess({
        _id: this.user._id,
        role: this.role
      });
    },
    async save() {
      this.is_valid = await this.$validator.validateAll();
      if (this.is_valid) {
        try {
          let user = {
            ...this.user,
            location: [],
            birthdate: this.$moment(this.user.birthdate)
              .toDate()
              .toISOString()
          };
          await this.createOrUpdateUser({ ...user, edit: this.edit });
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
.dateTicket {
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  margin: 20px 0;
  div {
    padding: 0 20px 0 0;
  }
}
.password {
  margin: 10px 0;
}
</style>
