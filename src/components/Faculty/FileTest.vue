<template>
  <v-dialog persistent width="500px" v-model="dialog">
    <v-card class="px-2 py-2">
      <v-card-title class="d-flex justify-center">
        Upload File
      </v-card-title>
      <v-divider class="mb-3" />
      <v-form class="px-8" @submit.prevent="submit">
        <v-file-input v-model="file" outlined>File</v-file-input>
      </v-form>
      <v-card-actions>
        <v-btn text v-on:click="getFile"> Get file </v-btn>
        <v-spacer />
        <v-btn text color="primary" v-on:click="submit"> Submit </v-btn>
        <v-btn text v-on:click="$emit('done')"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FileTest",
  data() {
    return {
      dialog: true,
      file: undefined,
      file_name: "",
      content_id: 1,
    };
  },
  methods: {
    async submit() {
      let formData = new FormData();
      formData.append("content_file", this.file);
      formData.append("course_id", "1");
      formData.append("title", "title");
      formData.append("body", "body");
      formData.append("is_graded", true);
      await this.$axios
        .post("/faculty/content/new", formData)
        .then(() => {
          this.$snack.success("File added!");
        })
        .catch((err) => {
          if (err.response.status == 409) {
            this.$snack.error("That file already exists for that course.");
          } else {
            this.$snack.error("An error occurred");
          }
        });
    },
    async getFile() {
      await this.$axios
        .get("/user/content/getFileName", {
          params: { content_id: this.content_id },
        })
        .then((res) => {
          this.file_name = res.data.name;
          this.downloadFile();
        });
    },
    async downloadFile() {
      await this.$axios
        .get("/user/content/getFile", {
          params: { content_id: this.content_id },
          responseType: "blob",
        })
        .then((res) => {
          this.$snack.success("File got!");
          console.log(res);
          var fileURL = window.URL.createObjectURL(
            new Blob([res.data], { type: res.headers["content-type"] })
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", this.file_name);

          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((err) => {
          this.$snack.error("An error occurred");
          console.log(err);
        });
    },
  },
};
</script>
