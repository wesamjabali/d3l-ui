<template>
  <div>
    <NewCourse v-if="new_course" @done="new_course = false" />
    <AddRole v-if="add_role" @done="add_role = false" />
    <AddCourse v-if="add_course" @done="add_course = false" />
    <NewTeam v-if="new_team" @done="new_team = false" />
    <AddTeam v-if="add_team" @done="add_team = false" />
    <FileTest v-if="file_test" @done="file_test = false" />

    <v-row class="justify-center">
      <v-col cols="12">
        <div>
          {{ result }}
          <v-btn v-on:click="new_course = true">New Course</v-btn>
          <v-btn v-on:click="add_role = true">Add Role</v-btn>
          <v-btn v-on:click="add_course = true">Add Course</v-btn>
          <v-btn v-on:click="file_test = true">File Test</v-btn>

          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Manage teams
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="item in mylist"
                :key="item.name"
                @click="test_button(item)"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn v-on:click="$snack.info('Snackbar!')">SnackBar</v-btn>
          <v-btn v-on:click="test_button">Send Test Request</v-btn>
          <v-btn
            v-on:click="
              () => {
                $axios.post('/faculty/team/delete', { team_id: '1' });
              }
            "
          >
            Delete team
          </v-btn>
          <br />
          <v-row>
            <v-col v-for="c in courses" :key="c.code" cols="6" sm="4">
              <v-card class="mx-auto">
                <v-card-title> {{ c.name }} </v-card-title>
                <v-card-subtitle>
                  {{ c.code }}
                </v-card-subtitle>
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
import AddTeam from "@/components/Faculty/AddTeam";
import FileTest from "@/components/Faculty/FileTest";

export default {
  name: "Home",
  components: {
    NewCourse,
    AddRole,
    AddCourse,
    NewTeam,
    AddTeam,
    FileTest,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  data() {
    return {
      result: "",
      mylist: [
        { name: "Create New Team", action: "newteam" },
        { name: "Add Team Member", action: "addmember" },
      ],
      courses: [
        { name: "CLASS ONE", code: "CSC 394 801" },
        { name: "CLASS TWO", code: "CSC 102 293" },
        { name: "CLASS ONE", code: "CSC 394 802" },
        { name: "CLASS TWO", code: "CSC 102 294" },
        { name: "CLASS ONE", code: "CSC 394 804" },
        { name: "CLASS TWO", code: "CSC 102 297" },
      ],
      selected: "",
      new_course: false,
      add_role: false,
      add_course: false,
      new_team: false,
      add_team: false,
      file_test: false,
    };
  },
  methods: {
    async test_button(item) {
      if (item.action == "newteam") {
        this.new_team = true;
      } else if (item.action == "addmember") {
        this.add_team = true;
      }
    },
  },
};
</script>
