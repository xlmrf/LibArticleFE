<template>
  <div class="form-control">
    <div class="name-block">
      <div class="area-control">
        <input type="text" name="name" required v-model="data.first_name"
               @keyup.enter="this.$el.nextSibling.childNodes[1].firstChild.focus()"
               :class="['input in-form name', {invalid:valid.first_name}]">
        <label for="in-email" class="marker">Ім'я</label>
        <small class="field-message-error">{{ valid.first_name }}</small>
      </div>
      <div class="area-control">
        <input type="text" name="name" required v-model="data.last_name"
               @keyup.enter="this.$el.nextSibling.childNodes[1].firstChild.focus()"
               :class="['input in-form name', {invalid:valid.last_name}]">
        <label for="in-email" class="marker">Прізвище</label>
        <small class="field-message-error">{{ valid.last_name }}</small>
      </div>
    </div>
    <div class="area-control">
      <input type="text" name="email" id="in-email" required v-model="data.email"
             @keyup.enter="this.$el.nextSibling.childNodes[1].firstChild.focus()"
             :class="['input in-form', {invalid:valid.email}]">
      <label for="in-email" class="marker">Email</label>
      <small class="field-message-error">{{ valid.email }}</small>
    </div>
    <div class="area-control">
      <input type="password" name="password" id="in-password" @keypress.enter="enter" required v-model="data.password"
             :class="['input in-form', {invalid:valid.password}]">
      <label for="in-password" class="marker">Пароль</label>
      <small class="field-message-error">{{ valid.password }}</small>
    </div>

    <auth-message v-if="messages" :messages="messages" />

    <button :class="['sign-in-system btn primary',{load:loader}]" :disabled="loader" type="submit" @click="enter">
      Ввійти
      <loader v-if="loader" class="type-loader" :radius="8" :width="2"></loader>
    </button>
  </div>
  <div class="form-trip">
      <span class="text">
        Якщо у вас створений акаунт,
        <router-link :to="{name:'login'}" class="text-to">ввійдіть</router-link>
      </span>
  </div>
</template>

<script>

import Loader from "@/components/additional/loader";
import email from "@/mixins/email";
import axios from "axios";
import {mapState} from "vuex";
import AuthMessage from "@/components/auth/authMessage";
import router from "@/router";

export default {

  mixins: [email],

  data(){
    return{
      valid:{
        first_name:'',
        last_name:'',
        email:'',
        password:''
      },
      data:{
        first_name:'',
        last_name:'',
        email:'',
        password:''
      },
      messages:[],
      loader:false
    }
  },

  watch:{
    'data.email': {
      handler() {
        this.valid.email = ''
      }
    },
    'data.first_name': {
      handler() {
        this.valid.first_name = ''
      }
    },
    'data.last_name': {
      handler() {
        this.valid.last_name = ''
      }
    },
    'data.password': {
      handler() {
        this.valid.password = ''
      }
    },
  },

  methods:{

    enter() {
      this.loader = true
      if (this.validate) {
        this.registration()
        console.log('welcome');
      } else {
        this.loader = false
      }
    },
    registration(){
      axios.post(this.api_url_v1 + '/registration', this.data).then(res => {
          this.messages = res.data
        },
        err => {
          this.loader = false
          this.messages = err.response.data
          console.log("registration user axios error: ", err.response.data);
        })
      }
  },

  computed:{
    ...mapState(['api_url_v1']),
    validate(){
      const non_pass = "Введіть пароль"
      const err_name = "*"
      const err_lName = "*"

      if (this.data.password === '') {
        this.valid.password = non_pass
      }
      if (this.data.first_name === '') {
        this.valid.first_name = err_name
      }
      if (this.data.last_name === '') {
        this.valid.last_name = err_lName
      }
      if (this.checkEmail(this.data.email)) {
        this.valid.email = this.emailFail
      }
      return !(this.valid.email || this.valid.password || this.valid.last_name || this.valid.first_name);
    }
  },

  components: {AuthMessage, Loader},
}
</script>

<style scoped>

.name{
  width: 155px;

}

.name-block{
  justify-content: space-between;
}

</style>