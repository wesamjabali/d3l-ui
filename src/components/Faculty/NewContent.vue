<template>
  <v-dialog persistent width="500px" v-model="dialog">
    <v-card class="px-2 py-2">
      <v-card-title class="d-flex justify-center">
        Add New Content
      </v-card-title>
      <v-divider class="mb-3" />
      <v-form
        class="px-8"
        @submit.prevent="submit"
        @keyup.esc.native="$emit('done')"
        @keyup.enter.native="submit"
        ref="form"
      >
        <v-autocomplete
          label="User"
          :rules="required"
          outlined
          v-model="user_id"
          :items="all_users"
          :item-text="(user) => user.first_name + ' ' + user.last_name"
          item-value="id"
        >
        </v-autocomplete>

        <v-text-field
        label="Subject"
        single-line
        full-width
        hide-details
        ></v-text-field>
        <v-divider></v-divider>
        <v-textarea
        v-model="title"
        label="Message"
        counter
        maxlength="120"
        full-width
        single-line
        ></v-textarea>


        <v-autocomplete
          label="Team"
          :rules="required"
          outlined
          v-model="team"
          :items="all_courses"
          item-text="title"
          item-value="id"
          multiple
          small-chips
          deletable-chips
        >
        </v-autocomplete>

        <v-autocomplete
          label="Course"
          :rules="required"
          outlined
          v-model="courses"
          :items="all_courses"
          item-text="title"
          item-value="id"
          multiple
          small-chips
          deletable-chips
        >
        </v-autocomplete>
      </v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" v-on:click="submit"> Submit </v-btn>
        <v-btn text v-on:click="$emit('done')"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewContent",
  data() {
    return {
      dialog: true,
      all_users: [],
      all_courses: [],
      courses: "",
      user_id: "",
      required: [(v) => !!v || "This field is required"],
    };
  },
  mounted() {
    this.get_all_users();
    this.get_all_courses();
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.courses.length == 0) {
        this.$snack.error("Select a course");
        return;
      }
      
      const courses = this.courses;
      const user_id = this.user_id;

      await this.$axios
        .post("/admin/user/addCourse", {
          courses,
          user_id,
        })
        .then(() => {
          this.$snack.success("Course added!");
          this.$emit("done");
        })
        .catch((err) => {
          if (err.response.status) {
            this.$snack.error("Course already exists");
          } else {
            this.$snack.error("An error occurred");
          }
        });
    },
    async get_all_users() {
      await this.$axios
        .get("/admin/user/getAllUsers")
        .then((res) => {
          this.all_users = res.data.users;
        })
        .catch(() => {
          this.$snack.error("An error occurred");
        });
    },

    async get_all_team() {
      await this.$axios
        .get("/admin/user/getAllTeam")
        .then((res) => {
          this.all_team = res.data.team;
        })
        .catch(() => {
          this.$snack.error("An error occurred");
        });
    },

    async get_all_courses() {
      await this.$axios
        .get("/admin/course/getAllCourses")
        .then((res) => {
          this.all_courses = res.data.courses;
        })
        .catch(() => {
          this.$snack.error("An error occurred");
        });
    },
  },
};
</script>