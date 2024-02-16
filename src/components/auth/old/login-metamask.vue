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


<!--    default btn-->
<!--    <button :class="['sign-in-system btn primary',{load:loader}]" :disabled="loader" type="submit" @click="enter">-->
<!--      Ввійти-->
<!--      <loader v-if="loader" class="type-loader" :radius="8" :width="2"></loader>-->
<!--    </button>-->

    <button :class="['sign-in-system btn primary',{load:loader}]" :disabled="loader" type="submit" @click="NewSign('register')">
      register
      <loader v-if="loader" class="type-loader" :radius="8" :width="2"></loader>
    </button>
    <button :class="['sign-in-system btn primary',{load:loader}]" :disabled="loader" type="submit" @click="NewSign('login-metamask.vue')">
      login
      <loader v-if="loader" class="type-loader" :radius="8" :width="2"></loader>
    </button>


    </div>
    <div class="form-trip">
      <span class="text" v-if="person">
        <p>Hello {{person}}</p>
<!--        Якщо немає акаунту,-->
<!--        <router-link :to="{name:'registration'}" class="text-to">створіть його</router-link>-->
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
      person:'',
      signature: '',
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
    },

    newAuth(){
      let message = ''
      if (window.ethereum) {
        const ethereum = window.ethereum;

        console.log('eth:',ethereum)

        // Запит на доступ до рахунку

        ethereum.request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
              const address = accounts[0];

              console.log('addresses:', accounts)

              axios.get('http://lib.loc/api/get-sign-message').then(data => {
                console.log('data',data.data)
                const messageToSign = data.data.message;

                // 0x5ce19caf845a3efc706c0eb91d9c58c2e27aedd203cf08af16b622cfab7f6b790bbe2a3a7000b8458f14dd3c824e068eec97ff885b0ec005a988e30e53cdadb01b

                // 0xe6a37b887a5adc978ea56cee0b7bd4c2400e1dff
                // gj, signature: 0xb52c7b07df38d06f43fc3859bb28be6cde5eaddec6d36bd039078c8b80254a632fedac68a4cfd0692877c8dfbe72347522ba0a9327538021fad1ad57285944241b


                // Підписати повідомлення за допомогою MetaMask
                let metaSign = this.signMessageWithMetaMask(messageToSign, address);

              })
              .catch(error => {
                console.error('Помилка при отриманні повідомлення:', error);
              });

            })
            .catch((error) => {
              console.error('Помилка при запиті на рахунок:', error);
            });
      } else {
        console.error('MetaMask не встановлено');
      }

    },


    async NewSign(type) {
      if (!window.ethereum) {
        alert('MetaMask not detected. Please install MetaMask first.');
        return;
      }
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];

        let response = await fetch(`http://dapp-example.loc/api/auth/nonce/${type}?wallet_address=${address}`);
        const json = await response.json();
        console.log('json', json)
        const message = json.nonce;

        // Sign message using eth_sign method
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [address, message],
        });
        console.log(signature);

        // Post the signature to your server
        response = await fetch(`http://dapp-example.loc/api/auth/${type}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'wallet_address': address,
            'signature': signature,
          })
        });

        if (response.status == 200) {
          const data = await response.json();
          this.person = data.name
          console.log(data);
        }
      } catch (err) {
        console.log('Error: ', err);
      }
    },


    async signMessageWithMetaMask(message, address) {
      try {

        const signature = await ethereum.request({
          method: 'personal_sign',
          params: [message, address],
        });

        console.log('gj, signature:', signature)
        this.sendSignatureToServer(signature, address)
        // Отримано підписане повідомлення, відправте його на сервер
        // this.sendSignatureToServer(signature);
      } catch (error) {
        console.error('Помилка при підписуванні повідомлення:', error);
      }
    },

    sendSignatureToServer(signature, address) {
      axios.post('http://lib.loc/api/authenticate-new-web', {signature, address})
      .then(data => {
        console.log('server callback:', data);
      })
      .catch(error => {
        console.error('Помилка при виконанні запиту:', error);
      });
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
