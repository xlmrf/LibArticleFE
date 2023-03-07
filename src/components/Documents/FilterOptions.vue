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
}

.filter-area{
  display: none;
  flex-flow: column;
}
.filter_open{
  display: flex;
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
  padding: 2rem;
  overflow:hidden;
  outline: none;
}
.documents-filter > div:after{
  content:'';
  position:absolute;
  width:100%;
  height:0.06rem;
  left:0;
  bottom:2px;
  background: rgba(191, 191, 191, 0.3);
}
.documents-filter > div{
  padding: 0.2rem;
}
</style>