<template>
  <div>
    <v-app-bar color="#6A76AB"
        dark
        shrink-on-scroll
        app
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-3">
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

    <v-navigation-drawer 
          absolute
          dark
          src= "../assets/side.jpg"
          v-model="drawer" 
          app>
      <div class="pa-4 title">
        Main Navigation
      </div>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group active-class="text--accent-4">

          <v-list-item v-if="isLoggedIn" to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Punch Clock</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isLoggedIn && isAdmin" to="/addRole">
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
   
    <v-container style="height: 120px;"></v-container>
   
    
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
