<template>
  <div>
    <span class="filter-title authors-title-filter" @click="KeywordsFilterOpen = !KeywordsFilterOpen">
      Keywords <tumbler-filter-button :toggle="KeywordsFilterOpen"/>
    </span>
    <div :class="['filter-area',{filter_open:KeywordsFilterOpen}]">
<!--      <label class="save-session" v-for="(type,idx) in getTypes">-->
<!--        <input type="checkbox" :value="type.id" v-model="chosen" id="test" @change="pushTypes">-->
<!--        <span class="label">{{  type.name  }}</span>-->
<!--      </label>-->
    </div>
  </div>
</template>

<script>
import TumblerFilterButton from "@/components/additional/TumblerFilterButton";
export default {
  components: {TumblerFilterButton},
  data(){
      return{
        KeywordsFilterOpen:false,
        chosen:[]
      }
    }
}
</script>

<style scoped>

</style>