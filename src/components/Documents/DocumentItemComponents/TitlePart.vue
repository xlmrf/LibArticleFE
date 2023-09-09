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

h3{
  margin-bottom: 10px;
}
a:visited{
  color: #3684DD;
}
a{
  text-decoration: none;
  /*color: #0F0F0F;*/
  color: #0969DA;
}
</style>