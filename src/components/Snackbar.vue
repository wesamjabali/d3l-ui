<template>
  <v-snackbar rounded="pill" v-model="snackbar">
    {{ message }}
    <template v-slot:action="">
      <v-btn color="blue" text @click="$emit('done')">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    message: String
  },
  watch: {
    snackbar() {
      if (!this.snackbar) {
        this.$emit("done");
      }
    }
  },
  data() {
    return {
      error: false,
      snackbar: true
    };
  }
};
</script>
