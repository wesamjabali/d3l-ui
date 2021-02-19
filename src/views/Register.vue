<template>
  <v-row no-gutters>
    <v-col cols="12" class="d-flex justify-center">
      <v-card
        class="ma-6 pa-6"
        :width="$vuetify.breakpoint.xsOnly ? '100vw' : '70vw'"
        color="#f2f2f2"
        :disabled="user_added"
      >
        <div class="title">
          Register
        </div>
        <v-divider class="my-3"></v-divider>
        <v-form
          ref="addUserForm"
          v-model="addUserFormValid"
          @submit.prevent="addUser()"
        >
          <v-row>
            <v-col cols="12" md="2">
              <v-avatar app color="primary" rounded size="175"></v-avatar>
            </v-col>

            <v-col cols="13" md="4">
              <v-file-input
                app
                label="File input"
                filled
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                outlined
                v-model="email"
                :counter="200"
                name="email"
                type="text"
                label="email"
                required
                :rules="emailRules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                outlined
                v-model="password"
                :counter="200"
                name="password"
                type="password"
                label="Password"
                :rules="passwordRules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                outlined
                v-model="password_confirm"
                :counter="200"
                name="password_confirm"
                type="password"
                label="Confirm Password"
                :rules="password_confirm_rules"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="first_name"
                    :counter="200"
                    label="First Name"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="middle_name"
                    :counter="200"
                    label="Middle Name"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="last_name"
                    :counter="200"
                    label="Last Name"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-container fluid>
            <v-row>
              <v-col cols="12" md="4">
                <v-autocomplete
                  v-model="state"
                  :items="states"
                  menu-props="auto"
                  label="States"
                  prepend-icon="mdi-map"
                  single-line
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" md="4"> </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="zip_code"
                  :counter="5"
                  label="Zip Code"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="street_address"
                label="Street Address"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="phone_number"
                label="Phone Number"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="d-flex justify-center">
            <v-btn type="submit" :disabled="!addUserFormValid" color="blue"
              >Add User</v-btn
            >
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { states } from "@/assets/states.js";
export default {
  name: "Register",

  data() {
    return {
      email: "",
      password: "",
      password_confirm: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      state: "",
      zip_code: "",
      street_address: "",
      phone_number: "",
      user_added: false,

      states: states,

      addUserFormValid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          (v && v.length >= 6) || "Password must be greater than 6 characters"
      ],
      password_confirm_rules: [
        v => v == this.password || "Password not confirmed"
      ]
    };
  },
  methods: {
    async addUser() {
      if (!this.$refs.addUserForm.validate()) {
        this.addUserFormValid = false;
        return;
      }

      try {
        let email = this.email.toLowerCase();
        let password = this.password;
        let first_name = this.first_name;
        let last_name = this.last_name;
        let phone = this.phone_number;
        let address = this.street_address;
        await this.$axios.post("/non_auth/register", {
          email,
          password,
          first_name,
          last_name,
          phone,
          address
        });
        this.user_added = true;
        alert("User added.");
      } catch (error) {
        alert("Error: User already exists.");
      }
    }
  }
};
</script>
