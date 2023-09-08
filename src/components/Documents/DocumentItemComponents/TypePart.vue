<template>
  <div class="list-document-type" :class="{'draft-type-style': type === 'draft'}">
      <span>
        {{getTypes.find(item => item.id === article.type_id)?.name}}
      </span>

  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props:['article', 'type'],

  computed:{
    ...mapGetters(['getTypes'])
  }

}
</script>

<style scoped>

</style>