<template>
  <div>
    <NewCourse v-if="new_course" @done="new_course = false" />
    <AddRole v-if="add_role" @done="add_role = false" />
    <AddCourse v-if="add_course" @done="add_course = false" />
    <NewTeam v-if="new_team" @done="new_team = false" />

    <v-row class="justify-center">
      <v-col cols="12">
        <div>
          {{ result }}
          <v-btn v-on:click="new_course = true">New Course</v-btn>
          <v-btn v-on:click="add_role = true">Add Role</v-btn>
          <v-btn v-on:click="add_course = true">Add Course</v-btn>
          <v-btn v-on:click="new_team = true">New Team</v-btn>
          <v-btn v-on:click="$snack.info('Snackbar!')">SnackBar</v-btn>
          <v-btn v-on:click="test_button">Send Test Request</v-btn>
          <br />
          <v-row v-for="item in mylist" :key="item.letter">
            <v-col cols="12">
              <v-card width="50px" height="50px">
                {{ item.letter }}
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NewCourse from "@/components/Admin/NewCourse";
import AddRole from "@/components/Admin/AddRole";
import AddCourse from "@/components/Admin/AddCourse";
import NewTeam from "@/components/Faculty/NewTeam";

export default {
  name: "Home",
  components: {
    NewCourse,
    AddRole,
    AddCourse,
    NewTeam,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  data() {
    return {
      result: "",
      mylist: [{ letter: "a" }, { letter: "b" }, { letter: "c" }],
      new_course: false,
      add_role: false,
      add_course: false,
      new_team: false,
    };
  },
  methods: {
    async test_button() {
      await this.$axios
        .get("/faculty/course/getAllCourses")
        .then((res) => console.log(res.data))
        .catch(() => console.log("You don't have permission!"));
    },
  },
};
</script>
