<template>
  <div class="info-panel">
    <statistic class="item-underline"/>
<!--    <topics-publication />-->
    <topics-document class="item-underline"/>
    <co-authors />
<!--    <bio />-->
  </div>
</template>

<script>
import Bio from "@/components/profile/Info/Bio";
import TopicsPublication from "@/components/profile/Info/TopicsPublication";
import TopicsDocument from "@/components/profile/Info/TopicsDocument";
import CoAuthors from "@/components/profile/Info/CoAuthors";
import Statistic from "@/components/profile/Statistic";
export default {
  components: {Statistic, CoAuthors, TopicsDocument, TopicsPublication, Bio}
}
</script>

<style>

.info-panel{
  margin: 0 2rem;
}

.chapter-header{
  font-weight: bold;
  color: #222222;
  margin: 10px;
}

</style>