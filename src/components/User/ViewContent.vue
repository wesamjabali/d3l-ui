<template>
  <v-dialog persistent width="500px" v-model="dialog">
    <v-card class="px-10">
      <div class="title text-center secondary white--text py-5 mx-n10">
        {{ content.title }}
      </div>
      <v-card
        v-if="
          content.points_total > -1 &&
            ($store.getters.roles.includes('faculty') ||
              $store.getters.roles.includes('admin'))
        "
        outlined
        color="grey lighten-4"
        class="text-center mt-3 px-8"
      >
        <v-form
          ref="form"
          class="mb-n3"
          @submit.prevent="grade"
          @keyup.enter.native="grade"
        >
          <v-autocomplete
            label="User"
            class="mt-3 mx-5"
            outlined
            @change="get_content_faculty"
            v-model="user_id"
            :items="all_users"
            :item-text="(user) => user.first_name + ' ' + user.last_name"
            item-value="id"
          >
          </v-autocomplete>
          <v-text-field
            class="mx-5"
            label="Points"
            type="number"
            v-model="new_points_earned"
            :rules="points"
            outlined
            v-if="user_id && content.points_earned <= -1"
          ></v-text-field>

          <v-btn
            outlined
            v-if="user_id && content.points_earned <= -1"
            color="primary"
            class="center mb-6"
            @click="grade"
          >
            Submit Grade
          </v-btn>
        </v-form>
      </v-card>
      <v-card color="grey lighten-4" flat v-if="content.points_total > -1">
        <div class="text-center mt-2" v-if="content.points_earned > -1">
          {{
            Number(
              (content.points_earned / content.points_total) * 100
            ).toFixed(2) + "%"
          }}
        </div>
      </v-card>
      <v-card
        class="mt-5"
        color="grey lighten-3"
        flat
        v-if="content.points_earned > -1"
      >
        <div v-if="content.points_earned" class="mt-5 text-center">
          {{ Number(content.points_earned).toFixed(2) }}/{{
            Number(content.points_total).toFixed(2)
          }}
          Points
        </div>
      </v-card>
      <v-card
        class="mt-5"
        color="grey lighten-3"
        flat
        v-if="content.points_total > -1 && content.points_earned <= -1"
      >
        <div class="mt-5 text-center">
          {{ Number(content.points_total).toFixed(2) }}
          Points
        </div>
      </v-card>
      <v-card class="mt-5" color="grey lighten-2" flat>
        <div v-html="content.body" class="text-center" />
      </v-card>
      <v-card-actions class="mx-n10 mt-5">
        <v-spacer />
        <v-btn text color="primary" v-on:click="getFile(content_id)">
          Download
        </v-btn>
        <v-btn text color="" v-on:click="$emit('done')"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewContent",

  data() {
    return {
      content: [],
      dialog: true,
      file: undefined,
      all_users: [],
      user_id: undefined,
      new_points_earned: "",
      required: [(v) => !!v || "This field is required"],
      points: [(v) => v >= 0 || "Must be positive number."],
    };
  },
  props: {
    content_id: String,
  },
  mounted() {
    this.get_content().then(() => {
      if (
        this.$store.getters.roles.includes("faculty") ||
        this.$store.getters.roles.includes("admin")
      ) {
        this.get_all_users();
      }
    });
  },
  methods: {
    async grade() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.$axios
        .post("/faculty/content/grade", {
          content_id: this.content_id,
          course_id: this.content.course_id,
          user_id: this.user_id,
          points_earned: this.new_points_earned,
        })
        .then(() => {
          this.user_id = "";
          this.new_points_earned = "";
          this.$snack.success("Grade posted!");
        })
        .catch(() => {
          this.$snack.error("User already has a grade.");
        });
    },
    async get_content() {
      await this.$axios
        .get("/user/content/getOwn", {
          params: { content_id: this.content_id },
        })
        .then((res) => {
          let { content } = res.data;
          this.content = content;
        })
        .catch(() => {
          this.$snack.error("Error getting content data");
        });
    },
    async get_content_faculty() {
      await this.$axios
        .get("/faculty/content/get", {
          params: { content_id: this.content_id, user_id: this.user_id },
        })
        .then((res) => {
          let { content } = res.data;
          this.content = content;
        })

        .catch(() => {
          this.$snack.error("Error getting content data");
        });
    },
    async get_all_users() {
      await this.$axios
        .get("/user/course/getAllUsers", {
          params: { course_id: this.content.course_id },
        })
        .then((res) => {
          this.all_users = res.data.users.filter(
            (user) => user.id !== this.$store.getters.id
          );
        })
        .catch(() => {
          this.$snack.error("An error occurred getting user data");
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
