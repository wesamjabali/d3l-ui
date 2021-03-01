<template>
  <div>
    <NewCourse v-if="new_course" @done="new_course = false" />
    <AddRole v-if="add_role" @done="add_role = false" />
    <AddCourse v-if="add_course" @done="add_course = false" />
    <v-toolbar rounded flat color="secondary" dense>
      <v-spacer />
      <v-btn
        v-for="item in admin_actions"
        text
        class="white--text"
        :key="item.name"
        @click="item.action"
      >
        {{ item.name }}
      </v-btn>
      <v-spacer />
    </v-toolbar>
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
      admin_actions: [
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
