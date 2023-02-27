<template>
  <div class="documents-filter">
    filter
    <PersonalToggle></PersonalToggle>
    <select-author />
    <range-year />
    <select-type />
    <select-keywords />
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
  border: 1px solid blue;
}
.documents-filter > div{
  padding: 0.2rem;
}
</style>