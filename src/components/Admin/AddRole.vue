<template>
  <v-dialog persistent width="500px" v-model="dialog">
    <v-card class="px-2 py-2">
      <v-card-title class="d-flex justify-center">
        Add Role
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
          label="Roles"
          :rules="required"
          outlined
          :items="role_items"
          multiple
          small-chips
          deletable-chips
          @change="
            (input_roles) => {
              roles = toLowerCase(input_roles);
            }
          "
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
  name: "AddRole",
  data() {
    return {
      dialog: true,
      role_items: ["Admin", "Faculty"],
      all_users: [],
      user_id: "",
      roles: [],
      required: [(v) => !!v || "This field is required"],
    };
  },
  mounted() {
    this.get_all_users();
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.roles.length == 0) {
        this.$snack.error("Select a role");
        return;
      }
      const roles = this.roles;
      const user_id = this.user_id;

      await this.$axios
        .post("/admin/user/addRole", {
          roles,
          user_id,
        })
        .then(() => {
          this.$snack.success("Role added!");
          this.$emit("done");
        })
        .catch((err) => {
          if (err.response.status) {
            this.$snack.error("Role already exists");
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
    toLowerCase(str_array) {
      let lower_array = [];
      str_array.forEach((str) => lower_array.push(str.toLowerCase()));
      return lower_array;
    },
  },
};
</script>
