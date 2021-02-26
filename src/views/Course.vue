<template>
  <v-card
    :class="['mx-auto', mobile_user ? 'px-8' : 'px-0']"
    :width="mobile_user ? '100vw' : '90vw'"
    min-height="90vh"
  >
    <v-card-title class="justify-center">
      <div :class="mobile_user ? 'text-h5' : 'text-h4'">
        {{ course.title }}
      </div>
    </v-card-title>
    <v-card-subtitle class="text-center">
      <div>
        {{ course.course_prefix }}-{{ course.course_number }}-{{
          course.section_number
        }}
      </div>
    </v-card-subtitle>
    <v-divider />

    <v-row>
      <v-col cols="12" md="4">
        <v-card height="100vh">
          <v-card-title class="justify-center">Content</v-card-title>
          <v-card-subtitle class="text-center"
            >Click to Download</v-card-subtitle
          >

          <v-col cols="12"> <v-divider /> </v-col>
          <v-card
            class="mx-5 mb-5"
            outlined
            tile
            hover
            v-for="item in content"
            :key="item.id"
            @click="getFile(item.id)"
          >
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-subtitle> {{ item.body }} </v-card-subtitle>
            <v-card-actions class="justify-end">
              <v-switch disabled v-model="item.is_graded" label="Graded">
              </v-switch>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card height="100vh">
          <v-card-title class="justify-center">{{ team_name }}</v-card-title>
          <v-card-subtitle class="text-center">Members</v-card-subtitle>
          <v-col cols="12"> <v-divider /> </v-col>
          <v-card
            class="mx-5 mb-5"
            outlined
            tile
            hover
            v-for="person in team"
            :key="person.id"
          >
            <v-card-title>{{
              person.first_name + " " + person.last_name
            }}</v-card-title>
            <v-card-subtitle>
              {{ "Phone: " + person.phone }}
              <br />
              {{ "Email: " + person.email }}
            </v-card-subtitle>
            <v-card-actions class="justify-end"> </v-card-actions>
          </v-card>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card height="100vh">
          <v-card-title class="justify-center">Discussions</v-card-title>
          <v-card-subtitle class="text-center"
            >Not implemented yet.</v-card-subtitle
          >
          <v-col cols="12"> <v-divider /> </v-col>
          <v-card
            class="mx-5"
            outlined
            tile
            hover
            v-for="item in discussions"
            :key="item.id"
          >
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-subtitle> {{ item.body }} </v-card-subtitle>
            <v-card-actions class="justify-end">
              <!-- Actions go here, if any -->
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Course",
  props: {
    course_id: String,
  },
  data() {
    return {
      mobile_user: !this.$vuetify.smAndUp,
      course: [],
      content: [],
      team: [],
      discussions: [],
      team_name: "",
    };
  },
  mounted() {
    this.get_course_info();
    this.get_content_info();
    this.get_team();
  },
  methods: {
    async get_course_info() {
      await this.$axios
        .get("/user/course/get", {
          params: { course_id: this.course_id },
        })
        .then((res) => {
          this.course = res.data.course;
        });
    },
    async get_content_info() {
      await this.$axios
        .get("/user/content/getAllForCourse", {
          params: { course_id: this.course_id },
        })
        .then((res) => {
          this.content = res.data.content;
        });
    },
    async get_team() {
      await this.$axios
        .get("/user/team/getOwnForCourse", {
          params: { course_id: this.course_id },
        })
        .then((res) => {
          if (!res.data.team) {
            this.team_name = "You're not in a team!";
            return;
          }
          this.team_name = res.data.team.team_name;
          this.get_team_members(res.data.team.id);
        });
    },
    async get_team_members(team_id) {
      await this.$axios
        .get("/user/team/getUsers", {
          params: { team_id: team_id },
        })
        .then((res) => {
          console.log(res.data.team);
          this.team = res.data.team;
        });
    },
    async getFile(content_id) {
      await this.$axios
        .get("/user/content/getFile", {
          params: { content_id: content_id },
          responseType: "blob",
        })
        .then((res) => {
          const fileName = res.headers["content-disposition"].split('"')[1];
          const fileURL = window.URL.createObjectURL(
            new Blob([res.data], { type: res.headers["content-type"] })
          );
          const fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", fileName);
          document.body.appendChild(fileLink);
          fileLink.click();
          this.$snack.success("Downloading content!");
        })
        .catch((err) => {
          if (err.response.status == 404) {
            this.$snack.error(
              `That file doesn't exist.<br />
              Heroku may have deleted it!`
            );
          } else {
            this.$snack.error("An error occurred");
          }
        });
    },
  },
};
</script>
