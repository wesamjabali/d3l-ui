<template>
  <div>
    <NewDiscussion
      :discussion_id="reply_id"
      :course_id="course_id"
      v-if="reply_id > -1"
      @done="
        reply_id = -1;
        get_discussion();
      "
      @cancel="reply_id = -1"
    />
    <v-dialog
      @click:outside="$emit('done')"
      :width="$vuetify.smAndUp ? '100vw' : '80vw'"
      v-model="dialog"
      scrollable
    >
      <v-card color="grey lighten-3">
        <div class="title text-center secondary white--text mb-2 py-5">
          Discussion
        </div>
        <v-card-text>
          <v-card
            outlined
            hover
            class="px-5"
            :style="'margin-left: ' + p.depth * 3 + 'vw'"
            v-for="p in posts"
            :key="p.id"
            :discussion_id="p.id"
            @click="
              reply_id = p.id;
              new_post = true;
            "
          >
            <div class="title text-left mb-1">
              {{ p.title }}
            </div>
            <div class="text-left mb-2">
              {{ p.body }}
            </div>
          </v-card>
        </v-card-text>
        <div
          class="text-right secondary mx-n2 mt-1 py-2 px-2"
          color="secondary"
        >
          <v-btn class="white--text" text @click="$emit('done')">Done</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import NewDiscussion from "@/components/User/NewDiscussion";
export default {
  name: "ViewDiscussion",
  data() {
    return {
      posts: [],
      dialog: true,
      reply_id: -1,
    };
  },
  components: {
    NewDiscussion,
  },
  props: {
    discussion_id: String,
    course_id: String,
  },
  mounted() {
    this.get_discussion();
  },
  methods: {
    async get_discussion() {
      await this.$axios
        .get("/user/discussion/getChildren", {
          params: { parent_id: this.discussion_id },
        })
        .then((res) => {
          let { posts } = res.data;
          this.posts = posts;
        })
        .catch(() => {
          this.$snack.error("Error getting posts data");
        });
    },
  },
};
</script>
