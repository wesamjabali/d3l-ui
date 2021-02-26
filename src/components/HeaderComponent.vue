<template>
  <div>
    <v-app-bar app color="primary" dense dark>
      <v-btn to="/home" text class="white--text">
        <div class="title">D3L</div></v-btn
      >
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined v-bind="attrs" v-on="on">
              <v-icon left>
                mdi-account
              </v-icon>
              {{ $store.getters.first_name + " " + $store.getters.last_name }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in profile_actions"
              :key="item.name"
              dense
              @click="item.route == 'logout' && $store.dispatch(`logout`)"
              :to="item.route"
            >
              <v-list-item-icon>
                <v-icon right>
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      profile_actions: [
        { name: "Profile", route: "/profile", icon: "mdi-account-details" },
        { name: "Log Out", route: "logout", icon: "mdi-logout-variant" },
      ],
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
    },
  },
};
</script>

<style></style>
