<template>
  <div class="grid">
    <div class="login">
      <div @keypress.enter="login">
        <img
          src="@/assets/images/Logo-verde.png"
          class="logo"
          alt="Logo PIB GAMA"
          width="100px"
          height="100px"
        />
        <b-field>
          <b-input
            type="email"
            placeholder="Email"
            icon="email"
            v-model="email"
          ></b-input>
        </b-field>
        <b-field>
          <b-input
            type="password"
            password-reveal
            placeholder="Senha"
            icon="key"
            v-model="password"
          ></b-input>
        </b-field>
        <div class="actions">
          <b-button type="is-primary" @click="login">Login</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Login",
  computed: {
    ...mapGetters("auth", ["getToken"])
  },
  data: () => ({
    email: null,
    password: null
  }),
  methods: {
    ...mapActions("auth", { auth: "login" }),
    async login() {
      try {
        await this.auth({
          login: this.email,
          password: this.password
        });
        this.$router.push(this.$route.query.redirect || "/");
      } catch (error) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Error ao Logar`,
          position: "is-bottom",
          type: "is-danger"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  // background-image: url("../assets/images/background-login.jpg");
  background-color: darkslategray;
  .login {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.24), 0 3px 10px rgba(0, 0, 0, 0.26);
    min-width: 400px;
    width: 500px;
    border-radius: 7px;
    padding: 20px 20px;
    background-color: white;
  }
}
.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
@media only screen and (max-width: 750px) {
  .grid {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/images/background-login.jpg") auto;
    .login {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      min-width: 200px;
      width: 300px;
      border-radius: 7px;
      padding: 20px 20px;
      background-color: white;
    }
  }
}
</style>
