<template>
  <v-card
    :width="mobile_user ? '100vw' : '90vw'"
    min-height="90vh"
    elevation="0"
  >
    <AdminBar v-if="isAdmin" />
    <v-card-title class="justify-center">
      <div :class="$vuetify.breakpoint.smAndUp ? 'text-h4' : 'text-h5'">
        Your Courses
      </div>
    </v-card-title>
    <v-row>
      <v-col v-for="c in all_courses" :key="c.id" cols="12" sm="6">
        <v-fade-transition mode="out-in">
          <v-card
            hover
            class="mx-auto"
            outlined
            :to="{ path: '/course/', query: { course_id: c.id } }"
          >
            <v-img
              :src="'https://picsum.photos/350/165?random=' + c.id"
              :height="$vuetify.breakpoint.smAndUp ? '15vw' : '15vh'"
            ></v-img>

            <v-card-title> {{ c.title }} </v-card-title>
            <v-card-subtitle>
              {{ c.course_prefix }}-{{ c.course_number }}-{{ c.section_number }}
            </v-card-subtitle>
          </v-card>
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import AdminBar from "@/components/Admin/AdminBar";
export default {
  name: "Home",

  data() {
    return {
      all_courses: [],
      mobile_user: !this.$vuetify.smAndUp,
    };
  },
  components: {
    AdminBar,
  },
  mounted() {
    this.get_all_courses();
  },
  computed: {
    isAdmin() {
      return this.$store.getters.roles.includes("admin");
    },
  },
  methods: {
    async get_all_courses() {
      await this.$axios.get("/user/course/getAllCourses").then((res) => {
        this.all_courses = res.data.courses;
      });
    },
  },
};
</script>
