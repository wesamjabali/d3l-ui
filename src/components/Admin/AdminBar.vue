<template>
  <div>
    <NewCourse v-if="new_course" @done="new_course = false" />
    <AddRole v-if="add_role" @done="add_role = false" />
    <AddCourse v-if="add_course" @done="add_course = false" />
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Admin Tools
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="item in mylist"
          :key="item.name"
          @click="item.action"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import NewCourse from "@/components/Admin/NewCourse";
import AddRole from "@/components/Admin/AddRole";
import AddCourse from "@/components/Admin/AddCourse";
export default {
  name: "AdminBar",
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
      mylist: [
        {
          name: "Add New Course",
          action: () => {
            this.new_course = true;
          },
        },
        {
          name: "Add Course",
          action: () => {
            this.add_course = true;
          },
        },
        {
          name: "Add Role",
          action: () => {
            this.add_role = true;
          },
        },
      ],

      selected: "",
      new_course: false,
      add_role: false,
      add_course: false,
    };
  },
};
</script>
