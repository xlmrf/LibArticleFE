<template>
  <div class="list-document-type" :class="[getStyleByType, {'draft-type-style': type === 'draft'}]">
      <span>
        {{this.$store.getters.getLanguage.types[getTypes.find(item => item.id === article.type_id)?.name]}}
      </span>

  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  props:['article', 'type'],

  computed:{
    ...mapGetters(['getTypes']),
    ...mapState(['TypesColor']),

    getStyleByType(){
      const textColor = 'type-color-' + this.$store.getters.getTypesColor[this.getTypes.find(item => item.id === this.article.type_id)?.name]
      const borderColor = 'type-border-color-' + this.$store.getters.getTypesColor[this.getTypes.find(item => item.id === this.article.type_id)?.name]
      // if (this.type === 'profile')
      //   return [ textColor, borderColor ]
      // else
        return textColor
    }
  }

}
</script>

<style scoped>

.list-document-type{
  display: flex;
  font-size: 1.1em;
}
.list-document-type > span{
  /*border: 1px solid #55B8CA;*/

  padding: 2px 8px;
  border-radius: 3px;
  text-align: center;
  /*width: auto;*/

  /*color: #55B8CA;*/
}

</style>