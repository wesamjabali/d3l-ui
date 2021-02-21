<template>
  <div>
    <NewCourse v-if="new_course" @done="new_course = false" />
    <v-row class="justify-center">
      <v-col cols="12">
        <div>
          {{ result }}
          <v-btn v-on:click="test_button"> Send Request </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NewCourse from "@/components/NewCourse";

export default {
  name: "Home",
  components: {
    NewCourse
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  data() {
    return {
      result: "",
      new_course: false
    };
  },
  methods: {
    async test_button() {
      this.new_course = true;
      await this.$axios
        .get("/admin/user/getAllUsers")
        .then(res => (console.log(res.data)))
        .catch(() => (console.log("You don't have permission!")));
    }
  }
};
</script>
