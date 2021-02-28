<template>
  <v-dialog persistent width="500px" v-model="dialog">
    <v-card class="px-10">
      <div class="title text-center secondary white--text py-5 mx-n10">
        {{ content.title }}
      </div>
      <v-card
        class="mt-5"
        color="grey lighten-4"
        flat
        v-if="content.points_total > -1"
      >
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
        v-if="content.points_total > -1"
      >
        <div v-if="content.points_earned" class="mt-5 text-center">
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

      required: [(v) => !!v || "This field is required"],
    };
  },
  props: {
    content_id: String,
  },
  mounted() {
    this.getOwnContent();
  },
  methods: {
    async getOwnContent() {
      await this.$axios
        .get("/user/content/getOwn", {
          params: { content_id: this.content_id },
        })
        .then((res) => {
          let { content } = res.data;
          if (content == undefined) {
            this.getContent();
          } else {
            this.content = content;
          }
        })
        .catch(() => {
          this.$snack.error("Error getting content data");
        });
    },
    async getContent() {
      await this.$axios
        .get("/user/content/getContent", {
          params: { content_id: this.content_id },
        })
        .then((res) => {
          let { content } = res.data;
          content.points_earned = -1;
          this.content = content;
        })
        .catch(() => {
          this.$snack.error("Error getting content data");
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
