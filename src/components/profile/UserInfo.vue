<template>
  <div>
    <statistic />
<!--    <topics-publication />-->
    <topics-document />
<!--    <co-authors />-->
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

<style scoped>

</style>