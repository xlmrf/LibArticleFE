<template>
  <div>
    <input type="date" name="" id="" v-model="getDocument.year">
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {

  computed:{
    ...mapGetters(['getDocument'])
  },
  methods:{

  }
}
</script>

<style scoped>

</style>