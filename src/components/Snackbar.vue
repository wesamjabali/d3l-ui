<template>
  <v-snackbar
    :color="type"
    text
    :transition="
      $vuetify.breakpoint.xsOnly
        ? 'slide-y-reverse-transition'
        : 'slide-y-transition'
    "
    :top="!$vuetify.breakpoint.xsOnly"
    :bottom="$vuetify.breakpoint.xsOnly"
    v-model="show"
  >
    {{ message }}
    <template v-slot:action="">
      <v-btn text @click="show = false">
        Close
      </v-btn>
    </template>
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
};
</script>
