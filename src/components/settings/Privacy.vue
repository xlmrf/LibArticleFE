<template>
  <div class="privacy-settings">
    <h3>Privacy</h3>
    <div class="person-email">
      <span>Change email</span>
      <div>
        <label for="email">email</label>
        <input class="sample-input" type="text" name="" id="email" v-model="data.email">
      </div>
    </div>
    <div class="new-password">
      <label for="email">password</label>
      <input class="sample-input" type="password" name="" id="new-password" v-model="data.password">
    </div>
    <div class="confirm-new-password">
      <label for="email">confirm password</label>
      <input class="sample-input" type="password" name="" id="confirm-new-password" v-model="data.confirm_password">
    </div>
    <div class="person-email">
      <label for="old-password">your password</label>
      <input class="sample-input" type="password" name="" id="old-password" v-model="data.old_password">
    </div>
    {{getUser}}
    <button @click="changePrivacy">Save</button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
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
    ...mapGetters(['getUser'])
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
  align-self: center;
  width: 50%;
  position: relative;
  left: 25%;
  top: 5%;
}
.privacy-settings > h3{
  justify-self: center;
  align-self: center;
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
</style>