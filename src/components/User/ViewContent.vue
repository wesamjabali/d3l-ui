<template>
  <v-dialog persistent width="500px" v-model="dialog">
    <v-card class="px-2">
      <v-card color="#1976d2" padding-top="10px">
      <v-card-title class="d-flex justify-center">
        Content Details
      </v-card-title>
      </v-card>
      <v-divider class="mb-3" />
      <v-form
        class="px-8"
        @keyup.esc.native="$emit('done')"
        ref="form"
      >
       <div class="title">
          {{ content.title }}
          
        </div>
        <div>
          {{content.body}}
        </div>
        <div v-if="content.is_graded">
          {{ content.points_earned }}<b> / </b>{{ content.points_total }} total points earned <br>Percentage: {{ content.points_earned/content.points_total * 100 + '%' }}
        </div>

        
        
        
          
      
      </v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn text v-on:click="getFile(content.file_name)"> Download attached file </v-btn>
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

      content: { 
        title: "This is the title",
        body: "This is the <br/> body",
        file_name: "myFile.pdf",
        is_graded: false,
        points_total: 100,
        points_earned: 50,
      },
      dialog: true,
      file: undefined,
      
      required: [(v) => !!v || "This field is required"],
    };
  },
  props: {
    content_id: String,
  },
  mounted() {
    console.log(this.content_id)
  this.getOwnContent(this.content_id); 
      this.$axios.post("/faculty/content/grade", {
        content_id: this.content_id,
        user_id: "1",
        points_earned: "37",
      });
  },
  methods: {
     async getOwnContent() {
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
