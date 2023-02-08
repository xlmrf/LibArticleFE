<template>
  <div>
    {{ getDocument }}
    <h3>Main</h3>
    <input type="checkbox" name="" id="" v-model="stage">
    <first-stage v-if="stage" @next="next"/>
    <second-stage v-else/>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex"
import FirstStage from "@/components/DocumentMake/FirstStageDocument";
import SecondStage from "@/components/DocumentMake/SecondStageDocument";

export default {
  data() {
    return {
      stage: true
    }
  },
  methods: {
    ...mapActions(['createDocument']),
    next() {
      this.stage = !this.stage
      this.createDocument(this.getDocument)
    }
  },
  computed: {
    ...mapGetters(['getDocument'])
  },
  mounted() {

  },
  name: "DocumentMake",
  components: {SecondStage, FirstStage}
}
</script>

<style scoped>

</style>