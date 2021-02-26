<template>
  <v-dialog width="500px" v-model="dialog">
    <v-card class="px-2 py-2">
      <v-card-title class="d-flex justify-center">
        Are you sure you want to delete your account?
      </v-card-title>


      <v-card-actions>
        <v-spacer />
        <v-btn color="red" outlined v-on:click="submit"> Delete Account </v-btn>
        <v-btn color="info" v-on:click="$emit('done')"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteAccount",
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    async submit() {
      this.$axios.post("/user/delete").then(() => {
        this.$store.dispatch("logout");
        this.$snack.info("User deleted.<br />Goodbye!");
      });
    },
  },
};
</script>
