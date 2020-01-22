<template>
  <div class="dashboard">
    <div class="card groups">
      <div class="card-content">
        <p class="title">
          <b-icon icon="account-group" size="is-large"></b-icon>
        </p>
        <p class="subtitle">
          PGs: <span class="counts">{{ getCountSmall }} </span>
        </p>
        <p class="subtitle">
          Setores: <span class="counts">{{ getCountSector }} </span>
        </p>
        <p class="subtitle">
          Áreas: <span class="counts">{{ getCountArea }} </span>
        </p>
        <p class="subtitle">
          Redes: <span class="counts">{{ getCountNetwork }} </span>
        </p>
        <p class="subtitle">
          Distritos: <span class="counts">{{ getCountDistrict }} </span>
        </p>
      </div>
    </div>
    <div class="card users">
      <div class="card-content">
        <p class="title">
          <b-icon icon="account" size="is-large"></b-icon>
        </p>
        <p class="subtitle">
          Membros: <span class="counts">{{ countUsers }} </span>
        </p>
        <p class="subtitle">
          Homens: <span class="counts">{{ countUsersMale }} </span>
        </p>
        <p class="subtitle">
          Mulheres: <span class="counts">{{ countUsersFemale }} </span>
        </p>
      </div>
    </div>
    <div class="card cults">
      <div class="card-content">
        <LineChart
          class="canvas-cults"
          ref="canvas-cults"
          :chartData="datacollectionCelebration"
          :options="{ onResize: () => console.log }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getChart } from "../components/dashboard/Chart";
export default {
  components: {
    LineChart: getChart("Line")
  },
  computed: {
    ...mapGetters("groups", [
      "getCountSmall",
      "getCountSector",
      "getCountArea",
      "getCountNetwork",
      "getCountDistrict"
    ]),
    ...mapGetters("users", [
      "countUsers",
      "countUsersMale",
      "countUsersFemale"
    ]),
    ...mapGetters("cults", ["datacollectionCelebration"])
  },
  async mounted() {
    await this.getGroups();
    await this.getUsers();
    await this.getCults();
  },
  methods: {
    ...mapActions("groups", ["getGroups"]),
    ...mapActions("users", ["getUsers"]),
    ...mapActions("cults", ["getCults"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  margin: 60px 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .card {
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .counts {
    font-size: 24px;
    color: rgb(1, 204, 1);
    font-weight: bold;
  }
  .groups {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 200px;
    height: 350px;
  }
  .users {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 200px;
    height: 350px;
  }
  .cults {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>
