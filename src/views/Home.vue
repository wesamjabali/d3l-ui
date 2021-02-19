<template>
  <v-row class="justify-center">
    <v-col cols="12">
      <div>
        {{ result }}
        <br />
        <v-btn v-on:click="test_button"> Send Request </v-btn>
        <br />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  data() {
    return {
      result: ""
    };
  },
  methods: {
    async test_button() {
      await this.$axios
        .get("/admin/user/test")
        .then(res => (this.result = res.data.message))
        .catch(() => (this.result = "You don't have permission!"));
    }
  }
};
</script>
