<template>
  <div>
    <v-app-bar app color="#0D47A1" dark>
      <v-app-bar-nav-icon
        v-if="isLoggedIn"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">D3L</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">
        <v-btn color="white" outlined class="ml-7">
          <v-icon left>
            mdi-account-circle
          </v-icon>
          {{
            this.$store.getters.first_name + " " + this.$store.getters.last_name
          }}
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <div class="pa-4 title">
        Main Navigation
      </div>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group active-class="text--accent-4" v-if="isLoggedIn">
          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isAdmin" to="/addRole">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add Role</v-list-item-title>
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
      drawer: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin() {
      return this.$store.getters.roles.includes("admin");
    },
    isFaculty() {
      return this.$store.getters.roles.includes("faculty");
    }
  }
};
</script>

<style></style>
