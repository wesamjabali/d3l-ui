<template>
  <div class="d-flex justify-center">
    <v-card
      class="ma-6 pa-6"
      width="90vw"
      color="#f2f2f2"
      :disabled="user_added"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="title">
              Register
            </div>
            <v-divider class="my-3"></v-divider>
          </v-col>
        </v-row>
        <v-form
          ref="addUserForm"
          v-model="addUserFormValid"
          @submit.prevent="addUser()"
        >
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                outlined
                v-model="email"
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
                name="password_confirm"
                type="password"
                label="Confirm Password"
                :rules="password_confirm_rules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="d-flex">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="first_name"
                label="First Name"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="middle_name"
                label="Middle Name"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="last_name"
                label="Last Name"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="street_address"
                label="Street Address"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field v-model="city" label="City" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-autocomplete
                v-model="state"
                :items="states"
                menu-props="auto"
                label="State"
                outlined
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="2">
              <v-text-field
                v-model="zip_code"
                :counter="5"
                label="Zip Code"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="phone_number"
                label="Phone Number"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn type="submit" :disabled="!addUserFormValid" color="blue"
                >Add User</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </div>
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
      city: "",
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
        let address =
          this.street_address +
          ", " +
          this.city +
          ", " +
          this.state +
          ", " +
          this.zip_code;

        await this.$axios.post("/non_auth/register", {
          email,
          password,
          first_name,
          last_name,
          phone,
          address
        });
        this.user_added = true;
        this.$snack.success("User created!");
      } catch (error) {
        this.$snack.error("User already exists.");
      }
    }
  }
};
</script>
