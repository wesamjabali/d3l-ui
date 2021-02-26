<template>
  <v-card
    :class="['mx-auto', $vuetify.breakpoint.smAndUp ? 'px-8' : 'px-0']"
    :width="this.$vuetify.breakpoint.mobile ? '100vw' : '70vw'"
    min-height="90vh"
  >
    <v-card-title class="justify-center">
      <div :class="$vuetify.breakpoint.smAndUp ? 'text-h4' : 'text-h5'">
        Your Courses
      </div>
    </v-card-title>
    <v-divider />
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
export default {
  name: "Home",

  data() {
    return {
      all_courses: [],
    };
  },
  mounted() {
    this.get_all_courses();
  },

  methods: {
    async get_all_courses() {
      await this.$axios
        .get("/user/course/getAllCourses")
        .then((res) => {
          this.all_courses = res.data.courses;
        })
        .catch(() => {
          this.$snack.error(
            `An error occurred while loading your courses.<br />Please try to refresh.`
          );
        });
    },
  },
};
</script>
