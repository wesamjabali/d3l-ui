<template>
  <v-row class="justify-center">
    <v-col cols="12">
      <div>
        {{myString}}
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  data() {
    return {
      myString: 'Hello, you\'ve logged in!'
    }
  },
  methods: {

    },
  };
</script>
