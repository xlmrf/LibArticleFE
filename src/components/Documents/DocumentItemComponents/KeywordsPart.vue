<template>
  <div>
    <span class="document-list-keywords" v-if="type === 'searcher'">
      <span v-for="keyword in document.keywords">
      {{keyword}}
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props:['document', 'type']


}
</script>

<style scoped>

</style>