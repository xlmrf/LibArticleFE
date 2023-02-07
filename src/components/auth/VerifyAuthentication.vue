<template>
    <div class="main-wrapper" v-if="getPageMessage.message">
<!--        Your email verified, thanks!-->
      <p class="center">
        <span v-if="getPageMessage.message === 'verified'">Акаунт верифіковано, дякуємо!</span>
        <span v-else>{{getPageMessage.message}} {{getPageMessage.status}}</span>
      </p>

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
        this.verifyEmail
    }

}
</script>

<style scoped>
/*.main-wrapper{*/
/*  display: flex;*/
/*}*/
.main-wrapper p{
  /*align-self: center;*/
  /*justify-content: center;*/
  color: #4E5477;
  font-size: 42px;
}
.center{
  position: absolute;
  top: 45%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
