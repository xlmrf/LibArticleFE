<template>
  <div>
    Your new email confirmed!
    <div>{{getPageMessage}}</div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  computed:{
    ...mapActions(['verifyEmail']),
    ...mapGetters(['getPageMessage'])
  },
  mounted() {
    console.log("verify mounted");
    this.verifyEmail
  }
}
</script>

<style scoped>

</style>
