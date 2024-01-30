<template>
  <div class="info-panel">
    <statistic />
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

.info-panel > div{
  margin: 10px 0;
  padding: 5px 0;
}

.info-panel > div > p{
  margin-bottom: 10px;
}

.chapter-header{
  font-weight: bold;
  color: #222222;
  margin: 0 10px;
}

</style>