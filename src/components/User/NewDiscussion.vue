<template>
  <v-dialog persistent width="500px" v-model="dialog">
    <v-card class="px-2">
      <v-card-title class="d-flex justify-center">
        New Discussion
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
  name: "NewDiscussion",
  data() {
    return {
      dialog: true,
      title: "",
      body: "",
      required: [(v) => !!v || "This field is required"],
    };
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
    },
  },
};
</script>