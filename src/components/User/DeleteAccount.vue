<template>
  <v-dialog width="500px" v-model="dialog">
    <v-card>
      <div class="pa-4 secondary white--text">
        <div class="title">
          Are you sure you want to delete your account?
        </div>
        <div class="caption">
          This action cannot be undone!
        </div>
      </div>
      <v-card-actions class="py-4">
        <v-spacer />
        <v-btn color="error" outlined v-on:click="submit"> Delete Account </v-btn>
        <v-btn color="success" v-on:click="$emit('done')"> Cancel </v-btn>
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
