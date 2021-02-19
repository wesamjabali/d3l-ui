<template>
  <v-app>
    <HeaderComponent />
    <v-main>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
export default {
  name: "App",
  components: {
    HeaderComponent
  }
};
</script>
