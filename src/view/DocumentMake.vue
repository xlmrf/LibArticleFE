<template>
  <div>
    {{ getDocument }}
    <h3>Main</h3>
    <input type="checkbox" name="" id="" v-model="stage">
    <first-stage v-if="stage"/>
    <second-stage v-else/>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex"
import FirstStage from "@/components/DocumentMake/FirstStageDocument";
import SecondStage from "@/components/DocumentMake/SecondStageDocument";

export default {
  data() {
    return {
      stage: true
    }
  },
  provide() {
    // use function syntax so that we can access `this`
    return {
      DocumentData: this.data
    }
  },
  methods: {
    ...mapState(['new_document'])
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