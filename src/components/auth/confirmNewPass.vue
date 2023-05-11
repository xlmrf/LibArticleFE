<template>
  <div class="form-control">
    <h3>spaceeternal8@gmail.com</h3>
    <div class="area-control">
      <input type="password" name="password" id="in-password" required v-model="data.password" :class="['input in-form', {invalid:valid.password}]">
      <label for="in-password" class="marker">Пароль</label>
      <small class="field-message-error">{{valid.password}}</small>
    </div>
    <div class="area-control">
      <input type="password" name="password" id="confirm-password" @keypress.enter="enter" required v-model="data.confirm_password" :class="['input in-form', {invalid:valid.confirm_password}]">
      <label for="in-password" class="marker">Підтвердження</label>
      <small class="field-message-error">{{valid.confirm_password}}</small>
    </div>
    <div>
      {{messages}}
    </div>
    <button :class="['sign-in-system btn primary', {load:loader}]" type="submit" @click="enter">
      Змінити пароль<loader v-if="loader" class="type-loader" :radius="8" :width="2"></loader>
    </button>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import loader from "@/components/additional/loader";
import axios from "axios";

export default {

  data(){
    return{
      data:{
        token: this.$route.params.token,
        password: '',
        confirm_password: ''
      },
      valid:{
        password:'',
        confirm_password: ''
      },
      loader: false,
      messages:[]
    }
  },
  methods:{
    ...mapActions(['createPass']),
    enter(){
      this.loader = true
      if (this.validate) {
        this.changePassword(this.data)
      }
      else {
        this.loader = false
      }
    },
    changePassword(){
      axios.post(this.api_url_v1 + '/reset-password/' + this.data.token, this.data).then(res => {
        this.messages = res.data
      },
      err => {
        this.messages = err.response.data
        console.log(err.response.data.message);
      })
    }
  },
  watch:{
    getMessage(){
      this.loader = false
    },
    password(){
      this.valid.password = ''
    },
  },
  computed:{
    ...mapState(['api_url_v1']),

    validate(){
      const non_pass = "Введіть пароль"
      if (this.data.password === ''){
        this.valid.password = non_pass
      }
      if (this.data.password !== this.data.confirm_password){
        this.valid.confirm_password = 'Паролі не співпадають'
      }
      return !(this.valid.password || this.valid.confirm_password);
    }
  },
  mounted() {

  },
  components:{loader}

}
</script>


<style scoped>

.form-control > h3{
  margin: -20px auto 30px auto;
  color: #222222;
  /*font-weight: normal;*/
}

</style>