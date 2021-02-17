<template>
  <v-row no-gutters>
    <v-col cols="12" class="d-flex justify-center">
      <v-card
        class="ma-6 pa-6"
        :width="$vuetify.breakpoint.xsOnly ? '100vw' : '70vw'"
        color="#f2f2f2"
        :disabled="userAdded"
      >
        <div class="title">
          Role Add
        </div>
        <v-divider class="my-3"></v-divider>
        <v-form ref="addClassForm" v-model="addClassFormValid" @submit.prevent="rolladd()">
            <v-container fluid>
            <v-col align="">
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
              :items="userNames"
              label="User Name"
              ></v-select>

            </v-col>
            <v-col
            class="d-flex"
            cols="12"
            sm="6"
            >

            <v-select
            :items="userRoles"
            label="Assigned Role"
            ></v-select>
            </v-col>
            </v-col>
            </v-container>
          <div class="d-flex justify-center">
            <v-btn type="submit" :disabled="!addClassFormValid" color="blue">Add Role</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      course_title: '',
      course_prefix: '',
      course_number: '',
      section_number: '',
      userAdded: false,
      addClassFormValid: true,

      userNames: [
        "Pat", "Lui", "Wesam", "Nick", "Kevin", "Joey"
      ],

      userRoles: [
          "Admin", "Faculty", "Student"
      ],
      // emailRules: [
      //   v => !!v || 'E-mail is required',
      //   v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      // ],
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          (v && v.length >= 6) ||
          'Password must be greater than 6 characters',
      ],
      passwordConfirmRules: [
        v => (v == this.password) || 'Password not confirmed',
      ],
    };
  },
  methods: {
    async addClass() {
      if (!this.$refs.addClassForm.validate()) {
        this.addClassFormValid = false;
        return;
      };

      try {
        let course_title = this.course_title.toLowerCase();
        let course_prefix = this.course_prefix.toUpperCase();
        let course_number = this.course_number;
        let section_number = this.sectionNumber
        await this.$axios.post('/account/user/register', {
          course_title,
          course_prefix,
          course_number,
          section_number,
        });
        this.userAdded = true;
        alert('Class added.');
      } catch (error) {
        alert('Error: This class already exists.');
      }
    },
  },
};
</script>

<style></style>
