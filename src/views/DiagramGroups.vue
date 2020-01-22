<template>
  <div id="tree"></div>
</template>

<script>
import * as Treeviz from "treeviz";
import { mapState, mapActions } from "vuex";
import GroupDetailsModalVue from "../components/groups/GroupDetailsModal.vue";
export default {
  computed: {
    ...mapState("groups", ["groups"])
  },
  async mounted() {
    await this.getGroups();
    let myTree = Treeviz.create({
      htmlId: "tree",
      idKey: "_id",
      flatData: true,
      nodeColor: () => "grey",
      relationnalField: "parent",
      nodeWidth: 120,
      nodeHeight: 60,
      isHorizontal: true,
      linkWidth: () => 2,
      linkShape: "quadraticBeziers",
      mainAxisNodeSpacing: 1.3,
      secondaryAxisNodeSpacing: 1.2,
      renderNode: node => {
        return `
        <div style="height:${node.settings.nodeHeight}px;
          display:flex;
          align-items:center; 
          justify-content: center; 
          margin-left:12px;
          border: 1px solid black;
          border-radius: 4px;
          text-align:center;
          "
          >
          <strong>${node.data.name}</strong>
        </div>`;
      }
    });

    // Display the tree based on the data
    myTree.refresh(
      this.groups.map(group => ({
        ...group,
        parent: group.parent ? group.parent._id : null
      }))
    );
  },
  methods: {
    ...mapActions("groups", ["getGroups"]),
    openDetails(group) {
      this.$buefy.modal.open({
        parent: this,
        component: GroupDetailsModalVue,
        hasModalCard: true,
        props: {
          group
        }
      });
    }
  }
};
</script>

<style lang="scss">
#tree {
  overflow: scroll;
  height: 200vh;
  min-width: 1400px;
  position: relative;
  width: 100%;
  height: 500vh;
  overflow: scroll !important;
  /deep/ {
    overflow: scroll !important;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
  align-items: flex-start;
  svg {
    display: flex;
    flex-direction: column;
    justify-content: flex-start !important;
    align-items: flex-start;
  }
}
</style>
