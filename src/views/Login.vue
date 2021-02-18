<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <v-card
        class="ma-6 pa-6"
        :width="$vuetify.breakpoint.xsOnly ? '100vw' : '30vw'"
        color="#f2f2f2"
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="100px"
        >
        <div class="white--text">Login Form</div>
        </v-img>
        
        <v-divider class="my-3"></v-divider>
        <v-form @submit.prevent="login()" ref="loginForm">
          <v-text-field
            outlined
            v-model="email"
            label="E-Mail"
            name="email"
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
          <div class="d-flex justify-center">
            <v-btn
              :loading="buttonLoading"
              :disabled="buttonLoading"
              :width="$vuetify.breakpoint.xsOnly ? '40vw' : '140px'"
              color="gray"
              to="/register"
              >Register</v-btn
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
      email: '',
      password: '',
      loginError: false,
      buttonLoading: false,
      loginRules: {
        wrong: () =>
          !this.loginError || 'email or password is incorrect.',
      },
    };
  },
  watch: {
    email() {
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
        let email = this.email.toLowerCase();
        let password = this.password;

        await this.$store.dispatch('login', { email, password });
        this.$router.push('/home');
      } catch (error) {
        this.loginError = true;
        this.$refs.loginForm.validate();
        this.buttonLoading = false;
      }
    },
  },
};
</script>
