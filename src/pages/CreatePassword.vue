<template>
  <div class="pass">
    <form>
      <b-field
        v-if="!token"
        :message="!token ? 'Token é obrigatório' : msg"
        type="is-danger"
      ></b-field>
      <b-field
        label="Crie a sua senha"
        :type="{ 'is-danger': errors.has('password') }"
        :message="errors.first('password')"
      >
        <b-input
          type="password"
          password-reveal
          placeholder="Senha"
          icon="key"
          name="password"
          v-model="password"
          :data-vv-as="'Senha'"
          v-validate="'required|min:6'"
        ></b-input>
      </b-field>
      <b-field
        :type="{ 'is-danger': errors.has('confPassword') }"
        :message="errors.first('confPassword')"
      >
        <b-input
          type="password"
          password-reveal
          placeholder="Confirme a sua senha"
          icon="key"
          name="confPassword"
          v-model="confPassword"
          :data-vv-as="'Confirmar senha'"
          v-validate="'required|min:6'"
        ></b-input>
      </b-field>
      <b-button type="is-info" :disabled="!token" @click.native="send"
        >Enviar</b-button
      >
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    password: null,
    confPassword: null,
    token: null,
    msg: null,
    is_valid: false
  }),
  mounted() {
    this.token = this.$route.query.token;
  },
  methods: {
    ...mapActions("auth", ["createPassword"]),
    async send() {
      this.is_valid = await this.$validator.validateAll();
      if (this.password === this.confPassword) {
        if (this.is_valid) {
          await this.createPassword({
            password: this.password,
            token: this.token
          });
          this.$buefy.toast.open({
            duration: 5000,
            message: `Senha criada com sucesso`,
            position: "is-bottom",
            type: "is-info"
          });
        }
      } else {
        this.msg = "Senhas diferentes";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pass {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #114357; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f29492,
    #114357
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f29492,
    #114357
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  form {
    background: white;
    border-radius: 5px;
    width: 500px;
    padding: 60px 70px;
  }
}
</style>
