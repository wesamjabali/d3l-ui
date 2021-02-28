<template>
  <v-dialog persistent width="500px" v-model="dialog">
    <v-card class="px-2">
      <v-card-title class="d-flex justify-center">
        Add New Content
      </v-card-title>
      <v-divider class="mb-3" />
      <v-form
        class="px-8"
        @submit.prevent="submit"
        @keyup.esc.native="$emit('done')"
        @keyup.enter.native="submit"
        ref="form"
      >
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              label="Title"
              v-model="title"
              :rules="required"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="body"
              label="Body"
              :rules="required"
              outlined
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-file-input
              v-model="file"
              class="mr-4"
              label="Attachment"
              outlined
              :rules="required"
              >File</v-file-input
            >
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Points"
              type="number"
              hint="Leave empty if you don't want this assignment graded."
              v-model="temp_points_total"
              :rules="points"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" v-on:click="submit"> Submit </v-btn>
        <v-btn text v-on:click="$emit('done')"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewContent",
  data() {
    return {
      dialog: true,
      file: undefined,
      title: "",
      body: "",
      temp_points_total: "",
      content: [],
      required: [(v) => !!v || "This field is required"],
      points: [
        (v) => v <= 100 || "Must be 0-100 points!",
        (v) => v >= 0 || "Must be 0-100 points!",
      ],
    };
  },
  computed: {
    points_total() {
      if (this.temp_points_total) {
        return this.temp_points_total;
      } else {
        return -1;
      }
    },
  },
  props: {
    course_id: String,
  },
  mounted() {
    // Fix v-file-input for iPhone/Safari
    let inputs = document.querySelectorAll(".v-file-input input");
    [...inputs].forEach((input) => {
      input.remove();
    });
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      let formData = new FormData();
      formData.append("content_file", this.file);
      formData.append("course_id", this.course_id);
      formData.append("title", this.title);
      formData.append("body", this.body);
      formData.append("points_total", this.points_total);

      await this.$axios
        .post("/faculty/content/new", formData)
        .then(() => {
          this.$snack.success("File added!");
          this.$emit("done");
        })
        .catch((err) => {
          if (err.response.status == 409) {
            this.$snack.error("That file already exists for that course.");
          } else {
            this.$snack.error("An error occurred");
          }
        });
    },
  },
};
</script>
