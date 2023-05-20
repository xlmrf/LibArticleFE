<template>
  <div class="loader" v-if="!getProfile">
    <span><loader width="2" radius="13"></loader></span>
  </div>
  <div class="privacy-settings" v-else>

    <h2>Зміна паролю</h2>

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

             class='sample-input'>
      </span>
      <span>
      <label for="new-password">Новий пароль</label>
      <input type="password"
             name="new-password" id="new-password"

             class='sample-input'>
      </span>
      <span>
      <label for="confirm-password">Підтвердження паролю</label>
      <input type="password"
             name="confirm-password" id="confirm-password"

             class='sample-input'>
      </span>
    </div>

    <div class="alert alert-warning" >
      <small>
        Для більшої надійності паролю, не використовуйте очевидні відношення (Дата народження, ПІБ, т.п.) <br>та легкі комбінації (12345678, helloworld...)
      </small>
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
  align-self: center;
  width: 100%;
}

.privacy-settings > h2{
  margin: 0 0.5rem;
}

.setting-block {
  display: inherit;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  outline: none;
  width: 300px;
}

.setting-block > span{
  margin: 6px 0;
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
  /*border: 1px solid rgb(34,46,152);*/
  /*background: rgba(153, 159, 239, 0.1);*/
  position: relative;
  padding: 15px;
  font-size: 18px;
  border: 1px solid rgba(147, 158, 179, 0.5);
  background: rgba(128, 167, 221, 0.1);
}
.alert-error{
  border: 1px solid #EB4C42;
  background: rgba(255, 15, 0, 0.1);
}

</style>