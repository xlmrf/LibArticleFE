<template>
  <div>
    field:{{field}}
    <input type="text" class="inp-e" name="" id="" v-model="getDocument[field]">
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: ['field'],
  computed: {
    ...mapGetters(['getDocument'])
  },
}
</script>

<style scoped>

</style>