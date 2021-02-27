<template>
    <v-btn
        v-on:click="
            () => {
                $axios.post('/faculty/team/delete', { team_id: '1' });
              }
        "
    >
        Delete team
    </v-btn>
</template>

<script>
export default {
    name:"DeleteTeam"
}
</script>