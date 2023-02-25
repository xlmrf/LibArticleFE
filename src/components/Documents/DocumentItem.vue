<template>
  <div class="document-item">
    <h3>
      {{document.title}}
    </h3>
    <span v-for="author in document.authors">
      {{author.first_name}}
    </span>
  </div>
</template>

<script>
export default {
  props:['document']
}
</script>

<style scoped>

.document-item{
  border: 1px solid red;
}
</style>