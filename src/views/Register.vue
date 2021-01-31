<template>
  <v-row no-gutters>
    <v-col cols="12" class="d-flex justify-center">
      <v-card
        class="ma-6 pa-6"
        :width="$vuetify.breakpoint.xsOnly ? '100vw' : '70vw'"
        color="#f2f2f2"
        :disabled="userAdded"
      >
        <div class="title">
          Add User
        </div>
        <v-divider class="my-3"></v-divider>
        <v-form ref="addUserForm" v-model="addUserFormValid" @submit.prevent="addUser()">
          <v-text-field
            outlined
            v-model="email"
            name="email"
            type="text"
            label="email"
            required
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="password"
            name="password"
            type="password"
            label="Password"
            :rules="passwordRules"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="passwordConfirm"
            name="passwordConfirm"
            type="password"
            label="Confirm Password"
            
            :rules="passwordConfirmRules"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="payrate"
            name="payrate"
            type="number"
            label="Pay rate ($/hr)"
            :rules="payrateRules"
            required
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn type="submit" :disabled="!addUserFormValid" color="blue">Add User</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      userAdded: false,

      addUserFormValid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          (v && v.length >= 6) ||
          'Password must be greater than 6 characters',
      ],
      passwordConfirmRules: [
        v => (v == this.password) || 'Password not confirmed',
      ],
    };
  },
  methods: {
    async addUser() {
      if (!this.$refs.addUserForm.validate()) {
        this.addUserFormValid = false;
        return;
      };

      try {
        let email = this.email.toLowerCase();
        let password = this.password;
        await this.$axios.post('/account/user/register', {
          email,
          password,
          // first_name, 
          // last_name,
          // phone,
          // address
        });
        this.userAdded = true;
        alert('User added.');
      } catch (error) {
        alert('Error: User already exists.');
      }
    },
  },
};
</script>

<style></style>
