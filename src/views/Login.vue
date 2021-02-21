<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <v-card :width="$vuetify.breakpoint.xsOnly ? '100vw' : '70vw'">
        <v-img
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
          height="15vh"
        >
        </v-img>
        <v-card-title class="justify-center">Login</v-card-title>
        <v-form @submit.prevent="login()" ref="loginForm" class="px-10 pb-5">
          <v-text-field
            outlined
            v-model="email"
            label="E-Mail"
            name="email"
            type="text"
            :rules="required"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="password"
            name="password"
            type="password"
            label="Password"
            :rules="required"
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
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      buttonLoading: false,
      required: [(v) => !!v || "This field is required"],
    };
  },
  methods: {
    async login() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }

      this.buttonLoading = true;
      try {
        let email = this.email.toLowerCase();
        let password = this.password;
        await this.$store.dispatch("login", { email, password });
        this.$router.push("/home");
      } catch (error) {
        this.$snack.error("E-mail or password is incorrect");
        this.buttonLoading = false;
      }
    },
  },
};
</script>
