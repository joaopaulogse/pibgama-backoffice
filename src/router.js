import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
import store from "./store";
import _ from "lodash";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "",
          name: "Dashboard",
          component: () =>
            import(/* webpackChunkName: "Dashboard" */ "./views/Dashboard.vue")
        },
        {
          path: "users",
          name: "Users",
          component: () =>
            import(/* webpackChunkName: "Users" */ "./views/Users.vue")
        },
        {
          path: "groups",
          name: "Groups",
          component: () =>
            import(/* webpackChunkName: "Groups" */ "./views/Groups.vue")
        },
        {
          path: "groupsTree",
          name: "GroupsTree",
          component: () =>
            import(/* webpackChunkName: "Groups" */ "./views/DiagramGroups.vue")
        },
        {
          path: "cults",
          name: "Cults",
          component: () =>
            import(/* webpackChunkName: "Cults" */ "./views/Cults.vue")
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/auth",
      name: "auth",
      component: () =>
        import(/* webpackChunkName: "Login" */ "./pages/Login.vue")
    },
    {
      path: "/auth/createPassword",
      name: "createPassword",
      component: () =>
        import(/* webpackChunkName: "Password" */ "./pages/CreatePassword.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const auth = store.getters["auth/getToken"];
    if (_.isEmpty(auth)) {
      next({
        path: "/auth"
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
