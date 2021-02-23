<template>
  <v-snackbar
    app
    text
    :color="type"
    :transition="
      $vuetify.breakpoint.xsOnly
        ? 'slide-y-reverse-transition'
        : 'slide-y-transition'
    "
    id="snack_id"
    :bottom="$vuetify.breakpoint.xsOnly"
    :top="!$vuetify.breakpoint.xsOnly"
    v-on:click.native="show = false"
    v-model="show"
  >
    <div class="d-flex justify-center">{{ message }}</div>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  computed: {
    show: {
      get() {
        return this.$store.state.snack;
      },
      set(value) {
        this.$store.commit("snack_toggle", value);
      },
    },
    message() {
      return this.$store.state.snack_message;
    },
    type() {
      return this.$store.state.snack_type;
    },
  },
  created() {
    window.addEventListener("resize", this.reposition_snackbar);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.reposition_snackbar);
  },
  methods: {
    reposition_snackbar() {
      const snack = document.getElementById("snack_id");
      snack.style.height = `${window.innerHeight}px`;
    },
  },
};
</script>
