<template>
  <div>
    <NewCourse v-if="new_course" @done="new_course = false" />
    <AddRole v-if="add_role" @done="add_role = false" />
    <AddCourse v-if="add_course" @done="add_course = false" />

    <v-row class="justify-center">
      <v-col cols="12">
        <div>
          {{ result }}
          <v-btn v-on:click="new_course = true">New Course</v-btn>
          <v-btn v-on:click="add_role = true">Add Role</v-btn>
          <v-btn v-on:click="add_course = true">Add Course</v-btn>
          <v-btn v-on:click="$snack.success('Snackbar!')">SnackBar</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NewCourse from "@/components/Admin/NewCourse";
import AddRole from "@/components/Admin/AddRole";
import AddCourse from "@/components/Admin/AddCourse";

export default {
  name: "Home",
  components: {
    NewCourse,
    AddRole,
    AddCourse,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  data() {
    return {
      result: "",
      new_course: false,
      add_role: false,
      add_course: false,
    };
  },
  methods: {
    async test_button() {
      this.new_course = true;
      await this.$axios
        .get("/admin/user/getAllUsers")
        .then((res) => console.log(res.data))
        .catch(() => console.log("You don't have permission!"));
    },
  },
};
</script>
