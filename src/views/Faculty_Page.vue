<template> 

  <v-card
    @click.native="get_all_courses()"
    class="mx-auto"
    max-width="1000"
  >
    <v-img
      src="https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ"
      height="100px"
    ></v-img>

    <v-card-title class="justify-center">
     My Courses
    </v-card-title>

      <v-container
        class="fill-height"
        fluid
        style="min-height: 434px"
      >
        <v-fade-transition mode="out-in">
          <v-row>
            <v-col v-for="c in courses" :key="c.code" cols="12" sm="6">
              <v-card class="mx-auto">
                
                <v-img 
                  :src="c.image"
                  height="125"
                  
                  class="grey darken-4"
                ></v-img>


                <v-card-title> {{ c.name }} </v-card-title>
                <v-card-subtitle>
                  {{ c.code }}
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
  name: "Student_Page",
  
  data() {
    return {
      courses: [
        { name: "CLASS ONE", code: "CSC 394 801" , image: "https://picsum.photos/350/165?random=1"},
        { name: "CLASS TWO", code: "CSC 102 293" , image: "https://picsum.photos/350/165?random=2"},
        { name: "CLASS THREE", code: "CSC 394 802" , image: "https://picsum.photos/350/165?random=3"},
        { name: "CLASS FOUR", code: "CSC 102 294" , image: "https://picsum.photos/350/165?random=4"},
        { name: "CLASS FIVE", code: "CSC 394 804" , image: "https://picsum.photos/350/165?random=5"},
        { name: "CLASS SIX", code: "CSC 102 297" , image: "https://picsum.photos/350/165?random=6"},
      ],

      mounted() {
        this.get_all_courses();
      },

      methods:{
        async get_all_courses() {
        await this.$axios
        .get("/admin/course/getAllCourses")
        .then((res) => {
          this.all_courses = res.data.courses;
        })
        .catch(() => {
          this.$snack.error("An error occurred");
          });
        }

      }
    };
  },
}
</script>
