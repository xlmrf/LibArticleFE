<template>
  <div class="loader" v-if="!getProfile">
    <span><loader width="2" radius="13"></loader></span>
  </div>
  <div class="privacy-settings" v-else>
<!--    <div class="setting-block">-->
<!--      <h3>Зміна почти</h3>-->
<!--      <span>-->
<!--&lt;!&ndash;        <input type="text" name="email" id="in-email" required v-model="data.email"&ndash;&gt;-->
<!--        &lt;!&ndash;               @keyup.enter="this.$el.nextSibling.childNodes[1].firstChild.focus()"&ndash;&gt;-->
<!--        &lt;!&ndash;               :class="['input in-form', {invalid:valid.email}]">&ndash;&gt;-->
<!--        &lt;!&ndash;        <label for="in-email" class="marker">Email</label>&ndash;&gt;-->
<!--        &lt;!&ndash;        <span>{{data.email}}</span>&ndash;&gt;-->
<!--        &lt;!&ndash;        <small class="field-message-error">{{ valid.email }}</small>&ndash;&gt;-->
<!--      </span>-->

<!--    </div>-->

    <div class="setting-block">
      <h3>Зміна паролю</h3>
      <span>
      <label for="real-password">Діючий пароль</label>
      <input type="text"
             name="real-password" id="real-password"

             class='sample-input'>
      </span>
      <span>
      <label for="new-password">Новий пароль</label>
      <input type="text"
             name="new-password" id="new-password"

             class='sample-input'>
      </span>
      <span>
      <label for="confirm-password">Підтвердження паролю</label>
      <input type="text"
             name="confirm-password" id="confirm-password"

             class='sample-input'>
      </span>
    </div>

    <div class="setting-block hidden-account">
      <div>
      <label class="save-session">
        <input type="checkbox" name="save-user" v-model="data.session" id="save-user">
        <span class="label">Закритий акаунт</span>
      </label>
      <span>При включені цієї опції, інформація у вашому профілі буде прихована, окрім вашого ПІБ та статусу</span>
      </div>
    </div>


    <button @click="changePrivacy">Змінити пароль</button>

  </div>
</template>



<script>
import {mapActions, mapGetters} from "vuex";
import Loader from "@/components/additional/loader";

export default {
  components: {Loader},
  data(){
    return{
      data:{
        email:'',
        password:'',
        confirm_password:'',
        old_password:''
      }
    }
  },
  watch:{
    getUser(){
      this.data.email = this.getUser.email
    }
  },
  computed:{
    ...mapGetters(['getProfile'])
  },
  methods:{
    ...mapActions(['updatePrivacy']),
    changePrivacy(){
      if (this.data.email !== this.getUser.email){
        alert('На ваш попередній email прийде повідомлення для підтвердження зміни почти')
      }
      this.updatePrivacy(this.data)

    }
  }
}
</script>

<style scoped>
.privacy-settings{
  display: flex;
  flex-direction: column;
}

.privacy-settings > h3{
  justify-self: center;
  align-self: center;
}

.setting-block {
  display: inherit;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  outline: none;
  width: 100%;
}

.privacy-settings > div{
  margin: 10px 0;
}
.person-email > span{
  margin: 1rem;
  font-weight: bold;
}

.privacy-settings > button{
  margin: 2rem;
  background: none;
  border: 1px solid rgba(32, 178, 170, 0.8);
  color: rgba(32, 178, 170, 0.8);
  width: 120px;
  height: 30px;
  cursor: pointer;
  align-self: center;
}




.hidden-account{
  padding: 5px;

  background: rgba(241, 241, 241, 0.52);
  /*border: 1px solid silver;*/
  border-radius: 4px;
  color: #333333;
}

.hidden-account > span{
  margin-top: 10px;
  border-radius: 4px;
  /*padding: 5px;*/
  /*border: 1px solid #535353;*/
}


.save-session>input{
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.save-session>span{
  display: inline-flex;
  align-items: center;
  user-select: none;
  font-size: 16px;
}

.save-session>span::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.save-session>input:not(:disabled):not(:checked)+span:hover::before {
  border-color: #4E5477;
}
.save-session>input:checked+span::before {
  border-color: #1059FF;
  background-color: #1059FF;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
</style>