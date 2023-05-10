<template>
  <div>
<!--    Your new email confirmed!-->
<!--    <div>{{getPageMessage}}</div>-->

<!--    На вказаний email прийшло повідомлення з підтвердженням акаунту-->

<!--    https://libarticle.polidar.in.ua/confirm-email?email={{$data['email']}}&token={{$data['token']-->

    <router-link to="/login">Login</router-link>


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
    // this.verifyEmail
  }
}
</script>

<style scoped>

</style>
