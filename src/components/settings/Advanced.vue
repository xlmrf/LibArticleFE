<template>
  <div class="loader" v-if="!getProfile">
    <span><loader width="2" radius="13"></loader></span>
  </div>

  <div class="privacy-settings" v-else>

    <h2 class="item-underline">{{getter.settings.other_settings_titles.title_notices}}</h2>
    <div class="setting-block">

      <div class="der-setting-block">
        <label class="save-session">
          <input type="checkbox" name="send-notice" v-model="sendMessageBox">
          <span class="label">{{getter.settings.other_settings_titles.send_email_box}}</span>
        </label>
        <span>{{getter.settings.other_settings_titles.send_email_advice}}</span>
      </div>

    </div>

    <h2 class="item-underline">{{getter.settings.other_settings_titles.title_privacy}}</h2>
    <div class="setting-block">
      <input type="checkbox" name="" id="" v-model="lang">
      <div class="der-setting-block">
        <label class="save-session">
          <input type="checkbox" name="show-profile" v-model="showProfileBox" >
          <span class="label">{{getter.settings.other_settings_titles.open_profile_box}}</span>
        </label>
      </div>

    </div>

    <button>{{getter.settings.other_settings_titles.btn_save_settings}}</button>

<!--    <div class="alert alert-warning" >-->
<!--      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5795e3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>-->
<!--      <small>-->
<!--        Для створення надійного паролю не використовуйте легкі комбінації (Дата народження, ПІБ, 12345678...)-->
<!--      </small>-->
<!--    </div>-->
  </div>
</template>

<script>
import Loader from "@/components/additional/loader";
import {mapGetters} from "vuex";
export default {
  data(){
    return{
      sendMessageBox: false, //  getUser.info.....
      lang: false,
    }
  },

  computed:{
    ...mapGetters(['getProfile', 'getErrorMessage']),
    getter(){
      if (this.lang){
        return this.$store.getters.getLabelUa
      }
      else {
        return this.$store.getters.getLabelEn
      }
    }
  },


  components: {Loader}

}
</script>

<style scoped>

.der-setting-block{
  display: flex;
  flex-flow: column;
}

.save-session > span{
  font-weight: bold;
  font-size: 1.1em;
}

.der-setting-block > span{
  margin-top: 10px;
  color: #333333;
}

</style>