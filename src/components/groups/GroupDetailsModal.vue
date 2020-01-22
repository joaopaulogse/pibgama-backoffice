<template>
  <div class="modal-card" :style="width">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ group.name }} {{ group.parent ? `| ${group.parent.name}` : "" }}
      </p>
    </header>
    <section class="modal-card-body">
      <div class="group-detail">
        <div>
          <strong>Tipo:</strong>
          <span> {{ $t(`group.types.${group.type}`) }}</span>
        </div>
        <div>
          <strong>Dia da Semana:</strong>
          <span> {{ $t(`group.dayOfTheWeek.${group.dayOfTheWeek}`) }}</span>
        </div>
        <div>
          <strong>Líderes:</strong>
          <span>
            {{ group.leaders.map(leader => leader.firstName).join(", ") }}</span
          >
        </div>
        <div v-if="group.type !== 'SMALL'">
          <strong>Grupos Filho:</strong>
          <span>
            {{
              groups
                .filter(g => g.parent && g.parent._id === group._id)
                .map(g => g.name)
                .join(", ")
            }}</span
          >
        </div>
        <div v-if="group.type === 'SMALL'">
          <strong>Quantos membros:</strong>
          <span> {{ group.members.length }}</span>
        </div>
        <div v-if="group.type === 'SMALL'">
          <strong>Membros:</strong>
          <p>
            {{ group.members.map(member => member.firstName).join(", ") }}
          </p>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Fechar
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
    width: String
  },
  watch: {
    "group.type": {
      handler(value) {
        let nextType = this.types.find((type, i) => {
          let next = this.types[++i];
          if (type === value && next) {
            return next;
          }
        });
        this.filterGroups = this.groups.filter(group => group.type == nextType);
      }
    }
  },
  mounted() {
    this.children = this.groups.filter(
      group => group.parent && group.parent._id == this.group._id
    );
  },
  data: () => ({
    phoneTypes: [
      { value: "RESIDENTIAL", label: "Residencial" },
      { value: "COMMERCIAL", label: "Trabalho" },
      { value: "CELL-PHONE", label: "Celular" }
    ],
    children: [],
    is_valid: false,
    role: "USER",
    url: null
  }),
  methods: {
    ...mapActions("groups", ["createOrUpdateGroup"]),
    goTo(url) {
      window.open(url, "_blank");
    },
    createUser() {
      this.$buefy.modal.open({
        parent: this,
        component: CreateUserModal,
        hasModalCard: true
      });
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
