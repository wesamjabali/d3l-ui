<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <v-card
        class="ma-6 pa-6"
        :width="$vuetify.breakpoint.xsOnly ? '100vw' : '70vw'"
        color="#f2f2f2"
      >
        <div class="title">Login Form</div>
        <v-divider class="my-3"></v-divider>
        <v-form @submit.prevent="login()" ref="loginForm">
          <v-text-field
            outlined
            v-model="username"
            label="Username"
            name="username"
            type="text"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="password"
            name="password"
            type="password"
            label="Password"
            :rules="[loginRules.wrong]"
          ></v-text-field>
          <div class="py-4 d-flex justify-center">
            <v-btn
              :loading="buttonLoading"
              :disabled="buttonLoading"
              :width="$vuetify.breakpoint.xsOnly ? '40vw' : '140px'"
              type="submit"
              color="blue"
              >login</v-btn
            >
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loginError: false,
      buttonLoading: false,
      loginRules: {
        wrong: () =>
          !this.loginError || 'Username or password is incorrect.',
      },
    };
  },
  watch: {
    username() {
      this.loginError = false;
      this.$refs.loginForm.validate();
    },
    password() {
      this.loginError = false;
      this.$refs.loginForm.validate();
    },
  },
  methods: {
    async login() {
      this.buttonLoading = true;
      try {
        let username = this.username.toLowerCase();
        let password = this.password;

        await this.$store.dispatch('login', { username, password });
        this.$router.push('/clock');
      } catch (error) {
        this.loginError = true;
        this.$refs.loginForm.validate();
        this.buttonLoading = false;
      }
    },
  },
};
</script>
