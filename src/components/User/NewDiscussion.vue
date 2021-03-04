<template>
  <v-dialog @click:outside="$emit('done')" width="500px" v-model="dialog">
    <v-card class="px-2">
      <v-card-title class="d-flex justify-center">
        New Discussion
      </v-card-title>
      <v-divider class="mb-3" />
      <v-form
        class="px-8"
        @submit.prevent="submit"
        @keyup.esc.native="$emit('cancel')"
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
      </v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" v-on:click="submit"> Submit </v-btn>
        <v-btn text v-on:click="$emit('cancel')"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewDiscussion",
  data() {
    return {
      dialog: true,
      title: "",
      body: "",
      required: [(v) => !!v || "This field is required"],
    };
  },
  props: {
    discussion_id: String,
    course_id: String,
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.discussion_id > -1) {
        await this.$axios
          .post("/user/discussion/new", {
            course_id: this.course_id,
            parent_id: this.discussion_id,
            title: this.title,
            body: this.body,
          })
          .then(() => {
            this.$snack.success("Posted!");
            this.$emit("done");
          });
      } else {
        await this.$axios
          .post("/user/discussion/new", {
            course_id: this.course_id,
            parent_id: null,
            title: this.title,
            body: this.body,
          })
          .then(() => {
            this.$snack.success("Posted!");
            this.$emit("done");
          });
      }
    },
  },
};
</script>
