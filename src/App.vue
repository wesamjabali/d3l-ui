<template>
  <v-app>
    <HeaderComponent />
    <Snackbar />
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
import HeaderComponent from '@/components/HeaderComponent';
import Snackbar from '@/components/Snackbar';
export default {
  name: 'App',
  components: {
    HeaderComponent,
    Snackbar,
  },
};
</script>
