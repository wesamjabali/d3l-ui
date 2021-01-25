<template>
  <div>
    <v-app-bar app dark color="black">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">CBS Employee</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">
        <v-btn color="white" outlined>
          <v-icon left>
            mdi-account-circle
          </v-icon>
          {{ username }}
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <div class="pa-4 title">
        Main Navigation
      </div>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group active-class="text--accent-4">
          <v-list-item v-if="isLoggedIn" to="/clock">
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Punch Clock</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isLoggedIn" to="/editSelfClock">
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Edit Clock</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isLoggedIn && isSuper" to="/addUser">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add User</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isLoggedIn && isSuper" to="/editClock">
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>(Admin) Edit Clock</v-list-item-title>
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
    isSuper() {
      return this.$store.getters.roles.includes('super');
    },
    username() {
      return this.$store.getters.username;
    },
  },
};
</script>

<style></style>
