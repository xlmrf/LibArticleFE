<template>
  <div class="loader" v-if="!getProfile">
    <span><loader width="2" radius="13"></loader></span>
  </div>
  <div class="privacy-settings" v-else>

    <h2 class="item-underline">Зміна паролю</h2>

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
      <span>
        <label for="real-password">Діючий пароль</label>
        <input type="password"
               name="real-password" id="real-password"
               class='sample-input' :class="{'sample-input-error':errors.old_password}" v-model="data.old_password">
        <small class="text-error" v-if="errors.old_password">{{getErrorMessage[errors.old_password]}}</small>
      </span>
      <span>
        <label for="new-password">Новий пароль</label>
        <input type="password"
               name="new-password" id="new-password"
               class='sample-input' :class="{'sample-input-error':errors.password}" v-model="data.password">
        <small class="text-error" v-if="errors.password">{{getErrorMessage[errors.password]}}</small>
      </span>
      <span>
        <label for="confirm-password">Підтвердження паролю</label>
        <input type="password"
               name="confirm-password" id="confirm-password"
               class='sample-input' :class="{'sample-input-error':errors.confirm_password}" v-model="data.confirm_password">
        <small class="text-error" v-if="errors.confirm_password">{{getErrorMessage[errors.confirm_password]}}</small>
      </span>
    </div>

    <button @click="changePrivacy">Змінити пароль</button>

    <div class="alert alert-warning" >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5795e3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <small>
        Для створення надійного паролю не використовуйте легкі комбінації (Дата народження, ПІБ, 12345678...)
      </small>
    </div>
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
      },
      errors: {
        old_password: '',
        password:'',
        confirm_password: ''
      }
    }
  },
  watch:{
    getUser(){
      this.data.email = this.getUser.email
    },
    'data.old_password':{
      handler(){
        this.errors.old_password = ''
      }
    },
    'data.password':{
      handler(){
        this.errors.password = ''
      }
    },
    'data.confirm_password':{
      handler(){
        this.errors.confirm_password = ''
      }
    }
  },
  computed:{
    ...mapGetters(['getProfile', 'getErrorMessage']),

    validate(){
      if (this.data.old_password === ''){
        this.errors.old_password = 'enter_value'
        return false
      }
      if (this.data.password === ''){
        this.errors.password = 'enter_value'
        return false
      }
      if (this.data.confirm_password === ''){
        this.errors.confirm_password = 'enter_value'
        return false
      }
      if (this.data.confirm_password !== this.data.password){
        this.errors.confirm_password = 'different_pass'
        return false
      }

      return true
    }
  },
  methods:{
    ...mapActions(['updatePrivacy']),
    changePrivacy(){

      if (this.validate){
        this.updatePrivacy(this.data)
      }


    }
  }
}
</script>

<style scoped>

.setting-block{
  align-items: center;
}

.link-reset{
  display: flex;
  justify-content: center;
  color: #212121;
}
.link-reset:hover{
  color: #7f7f7f;
}
.alert{
  border: 1px solid #B2B2B2;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  padding: 5px;
  font-size: 16px;
  text-align: center;
  align-self: center;
}
.alert-warning{
  top: 20px;
  /*border: 1px solid rgb(34,46,152);*/
  /*background: rgba(153, 159, 239, 0.1);*/
  position: relative;
  padding: 15px;
  color: #606060;
  font-size: 16px;
  align-items: center;
  border: 1px solid rgba(147, 158, 179, 0.5);
  background: rgba(128, 167, 221, 0.05);
}
.alert-warning > small{
  padding: 0 20px;
}
.alert-error{
  border: 1px solid #EB4C42;
  background: rgba(255, 15, 0, 0.1);
}

</style>