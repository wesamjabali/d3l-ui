<template>
  <div>
    <NewDiscussion
      :discussion_id="reply_id"
      :course_id="course_id"
      v-if="reply_id > -1"
      @done="
        reply_id = -1;
        posts = [];
        get_discussion();
      "
    />
    <v-dialog @click:outside="$emit('done')" :width="$vuetify.smAndUp ? '90vw' : '100vw'" v-model="dialog">
      <v-card class="px-2 pb-2">
        <div class="title text-center secondary white--text py-5 mx-n2">
          Discussion
        </div>
        <v-card
          outlined
          class="my-1 px-2"
          :style="'margin-left: ' + p.depth * 3 + 'vw'"
          v-for="p in posts"
          :key="p.id"
          :discussion_id="p.id"
          color="grey lighten-3"
        >
          <div class="title text-center mb-2">
            {{ p.title }}
          </div>
          <div>
            {{ p.body }}
          </div>
          <div class="text-right mb-2">
            <v-btn
              @click="
                reply_id = p.id;
                new_post = true;
              "
              outlined
              color="info"
            >
              Reply
            </v-btn>
          </div>
        </v-card>
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
