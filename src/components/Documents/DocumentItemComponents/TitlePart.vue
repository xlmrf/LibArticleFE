<template>
  <div>
    <h3>
      <router-link :to="'/document/'+ (type === 'draft' ? 'make/' : '') +article.id">
        {{article.title}}
      </router-link>
    </h3>
  </div>
</template>

<script>
export default {
  props:['article', 'type']

}
</script>

<style scoped>

</style>