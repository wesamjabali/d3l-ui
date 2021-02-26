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
        <v-text-field
          label="Title"
          v-model="title"
          :rules="required"
          outlined
        ></v-text-field>
        <v-textarea
          v-model="body"
          label="Body"
          :rules="required"
          outlined
        ></v-textarea>
        <v-row>
          <v-file-input
            v-model="file"
            label="Attachment"
            outlined
            :rules="required"
            >File</v-file-input
          >
          <v-spacer />
          <v-switch v-model="is_graded" label="Graded"> </v-switch>
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
      is_graded: false,
      required: [(v) => !!v || "This field is required"],
    };
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
      formData.append("is_graded", this.is_graded);
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
