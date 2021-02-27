<template>
  <div>
    <NewCourse v-if="new_course" @done="new_course = false" />
    <AddRole v-if="add_role" @done="add_role = false" />
    <AddCourse v-if="add_course" @done="add_course = false" />
    <NewTeam v-if="new_team" @done="new_team = false" />
    <AddTeam v-if="add_team" @done="add_team = false" />
    <NewContent v-if="new_content" @done="new_content = false" />
    <DeleteTeam v-if="delete_team" @done="delete_team = false" />


    <v-row class="justify-center">
      <v-col cols="12">
        <div>
        <v-row class="justify-center">
          <v-menu
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Admin Tool Box
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
        </v-row>
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
import NewContent from "@/components/Faculty/NewContent";
import DeleteTeam from "@/components/Faculty/DeleteTeam";
export default {
  name: "AdminBar",
  components: {
    NewCourse,
    AddRole,
    AddCourse,
    NewTeam,
    AddTeam,
    NewContent,
    DeleteTeam,
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
        { name: "Add New Course", action: "newcourses" },
        { name: "Add Course", action: "addcourses" },
        { name: "Add Role", action: "addrole" },
        { name: "Add New Content", action: "newcontent" },
        { name: "Delete Team", action: "deleteteam" },
      ],
      
      selected: "",
      new_course: false,
      add_role: false,
      add_course: false,
      new_team: false,
      add_team: false,
      new_content: false,
      delete_team: false,
    };
  },
  methods: {
    async test_button(item) {
      if (item.action == "newteam") {
        this.new_team = true;
      } else if (item.action == "addmember") {
        this.add_team = true;
      } else if (item.action == "newcourses") {
        this.new_course = true;
      } else if (item.action == "addrole") {
        this.add_role = true;
      } else if (item.action == "addcourses") {
        this.add_course = true;
      } else if (item.action == "newcontent") {
        this.new_content = true;
      } else if (item.action == "deleteteam") {
        this.delete_team = true;
      }
    },
  },
};
</script>