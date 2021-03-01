<template>
  <v-dialog width="500px" v-model="dialog">
    <v-card>
      <div class="pa-4 title secondary white--text text-center">
          Delete account
      </div>
        <div class="pt-5 text-center">
          This action cannot be undone!
        </div>
      <v-card-actions class="pt-4">
        <v-spacer />
        <v-btn color="error" text v-on:click="submit"> Delete Account </v-btn>
        <v-btn text v-on:click="$emit('done')"> Cancel </v-btn>
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
