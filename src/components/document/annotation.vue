<template>
  <div class="doc-annotation doc-list-item">
    <h3 @click="hide_annotation = !hide_annotation">
      {{ this.$store.getters.getLanguage.document.topics.annotation }}
      <tumbler-filter-button :toggle="!hide_annotation"/>
    </h3>
    <div class="annotation-body" :class="{'display-none':hide_annotation}">
      {{getDocument.description}}
    </div>
  </div>
</template>

<script>
import TumblerFilterButton from "@/components/additional/TumblerFilterButton";
export default {
  components: {TumblerFilterButton},
  props:['getDocument'],
  data(){
    return{
      hide_annotation:true
    }
  },

}
</script>

<style scoped>


.annotation-body{

  margin-top: 15px;

}


</style>