<template>
  <div class="form-control">
    <div class="area-control">
      <input type="text" name="email" id="in-email" required v-model="data.email"
             :class="['input in-form', {invalid:eValidate}]">
      <label for="in-email" class="marker">Email</label>
      <small>{{ eValidate }}</small>
    </div>
    <div class="area-control">
      <input type="password" name="password" id="in-password" required @keypress.enter="enter" v-model="data.password"
             :class="['input in-form', {invalid:pValidate}]">
      <label for="in-password" class="marker">Пароль</label>
      <small>{{ pValidate }}</small>
    </div>

    <div v-if="getUserMessage.errors" v-bind="loader=false">
      <div v-for="item in getUserMessage.errors" class="alert" :class="alert_class(item.code)">
        <small>{{ item.text }}
          <router-link class="link-reset" to="/forget-password">Відновити пароль</router-link></small>
      </div>

    </div>
    <!--    <label class="save-session">-->
    <!--      <input type="checkbox" name="save-user" v-model="data.session" id="save-user">-->
    <!--      <span class="label">зберегти сесію</span>-->
    <!--    </label>-->
    <button :class="['sign-in-system btn primary',{load:loader}]" :disabled="loader" type="submit" @click="enter">
      Ввійти
      <loader v-if="loader" class="type-loader" :radius="8" :width="2"></loader>
    </button>
  </div>
  <div class="form-trip">
    <span class="text">Якщо немає акаунту, <router-link to="/registration"
                                                        class="text-to">створіть його</router-link></span>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import loader from "../additional/loader"
import email from "../../mixins/email"

export default {

  mixins: [email],
  data() {
    return {
      data: {
        email: '',
        password: '',
        session: ''
      },
      pValidate: '',
      eValidate: '',
      status: false,
      loader: false,
      enter_error: 'Введений не вірний пароль.',
    }
  },
  methods: {
    ...mapActions(['login']),
    ...mapMutations(['userMessages']),
    enter() {
      this.userMessages({})
      this.loader = !this.loader
      if (this.validate) {
        this.login(this.data)
      } else {
        this.loader = false
      }
    },
    alert_class(code) {
      if (code === 'credentials_incorrect')
        return 'alert-error';
      if (code === 'email_not_confirmed')
        return 'alert-warning';
    }
  },
  watch: {
    // getUserMessage() {
    //   console.log('watch', this.getUserMessage);
    //   if (this.getUserMessage.errors) {
    //     this.loader = false
    //   }
    // },
    'data.email': {
      handler() {
        this.eValidate = ''
        this.status = ''
      }
    },
    'data.password': {
      handler: function (key) {
        this.pValidate = ''
      }
    },
  },
  computed: {
    ...mapGetters(['getUserMessage']),
    validate() {
      const non_pass = "Введіть пароль"
      if (this.data.password === '') {
        this.pValidate = non_pass
      }
      if (this.checkEmail(this.data.email)) {
        this.eValidate = this.emailFail
      }
      return !(this.pValidate || this.eValidate);
    }
  },
  mounted() {
    // this.userMessages('')
  },
  unmounted() {
    // this.userMessages('')
  },
  components: {loader}

}
</script>

<style scoped>

/*.message-agree{*/
/*  border: 1px solid rgb(34,46,152);*/
/*  background: rgba(153, 159, 239, 0.1);*/
/*  padding: 10px;*/
/*  font-size: 16px;*/
/*}*/
/*.marker{*/
/*color: #b8b8b8;*/
/*font-size: 18px;*/
/*position: absolute;*/
/*pointer-events: none;*/
/*left: 0.9rem;*/
/*top: 0.7rem;*/
/*transition: 0.2s ease all;*/
/*-moz-transition: 0.2s ease all;*/
/*-webkit-transition: 0.2s ease all;*/
/*}*/
/*input:focus ~ .marker,*/
/*input:valid ~ .marker*/
/*{*/
/*  top: -1.5rem;*/
/*  left: 0.5rem;*/
/*  font-size: 16px;*/
/*  color: #212121;*/
/*}*/
/*.invalid:focus ~ .marker,*/
/*.invalid:valid ~ .marker*/
/*{*/
/*  color: red;*/
/*}*/
/*.area-control>small{*/
/*  display: flex;*/
/*  white-space: nowrap;*/
/*  align-self: start;*/
/*  top: 0.5rem;*/
/*  left: 19.2rem;*/
/*  position: absolute;*/
/*  color: red;*/
/*}*/

/*.save-session>input{*/
/*  opacity: 0;*/
/*  position: absolute;*/
/*  z-index: -1;*/
/*}*/
/*.save-session>span{*/
/*  display: inline-flex;*/
/*  align-items: center;*/
/*  user-select: none;*/
/*  font-size: 16px;*/
/*}*/

/*.save-session>span::before {*/
/*  content: '';*/
/*  display: inline-block;*/
/*  width: 1em;*/
/*  height: 1em;*/
/*  flex-shrink: 0;*/
/*  flex-grow: 0;*/
/*  border: 1px solid #adb5bd;*/
/*  border-radius: 0.25em;*/
/*  margin-right: 0.5em;*/
/*  background-repeat: no-repeat;*/
/*  background-position: center center;*/
/*  background-size: 50% 50%;*/
/*}*/
/*.save-session>input:not(:disabled):not(:checked)+span:hover::before {*/
/*  border-color: #4E5477;*/
/*}*/
/*.save-session>input:checked+span::before {*/
/*  border-color: #1059FF;*/
/*  background-color: #1059FF;*/
/*  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");*/
/*}*/
/*.load{*/
/*  cursor: default;*/
/*  border: 1px solid #717171;*/
/*  color: #717171;*/
/*}*/
/*.load:hover{*/
/*  cursor: default;*/
/*  border: 1px solid #717171;*/
/*}*/
.input {
  font-size: 18px;
  padding: 10px;
  display: block;
  width: 300px;
  border: 1px solid #cecece;
  border-radius: 7px;
  position: relative;
  height: 2.7rem;
  color: #212121;
  /*border-bottom: 1px solid #ccc;*/
}

.btn {
  height: 40px;
  width: 300px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 16px;
  background: none;
  border: 1px solid #212121;
  color: #212121;
  transition: 0s;
}

.btn:hover {
  border: 2px solid #212121;
}

.alert > small {
  padding: 5px;
}

.input:valid {
  border: 1px solid #1059FF;
}

.input:hover {
  border: 1px solid #212121;
}

.input:focus {
  outline: none;
  border: 2px solid #212121;
}

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

.area-control > small {
  display: flex;
  white-space: nowrap;
  align-self: start;
  top: 0.5rem;
  left: 19.2rem;
  position: absolute;
  color: red;
}

.save-session > input {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.save-session > span {
  display: inline-flex;
  align-items: center;
  user-select: none;
  font-size: 16px;
}

.save-session > span::before {
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

.save-session > input:not(:disabled):not(:checked) + span:hover::before {
  border-color: #4E5477;
}

.save-session > input:checked + span::before {
  border-color: #1059FF;
  background-color: #1059FF;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
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
