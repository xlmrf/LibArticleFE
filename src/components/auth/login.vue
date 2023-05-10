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

    <auth-message :messages="messages" />

    <button :class="['sign-in-system btn primary',{load:loader}]" :disabled="loader" type="submit" @click="enter">
      Ввійти
      <loader v-if="loader" class="type-loader" :radius="8" :width="2"></loader>
    </button>
    </div>
    <div class="form-trip">
      <span class="text">
        Якщо немає акаунту,
        <router-link to="/registration" class="text-to">створіть його</router-link>
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
        console.log('welcome');
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
/*.input {*/
/*  font-size: 18px;*/
/*  padding: 10px;*/
/*  display: block;*/
/*  width: 300px;*/
/*  border: 1px solid #cecece;*/
/*  border-radius: 7px;*/
/*  position: relative;*/
/*  height: 2.7rem;*/
/*  color: #212121;*/
/*  !*border-bottom: 1px solid #ccc;*!*/
/*}*/

/*.btn {*/
/*  height: 40px;*/
/*  width: 300px;*/
/*  border-radius: 7px;*/
/*  cursor: pointer;*/
/*  font-size: 16px;*/
/*  background: none;*/
/*  border: 1px solid #212121;*/
/*  color: #212121;*/
/*  transition: 0s;*/
/*}*/

/*.btn:hover {*/
/*  border: 2px solid #212121;*/
/*}*/


.input.invalid {
  border: 1px solid red;
}

.input.invalid:focus {
  border: 2px solid red;
}

.invalid:valid {
  border: 1px solid red;
}

.marker {
  color: #b8b8b8;
  font-size: 18px;
  position: absolute;
  pointer-events: none;
  left: 0.9rem;
  top: 0.7rem;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

input:focus ~ .marker,
input:valid ~ .marker {
  top: -1.5rem;
  left: 0.5rem;
  font-size: 16px;
  color: #212121;
}

.invalid:focus ~ .marker,
.invalid:valid ~ .marker {
  color: red;
}

.load {
  cursor: default;
  border: 1px solid #717171;
  color: #717171;
}

.load:hover {
  cursor: default;
  border: 1px solid #717171;
}
</style>