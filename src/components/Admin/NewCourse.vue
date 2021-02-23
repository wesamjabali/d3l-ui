<template>
  <div>
    <v-dialog persistent width="500px" v-model="dialog">
      <v-card class="px-2 py-2">
        <v-card-title class="d-flex justify-center">
          Create Course
        </v-card-title>
        <v-divider class="mb-3" />
        <v-form
          class="px-8"
          @submit.prevent="submit"
          @keyup.esc.native="$emit('done')"
          @keyup.enter.native="submit"
          ref="form"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                outlined
                label="Title"
                v-model="title"
                :rules="title_rules"
                counter="100"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                label="Prefix"
                v-model="course_prefix"
                counter="3"
                :rules="course_rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                label="Number"
                type="number"
                v-model="course_number"
                counter="3"
                :rules="course_rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                label="Section"
                type="number"
                v-model="section_number"
                counter="3"
                :rules="course_rules"
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
  </div>
</template>

<script>
export default {
  name: "NewCourse",
  data() {
    return {
      dialog: true,
      title: "",
      course_prefix: "",
      course_number: "",
      section_number: "",

      title_rules: [
        (v) => !!v || "Title is required",
        (v) => (v && v.length > 6) || "Title must be greater than 6 characters",
        (v) => v && v.length <= 100,
      ],
      course_rules: [
        (v) => !!v || "This field is required",
        (v) => v && v.length == 3,
      ],
    };
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      let title = this.title.toUpperCase();
      let course_prefix = this.course_prefix.toUpperCase();
      let course_number = this.course_number;
      let section_number = this.section_number;

      await this.$axios
        .post("/admin/course/new", {
          title,
          course_prefix,
          course_number,
          section_number,
        })
        .then(() => {
          this.$snack.success(title + " added!");
          this.$emit("done");
        })
        .catch(() => {
          this.$snack.error("Course already exists!");
        });
    },
  },
};
</script>