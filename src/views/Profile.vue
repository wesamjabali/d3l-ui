<template>
  <v-row>
    <DeleteAccount v-if="deleteDialog" @done="deleteDialog = false" />
    <div class="mx-auto">
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
        <v-form ref="userProfileForm" :disabled="!editing">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                outlined
                v-model="email"
                name="E-Mail"
                type="text"
                label="E-Mail"
                value="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="phone_number"
                label="Phone Number"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="d-flex">
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="first_name"
                label="First Name"
                value="first_name"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="middle_name"
                label="Middle Name"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                v-model="last_name"
                label="Last Name"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="street_address"
                label="Street Address"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field v-model="city" label="City" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="state"
                label="State"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="3">
              <v-text-field
                v-model="zip_code"
                label="Zip Code"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-card-actions class="justify-end">
            <v-btn
              type="button"
              color="red"
              outlined
              v-if="editing"
              class="mr-5"
              @click="deleteDialog = true"
              >{{ $vuetify.breakpoint.smAndUp ? "Delete Account" : "Delete" }}
            </v-btn>
            <v-btn
              type="button"
              color="grey"
              v-if="!editing"
              @click="editing = !editing"
              class="mr-5"
              >Edit</v-btn
            >
            <v-btn type="button" color="info" v-if="editing" class="mr-5">{{
              $vuetify.breakpoint.smAndUp ? "Save Changes" : "Save"
            }}</v-btn>
            <v-btn
              type="button"
              color="grey"
              v-if="editing"
              @click="editing = !editing"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </div>
  </v-row>
</template>

<script>
import DeleteAccount from "@/components/User/DeleteAccount.vue";
export default {
  components: { DeleteAccount },
  name: "Profile",

  data() {
    return {
      editing: false,
      deleteDialog: false,
      profile: [],
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      state: "",
      zip_code: "",
      street_address: "",
      phone_number: "",
      city: "",
    };
  },
  mounted() {
    this.get_profile();
  },
  methods: {
    async get_profile() {
      await this.$axios.get("/user/profile").then((res) => {
        const profile = res.data;
        const address_split = profile.address.split(",");

        this.first_name = profile.first_name;
        this.last_name = profile.last_name;
        this.middle_name = profile.middle_name;
        this.email = profile.email;
        this.phone_number = profile.phone;
        this.street_address = address_split[0];
        this.city = address_split[1];
        this.state = address_split[2];
        this.zip_code = address_split[3];
      });
    },
  },
};
</script>
