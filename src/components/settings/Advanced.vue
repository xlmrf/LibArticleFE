<template>
  <div class="loader" v-if="!getProfile">
    <span><loader width="2" radius="13"></loader></span>
  </div>

  <div class="privacy-settings" v-else>

    <h2 class="item-underline">Повідомлення</h2>
    <div class="setting-block">

      <div class="der-setting-block">
        <label class="save-session">
          <input type="checkbox" name="send-notice" v-model="sendMessageBox">
          <span class="label">Відправляти повідомлення на email</span>
        </label>
        <span>Відмітивши поле, на ваш email будуть відправлятись повідомлення про: використання вашого документу як посилання, позначення вас як співавтора в доданому іншими користувачами документа та ін.</span>
      </div>

    </div>

    <h2 class="item-underline">Приватність</h2>
    <div class="setting-block">

      <div class="der-setting-block">
        <label class="save-session">
          <input type="checkbox" name="show-profile" v-model="showProfileBox" >
          <span class="label">Відкрити профіль для перегляду іншим користувачам</span>
        </label>
      </div>

    </div>

    <button>Зберегти</button>

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
      sendMessageBox: false //  getUser.info.....
    }
  },

  computed:{
    ...mapGetters(['getProfile', 'getErrorMessage']),
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