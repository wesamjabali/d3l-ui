<template>
  <div>
    <NewContent
      :course_id="course_id"
      v-if="new_content_dialog"
      @done="
        new_content_dialog = false;
        get_content_info();
      "
    />
    <NewDiscussion
      :course_id="course_id"
      v-if="new_discussion_dialog"
      @done="
        new_discussion_dialog = false;
        get_discussions();
      "
    />
    <NewTeam
      :course_id="course_id"
      v-if="new_team_dialog"
      @done="new_team_dialog = false"
    />

    <AddTeam
      :course_id="course_id"
      v-if="add_team_member_dialog"
      @done="add_team_member_dialog = false"
    />

    <ViewContent
      v-if="view_content"
      :content_id="content_id"
      @done="view_content = false"
    />

    <ViewDiscussion
      v-if="view_discussion"
      :discussion_id="discussion_id"
      :course_id="course_id"
      @done="view_discussion = false"
    />

    <v-card
      :class="['mx-auto', 'pb-5']"
      :width="mobile_user ? '100vw' : '90vw'"
      elevation="0"
    >
      <div class="text-center title py-2">
        <div>
          {{ course.title }}
        </div>
        <div class="subtitle-1">
          {{ course.course_prefix }}-{{ course.course_number }}-{{
            course.section_number
          }}
        </div>
      </div>
      <v-btn v-if="authorized_user" @click="new_content_dialog = true"
        >New Content</v-btn
      >
      <!-- Team Management for faculty -->
      <v-menu v-if="authorized_user" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            Manage teams
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in manage_team"
            :key="item.name"
            @click="item.action"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- END TM FACULTY -->
      <v-btn @click="new_discussion_dialog = true"
        >New Discussion</v-btn
      >
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="pb-5" outlined>
            <div class="primary white--text mb-5 py-2">
              <div class="title text-center">Content</div>
              <div class="subtitle-2 text-center">Click to view Content</div>
            </div>

            <v-card
              :class="[!mobile_user ? 'mx-5' : 'mx-3', 'mb-5']"
              outlined
              hover
              v-for="item in content"
              :key="item.id"
              @click="
                view_content = true;
                content_id = item.id;
              "
            >
              <div class="title secondary white--text text-center py-2">
                {{ item.title }}
              </div>

              <div class="subtitle-2 mx-5 mt-2">{{ item.body }}</div>
              <v-card-actions class="justify-end mb-n2">
                <div
                  v-if="
                    item.points_earned > -1 &&
                      !$store.getters.roles.includes('faculty') &&
                      !$store.getters.roles.includes('admin')
                  "
                >
                  {{
                    Number(
                      (item.points_earned / item.points_total) * 100
                    ).toFixed(2)
                  }}
                  %
                </div>
                <div
                  class="text--disabled"
                  v-if="
                    item.points_earned == -1 &&
                      item.points_total > -1 &&
                      !$store.getters.roles.includes('faculty') &&
                      !$store.getters.roles.includes('admin')
                  "
                >
                  Not yet graded
                </div>
                <div
                  class="text--disabled"
                  v-if="
                    item.points_total <= -1 &&
                      !$store.getters.roles.includes('faculty') &&
                      !$store.getters.roles.includes('admin')
                  "
                >
                  Not graded
                </div>
              </v-card-actions>
            </v-card>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="4"
          v-if="
            !$store.getters.roles.includes('faculty') &&
              !$store.getters.roles.includes('admin')
          "
        >
          <v-card class="pb-5" outlined>
            <div class="primary white--text mb-5 py-2">
              <div class="title text-center">{{ team_name }}</div>
              <div class="subtitle-2 text-center">Members</div>
            </div>
            <v-card
              class="mx-5 mb-5"
              outlined
              hover
              v-for="person in team"
              :key="person.id"
            >
              <div class="title secondary white--text text-center py-2">
                {{ person.first_name + " " + person.last_name }}
              </div>
              <div class="subtitle-2 mx-5 mt-2 pb-2">
                <b>Phone: </b>
                {{ person.phone }}
                <br />
                <b>Email: </b>

                {{ person.email }}
              </div>
            </v-card>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="4"
          v-if="
            $store.getters.roles.includes('faculty') ||
              $store.getters.roles.includes('admin')
          "
        >
          <v-card class="pb-5" outlined>
            <div class="primary white--text mb-5 py-2">
              <div class="title text-center">Students</div>
              <div class="subtitle-2 text-center">In this course</div>
            </div>
            <v-card
              class="mx-5 mb-5"
              outlined
              hover
              v-for="user in all_users"
              :key="user.id"
            >
              <div class="title secondary white--text text-center py-2">
                {{ user.first_name + " " + user.last_name }}
              </div>
              <div class="subtitle-2 mx-5 mt-2 pb-2">
                <b>Phone: </b>
                {{ user.phone }}
                <br />
                <b>Email: </b>

                {{ user.email }}
              </div>
            </v-card>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pb-5" outlined>
            <div class="primary white--text mb-5 py-2">
              <div class="title text-center">Discussions</div>
              <div class="subtitle-2 text-center">In this course</div>
            </div>
            <v-card
              class="mx-5 mb-5"
              outlined
              hover
              v-for="d in discussions"
              @click="
                discussion_id = d.id;
                view_discussion = true;
              "
              :key="d.id"
            >
              <div class="title secondary white--text text-center py-2">
                {{ d.title }}
              </div>
              <div class="subtitle-2 mx-5 mt-2 pb-2">
                {{ d.body }}
              </div>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import NewContent from "@/components/Faculty/NewContent";
import NewDiscussion from "@/components/User/NewDiscussion";
import NewTeam from "@/components/Faculty/NewTeam";
import AddTeam from "@/components/Faculty/AddTeam";
import ViewContent from "@/components/User/ViewContent";
import ViewDiscussion from "@/components/User/ViewDiscussion";
export default {
  name: "Course",
  components: {
    NewContent,
    NewDiscussion,
    NewTeam,
    AddTeam,
    ViewContent,
    ViewDiscussion,
  },
  props: {
    course_id: String,
  },
  computed: {
    total_earned() {
      var total = 0;
      this.content.forEach((c) => {
        total += c.points_earned;
      });
      return total;
    },
    total_possible() {
      var total = 0;
      this.content.forEach((c) => {
        total += c.points_possible;
      });
      return total;
    },
  },
  data() {
    return {
      mobile_user: !this.$vuetify.smAndUp,
      new_team_dialog: false,
      new_discussion_dialog: false,
      add_team_member_dialog: false,
      authorized_user:
        this.$store.getters.roles.includes("faculty") ||
        this.$store.getters.roles.includes("admin"),
      manage_team: [
        {
          name: "Create New Team",
          action: () => {
            this.new_team_dialog = true;
          },
        },
        {
          name: "Add Team Member",
          action: () => {
            this.add_team_member_dialog = true;
          },
        },
      ],
      new_content_dialog: false,
      course: [],
      content: [],
      all_users: [],
      discussions: [],
      team: [],
      content_id: -1,
      discussion_id: -1,
      view_content: false,
      view_discussion: false,
      team_name: "",
    };
  },
  mounted() {
    this.get_course_info();
    this.get_content_info();
    this.get_team();
    this.get_all_users();
    this.get_discussions();
  },
  methods: {
    async get_discussions() {
      this.$axios
        .get("/user/discussion/getAllByCourse", {
          params: { course_id: this.course_id },
        })
        .then((res) => {
          const { posts } = res.data;
          this.discussions = posts;
        });
    },
    async get_all_users() {
      if (
        this.$store.getters.roles.includes("faculty") ||
        this.$store.getters.roles.includes("admin")
      ) {
        await this.$axios
          .get("/user/course/getAllUsers", {
            params: { course_id: this.course_id },
          })
          .then((res) => {
            this.all_users = res.data.users.filter(
              (user) => user.id !== this.$store.getters.id
            );
          })
          .catch(() => {
            this.$snack.error("An error occurred getting user data");
          });
      }
    },
    async get_course_info() {
      await this.$axios
        .get("/user/course/get", {
          params: { course_id: this.course_id },
        })
        .then((res) => {
          this.course = res.data.course;
        });
    },
    async get_content_info() {
      await this.$axios
        .get("/user/content/getAllForCourse", {
          params: { course_id: this.course_id },
        })
        .then((res) => {
          let { content } = res.data;
          this.content = content;
        });
    },
    async get_team() {
      await this.$axios
        .get("/user/team/getOwnForCourse", {
          params: { course_id: this.course_id },
        })
        .then((res) => {
          if (!res.data.team) {
            this.team_name = "You're not in a team!";
            return;
          }
          this.team_name = res.data.team.team_name;
          this.get_team_members(res.data.team.id);
        });
    },
    async get_team_members(team_id) {
      await this.$axios
        .get("/user/team/getUsers", {
          params: { team_id: team_id },
        })
        .then((res) => {
          this.team = res.data.team;
        });
    },
  },
};
</script>
