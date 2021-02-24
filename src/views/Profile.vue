<template>
  <div class="d-flex justify-center">
    <v-card class="ma-6 pa-6" width="90vw">
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <div class="title">
            User Profile
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-divider> </v-divider>
        </v-col>
      </v-row>
      <v-form
        ref="userProfileForm"
      >
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              outlined
              v-model="email"
              name="E-Mail"
              type="text"
              label="E-Mail"
              value= email
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="phone_number"
              label="Phone Number"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              outlined
              v-model="role"
              name="Role"
              type="text"
              label="Role"
              value= role
              disabled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="d-flex">
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="first_name"
              label="First Name"
              value= first_name
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="middle_name"
              label="Middle Name"
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              v-model="last_name"
              label="Last Name"
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="street_address"
              label="Street Address"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="city"
              label="City"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="state"
              label="State"
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="3">
            <v-text-field
              v-model="zip_code"
              label="Zip Code"
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn type="button" color="primary">Save Changes</v-btn>
          </v-col>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn type="button" color="red">Delete Profile</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Profile",

  data() {
    return {
      email: this.$store.getters.email,
      first_name: this.$store.getters.first_name,
      last_name: this.$store.getters.last_name,
      middle_name: "Joe",
      role: this.$store.getters.roles,
      state: "IL",
      zip_code: "69420",
      street_address: "123 Easy Street",
      phone_number: "773-202-5862",
      city: "Chicago",
    };
  },
  methods: {
  },
};
</script>