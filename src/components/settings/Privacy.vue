<template xmlns="">
  <div class="privacy-settings">
    <div class="setting-block">
      <h3>Зміна почти</h3>
      <span>
<!--        <input type="text" name="email" id="in-email" required v-model="data.email"-->
<!--               @keyup.enter="this.$el.nextSibling.childNodes[1].firstChild.focus()"-->
<!--               :class="['input in-form', {invalid:valid.email}]">-->
<!--        <label for="in-email" class="marker">Email</label>-->
<!--        <span>{{data.email}}</span>-->
<!--        <small class="field-message-error">{{ valid.email }}</small>-->
      </span>

    </div>

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

    <div class="setting-block">
      <h3>Видимість акаунту</h3>
      <input type="checkbox" name="">
    </div>


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