<template>
  <div class="views-part" :title="$store.getters.getLanguage.document.other.views_hint + article.views.unique_views">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    <span v-if="article.views.views">{{ article.views.views }}</span>
  </div>
</template>

<script>

export default {
  props:['article', 'type'],

}

</script>

<style scoped>

.views-part{
  /*font-weight: bold;*/
  display: flex;
  cursor: pointer;
  color: #444444;
}

.views-part > svg{
  position: relative;
  margin: 0 3px;
}

</style>