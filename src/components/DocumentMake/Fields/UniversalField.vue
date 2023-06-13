<template>
  <div>
    <input type="text" class="sample-input" name="" id="" v-model="getDocument[field]">
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: ['field','isReady'],
  computed: {
    ...mapGetters(['getDocument'])
  },
}
</script>

<style scoped>
label{
  position: absolute;
  top: -20px;
}
div{
  position: relative;
}
</style>