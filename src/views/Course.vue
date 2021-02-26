<template>
  <div>Course id = {{ course_id }}!</div>
</template>

<script>
export default {
  name: "Course",
  props: {
    course_id: String,
  },
};
</script>
