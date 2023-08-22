<template>
  <div class="documents-filter">
<!--    filter-->
    <PersonalToggle></PersonalToggle>
    <select-author />
    <range-year />
    <select-type />
<!--    <select-keywords />-->
    <div class="selected-refs-panel" style="flex-flow: row" v-if="$route.query.refs_doc_id && JSON.parse($route.query.refs_doc_id).length > 0">
      <span>Selected refs: {{  JSON.parse($route.query.refs_doc_id).length  }}</span>
      <span @click="clearRefs">clear</span>
    </div>
  </div>
</template>

<script>
import PersonalToggle from "@/components/Documents/Filters/PersonalToggle";
import SelectAuthor from "@/components/Documents/Filters/SelectAuthor";
import RangeYear from "@/components/Documents/Filters/RangeYear";
import SelectType from "@/components/Documents/Filters/SelectType";
import SelectKeywords from "@/components/Documents/Filters/SelectKeywords";

export default {
  components:{SelectKeywords, SelectType, RangeYear, PersonalToggle,SelectAuthor},


  methods:{
    clearRefs(){
      let q = Object.assign({}, this.$route.query);

      delete q.refs_doc_id

      this.$router.replace({
        name: 'documents',
        query: {...q, ...{refs_doc_id:'[]'}}
      })
    }
  }

}
</script>

<style>

.selected-refs-panel{
  align-items: baseline;
  margin-top: 20px;
}

.selected-refs-panel > span:last-child{
  margin-left: auto;
  cursor: pointer;
  background: rgba(235, 76, 66, 0.97);
  padding: 5px 12px;
  border-radius: 4px;
  color: white;

  transition: box-shadow 0.12s ease-in-out;
  display: inline-block;
}

.selected-refs-panel > span:last-child:hover {
  box-shadow: 0px 2px 2px rgba(255, 0, 0, 0.5); /* Тінь: offsetX offsetY blurColor shadowColor */
}

.filter-title{
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  padding-bottom: 0.5rem;
}

.filter-area{
  display: none;
  margin-top: 0.5rem;
  flex-flow: column;
}
.filter_open{
  display: flex;
}

/*.filter-checkbox{*/
/*  padding: 0.2rem;*/
/*  margin: 0.1rem;*/
/*}*/

.filter-checkbox{
  padding: 0.2rem;
  cursor: pointer;
}


.documents-filter{
  padding: 1rem;
}
.documents-filter > div{
  display: flex;
  flex-flow: column;
  align-self: center;
  position: relative;
  /*cursor: pointer;*/
  /*margin: 0 5%;*/
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  /*padding: 1rem;*/
  overflow:hidden;
  outline: none;
}
.documents-filter > div:after{
  content:'';
  position:absolute;
  width:100%;
  height:1px;
  left:0;
  bottom:2px;
  background: rgba(191, 191, 191, 0.3);
}
</style>