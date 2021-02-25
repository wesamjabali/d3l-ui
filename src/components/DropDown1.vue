<template>
  <div>
    <NewTeam v-if="new_team" @done="new_team = false" />
    <AddTeamMember v-if="add_team_member" @done="add_team_member = false" />
  <v-row justify="space-around">
    <v-menu
      v-for="([text, rounded ], index) in btns"
      :key="text"
      :rounded="rounded"
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn
          :color="colors[index]"
          class="white--text ma-5"
          v-bind="attrs"
          v-on="on"
        >
          {{ text }} 
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item"
          link
        >
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</div>
</template>

<script>
import NewTeam from "@/components/Faculty/NewTeam";
import AddTeamMember from "@/components/Faculty/AddTeamMember";
  export default {
    name: "DropDown1",
    components:{
      NewTeam,
      AddTeamMember,
    },
    data: () => ({
      btns: [
        ['Team Building', 'b-xl'],
      ],
      colors: ['deep-purple accent-4', 'error', 'teal darken-1'],
      items: [ {name: NewTeam}, {name: AddTeamMember},


      ],
    }),
  }
</script>