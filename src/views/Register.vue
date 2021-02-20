<template>
  <div class="d-flex justify-center">
    <v-card class="ma-6 pa-6" width="90vw" color="#f2f2f2">
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <div class="title">
            Register
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-divider> </v-divider>
        </v-col>
      </v-row>
      <v-form
        ref="addUserForm"
        v-model="addUserFormValid"
        @submit.prevent="addUser()"
      >
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              v-model="email"
              name="E-Mail"
              type="text"
              label="E-Mail"
              required
              :rules="emailRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="phone_number"
              label="Phone Number"
              outlined
              counter="10"
              :rules="phone_number_rules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              v-model="password"
              name="password"
              type="password"
              label="Password"
              :rules="passwordRules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
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
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="first_name"
              label="First Name"
              outlined
              :rules="field_exists_rule"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="middle_name"
              label="Middle Name"
              outlined
              :rules="field_exists_rule"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              v-model="last_name"
              label="Last Name"
              outlined
              :rules="field_exists_rule"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="street_address"
              label="Street Address"
              outlined
              :rules="field_exists_rule"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              :rules="field_exists_rule"
              v-model="city"
              label="City"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-autocomplete
              v-model="state"
              :items="states"
              menu-props="auto"
              label="State"
              outlined
              :rules="field_exists_rule"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" sm="3">
            <v-text-field
              v-model="zip_code"
              :counter="5"
              label="Zip Code"
              outlined
              :rules="zip_rules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn type="submit" color="primary">Register</v-btn>
          </v-col>
        </v-row>
      </v-form>
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
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6) || "Password must be greater than 6 characters",
      ],
      password_confirm_rules: [
        (v) => !!v || "This field is required",
        (v) => v == this.password || "Password not confirmed",
      ],
      phone_number_rules: [
        (v) => !!v || "This field is required",
        (v) => v && v.length == 10,
      ],
      zip_rules: [
        (v) => !!v || "This field is required",
        (v) => v && v.length == 5,
      ],
      field_exists_rule: [(v) => !!v || "This field is required"],
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
          address,
        });
        this.user_added = true;
        this.$snack.success("User created!");
        this.$router.push("/");
      } catch (error) {
        this.$snack.error("User already exists with that e-mail.");
      }
    },
  },
};
</script>
