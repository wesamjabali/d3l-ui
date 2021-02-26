<template>
  <div>Course id = {{ this.$route.query.course_id }}!</div>
</template>

<script>
export default {
  name: "Course",
  props: {
    id: String,
  },
};
</script>
