<template>
  <div class="form-control">
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
        Якщо немає акаунту,
        <router-link :to="{name:'registration'}" class="text-to">створіть його</router-link>
      </span>
    </div>
</template>

<script>

import Loader from "@/components/additional/loader";
import email from "@/mixins/email";
import axios from "axios";
import {mapState} from "vuex";
import AuthMessage from "@/components/auth/authMessage";

export default {

  mixins: [email],

  data(){
    return{
      valid:{
        email:'',
        password:''
      },
      data:{
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
        this.login()
        console.log('Checking..');
      } else {
        this.loader = false
      }
    },
    login(){
      axios.post(this.api_url_v1 + '/login', this.data).then(res => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.api_token
        localStorage.setItem('access_token', res.data.api_token);
        this.$router.push('/')
      },
      err => {
        this.loader = false
        this.messages = err.response.data
        console.log('auth error', err.response);
      })
    }

  },

  computed:{
    ...mapState(['api_url_v1']),
    validate(){
      const non_pass = "Введіть пароль"

      if (this.data.password === '') {
        this.valid.password = non_pass
      }
      if (this.checkEmail(this.data.email)) {
        this.valid.email = this.emailFail
      }
      return !(this.valid.email || this.valid.password);
    }
  },

  components: {AuthMessage, Loader},
}
</script>

<style scoped>


</style>