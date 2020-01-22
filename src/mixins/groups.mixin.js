import { mapState } from "vuex";
import _ from "lodash";

export const formErrorMessageMixin = {
  computed: {
    ...mapState("groups", ["groupTypes"])
  },

  methods: {}
};
