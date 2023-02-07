<template>
  <div>
    Main Component
    <notices></notices>
    <story></story>
  </div>
</template>

<script>
import Notices from "./MessagesActivityComponent"
import Story from "./StoryActivityComponent"

export default {
  components:{Notices, Story}
}
</script>

<style scoped>

</style>