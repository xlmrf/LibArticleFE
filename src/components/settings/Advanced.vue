<template>
  <div class="loader" v-if="!getProfile">
    <span><loader width="2" radius="13"></loader></span>
  </div>

  <div class="privacy-settings" v-else>

    <h2 class="item-underline">{{this.$store.getters.getLanguage.settings.other_settings_titles.title_change_lang}}</h2>
    <div class="setting-block">
      <div class="der-setting-block">
        <span>{{ this.$store.getters.getLanguage.settings.other_settings_titles.system_lang }}</span>
        <select id="lang" class="select select-language" v-model="lang">
          <option value="en">{{ this.$store.getters.getLanguage.settings.other_settings_titles.select_lang_en }}</option>
          <option value="ua">{{ this.$store.getters.getLanguage.settings.other_settings_titles.select_lang_ua }}</option>
        </select>
      </div>
    </div>

    <h2 class="item-underline">{{this.$store.getters.getLanguage.settings.other_settings_titles.title_notices}}</h2>
    <div class="setting-block">
        <label class="save-session">
          <input type="checkbox" name="send-notice" v-model="sendMessageBox">
          <span class="label">{{this.$store.getters.getLanguage.settings.other_settings_titles.send_email_box}}</span>
        </label>
        <span>{{this.$store.getters.getLanguage.settings.other_settings_titles.send_email_advice}}</span>
    </div>

    <h2 class="item-underline">{{this.$store.getters.getLanguage.settings.other_settings_titles.title_privacy}}</h2>
    <div class="setting-block">
        <label class="save-session">
          <input type="checkbox" name="show-profile" >
          <span class="label">{{this.$store.getters.getLanguage.settings.other_settings_titles.open_profile_box}}</span>
        </label>
    </div>



    <button @click="saveOptions">{{this.$store.getters.getLanguage.settings.other_settings_titles.btn_save_settings}}</button>

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
import {mapGetters, mapMutations} from "vuex";
export default {
  data(){
    return{
      sendMessageBox: false, //  getUser.info.....
      lang: this.$store.state.lang,
    }
  },

  computed:{
    ...mapGetters(['getProfile', 'getErrorMessage']),
    saveOptions(){
      return localStorage.setItem('lang', this.lang)
    }
  },

  watch:{
    lang(){
      this.changeLang(this.lang)
    }
  },

  methods:{
    ...mapMutations(['changeLang'])
  },


  components: {Loader}

}
</script>

<style scoped>

.der-setting-block{
  display: flex;
  align-self: baseline;
  align-items: center;
  font-size: 1.2em;
}

.language-block{
  flex-flow: row;
  font-size: 1.1em;
}

.save-session > span{
  font-weight: bold;
  font-size: 1.1em;
}

.der-setting-block > span{
  color: #333333;
}

.select-language{
  color: #318CE7;
  border-radius: 3px;
  margin-left: 10px;
  padding: 6px;
  font-size: 1.2rem;
  line-height: 1.1;
}
.select-language > option{
  background: #f1f1f1;
}

</style>