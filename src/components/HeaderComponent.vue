<template>
  <div>
    <v-app-bar app dark color="orange darken-4">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">D3L</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">
        <v-toolbar-items>
          <v-btn text>
          Faculty Support
        </v-btn>
        <v-btn text>
          Technical Support
        </v-btn>
        <v-btn text>
          Course Evaluations
        </v-btn>
        <v-btn color="white" outlined>
          <v-icon left>
            mdi-account-circle
          </v-icon>
          {{ email }}
        </v-btn>
        </v-toolbar-items>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <div class="pa-4 title">
        Navigation
      </div>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group active-class="text--accent-4">

          <v-list-item v-if="isLoggedIn" to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <!-- add faculty check -->
          <!-- change class to course -->
          <v-list-item v-if="isLoggedIn" to="/courseadd">
            <v-list-item-icon>
              <v-icon>mdi-bookshelf</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add Course</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isLoggedIn" to="/roleadd">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add Role</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-bell</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Notifications</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-chat</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Subscriptions</v-list-item-title>
          </v-list-item>

        </v-list-item-group>

      </v-list>
      <div class="pa-4" v-if="isLoggedIn">
        <v-btn
          color="black white--text"
          block
          @click="$store.dispatch(`logout`)"
        >
          <v-icon left>
            mdi-exit-to-app
          </v-icon>
          Logout
        </v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin() {
      return this.$store.getters.roles.includes('admin');
    },
    isFaculty() {
      return this.$store.getters.roles.includes('faculty');
    },
    email() {
      return this.$store.getters.email;
    },
  },
};
</script>

<style></style>
