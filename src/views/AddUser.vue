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
            v-model="username"
            name="username"
            type="text"
            label="Username"
            required
            :rules="usernameRules"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="email"
            name="email"
            type="email"
            label="E-mail"
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
          <v-label>Special Roles:</v-label>
          <v-checkbox
            v-model="roles"
            label="Super"
            value="super"
          ></v-checkbox>
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
  name: 'AddUser',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      roles: [],
      payrate: '',
      userAdded: false,

      addUserFormValid: false,
      usernameRules: [v => !!v || 'Username is required'],
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
      payrateRules: [
        v => !!v || 'Pay rate is required',
        v => v > 8 || 'Pay rate must be greater than 8',
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
        if (this.roles.indexOf('associate') === -1)
          this.roles.push('associate');
        let username = this.username.toLowerCase();
        let email = this.email;
        let password = this.password;
        let payrate = this.payrate;
        let roles = this.roles;
        await this.$axios.post('/account/users', {
          username,
          email,
          password,
          payrate,
          roles,
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
