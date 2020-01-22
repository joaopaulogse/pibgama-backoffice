<template>
  <div>
    <b-navbar class="navbar">
      <template slot="brand">
        <div class="menu-burguer" @click="menuOpen = !menuOpen">
          <b-icon :icon="menuOpen ? 'close' : 'menu'"></b-icon>
        </div>
        <b-navbar-item href="/" class="logo">
          <img
            src="@/assets/images/Logo-verde.png"
            alt="Primeira Igreja Batista Gama"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <span class="header-title" style="color: white;">
          {{ menus.find(menu => menu.link === $route.path).name }}
        </span>
      </template>
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="logged" v-if="user">
            <strong>{{ user.firstName }}</strong>
            <p>{{ user.email }}</p>
          </div>
          <div class="logout" @click="logout">
            <b-icon pack="fas" icon="sign-out-alt" size="is-small"></b-icon>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="menu-tools" v-show="menuOpen">
      <ul>
        <router-link
          :to="menu.link"
          tag="li"
          v-for="(menu, i) of menus"
          :key="i"
          exact
        >
          <b-icon
            :icon="menu.icon"
            :pack="menu.fas ? menu.fas : ''"
            size="is-small"
          ></b-icon>
          {{ menu.name }}
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", { user: "getUser" })
  },
  async mounted() {
    await this.me();
  },
  data: () => ({
    menuOpen: false,
    menus: [
      {
        name: "Dashboard",
        link: "/",
        icon: "chart-donut"
      },
      {
        name: "Membros",
        link: "/users",
        icon: "account"
      },
      {
        name: "Grupos",
        link: "/groups",
        icon: "account-multiple"
      },
      {
        name: "Arvores de Grupos",
        link: "/groupsTree",
        icon: "account-multiple"
      },
      {
        name: "Cultos",
        link: "/cults",
        icon: "church"
      }
    ]
  }),
  methods: {
    ...mapActions("auth", { signOut: "logout", me: "me" }),
    logout() {
      this.signOut();
      this.$router.push("/auth");
    }
  }
};
</script>

<style lang="scss" scoped>
.header-title {
  margin: 22px;
}
.menu-tools {
  position: absolute;
  left: 0;
  top: 70px;
  width: 200px;
  background: black;
  height: 100%;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.5);
  color: white;
  z-index: 31;
  li {
    padding: 5px;
    color: white;
    cursor: pointer;

    &:hover,
    &.router-link-exact-active {
      background-color: white;
      color: black;
    }
  }
}
.menu-burguer {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 50px;
  height: 100%;
}
.navbar {
  background-color: black;
  color: white;
  fill: white;
  height: 70px;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.5);
}
.logged {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  justify-content: center;
  align-items: flex-end;
}
.logged,
.logout {
  strong {
    color: white;
  }
  color: white;
}
.logout {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-left: 15px;
  height: 100%;
  cursor: pointer;
}
.logo {
  padding: 0 0 0 10px;
}
</style>
