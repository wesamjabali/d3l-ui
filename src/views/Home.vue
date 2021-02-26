<template>
  <v-card
    class="mx-auto"
    :width="this.$vuetify.breakpoint.mobile ? '100vw' : '70vw'"
  >
    <v-img
      src="https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ"
      height="15vh"
    ></v-img>

    <v-card-title class="justify-center">
      Your Courses
    </v-card-title>

    <v-container class="fill-height" fluid style="min-height: 434px">
      <v-fade-transition mode="out-in">
        <v-row>
          <v-col v-for="c in all_courses" :key="c.id" cols="12" sm="6">
            <v-card
              class="mx-auto"
              :to="{ path: '/course/', query: { course_id: c.id } }"
            >
              <v-img
                :src="'https://picsum.photos/350/165?random=' + c.id"
                height="125"
                class="grey darken-4"
              ></v-img>

              <v-card-title> {{ c.title }} </v-card-title>
              <v-card-subtitle>
                {{ c.course_prefix }}-{{ c.course_number }}-{{
                  c.section_number
                }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-container>

    <v-spacer></v-spacer>
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
