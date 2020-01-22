import { mapGetters } from "vuex";
import _ from "lodash";

export const formErrorMessageMixin = {
  computed: {
    ...mapGetters({ formErrors: "getErrors" })
  },

  watch: {
    formErrors: {
      handler(errors) {
        errors.forEach(e => {
          this.errors.add({ field: e.param, msg: e.message });
        });

        const firstInvalidField = _.get(
          this.$validator,
          "errors.items[0].field"
        );
        this.focus(firstInvalidField);
      },
      deep: true
    }
  },

  methods: {
    focus(fieldName) {
      const invalidInput = this.$el.querySelector(`[name='${fieldName}']`);

      if (invalidInput) {
        invalidInput.focus();
      }
    }
  }
};
