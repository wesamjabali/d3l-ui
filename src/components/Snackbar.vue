<template>
  <v-snackbar><slot></slot></v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data() {
    return {
      error: false,
      message: '',
    };
  },

};
</script>

<style></style>
