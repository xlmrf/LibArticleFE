<template>
  <div class="documents-filter">
<!--    filter-->
    <PersonalToggle></PersonalToggle>
    <select-author />
    <range-year />
    <select-type />
<!--    <select-keywords />-->
  </div>
</template>

<script>
import PersonalToggle from "@/components/Documents/Filters/PersonalToggle";
import SelectAuthor from "@/components/Documents/Filters/SelectAuthor";
import RangeYear from "@/components/Documents/Filters/RangeYear";
import SelectType from "@/components/Documents/Filters/SelectType";
import SelectKeywords from "@/components/Documents/Filters/SelectKeywords";

export default {
  components:{SelectKeywords, SelectType, RangeYear, PersonalToggle,SelectAuthor}
}
</script>

<style>

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
  height:0.08rem;
  left:0;
  bottom:2px;
  background: rgba(191, 191, 191, 0.3);
}
</style>