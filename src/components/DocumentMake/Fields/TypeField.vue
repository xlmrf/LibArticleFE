<template>
  <div>
    <input type="text" name="" id="" v-model="getDocument.type">
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(['getDocument'])
  },
}
</script>

<style scoped>

</style>