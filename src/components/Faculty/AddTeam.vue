<template>
  <v-dialog persistent width="500px" v-model="dialog">
    <v-card class="px-2 py-2">
      <v-card-title class="d-flex justify-center">
        Add Team
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
        <v-select
          label="Team"
          :rules="required"
          v-model="team_id"
          outlined
          :items="all_teams"
          item-text="team_name"
          item-value="id"
          small-chips
        >
        </v-select>
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
  name: "AddTeam",
  data() {
    return {
      dialog: true,
      all_teams: [],
      all_users: [],
      user_id: "",
      team_id: "",
      required: [(v) => !!v || "This field is required"],
    };
  },
  props: {
    course_id: String,
  },
  mounted() {
    this.get_all_users();
    this.get_all_teams();
    // fix for v-file-input not triggering properly
    let inputs = document.querySelectorAll(".v-file-input input");
    [...inputs].forEach((input) => {
      input.remove();
    });
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      const team_id = this.team_id;
      const user_id = this.user_id;

      await this.$axios
        .post("/faculty/team/addUser", {
          user_id,
          team_id,
        })
        .then(() => {
          this.$snack.success("User added to team!");
          this.$emit("done");
        })
        .catch(() => {
          this.$snack.error("User already belongs to that team.");
        });
    },
    async get_all_users() {
      await this.$axios
        .get("/user/course/getAllUsers", {
          params: { course_id: this.course_id },
        })
        .then((res) => {
          this.all_users = res.data.users;
        })
        .catch(() => {
          this.$snack.error("An error occurred");
        });
    },
    async get_all_teams() {
      await this.$axios
        .get("/user/team/getAllForCourse", {
          params: { course_id: this.course_id },
        })
        .then((res) => {
          this.all_teams = res.data.teams;
        })
        .catch(() => {
          this.$snack.error("An error occurred");
        });
    },
    toLowerCase(str_array) {
      let lower_array = [];
      str_array.forEach((str) => lower_array.push(str.toLowerCase()));
      return lower_array;
    },
  },
};
</script>
