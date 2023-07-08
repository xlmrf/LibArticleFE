<template>
<!--  {{message}}-->
  <div class="message-item" v-if="message.check">
<!--    <p>{{message.type}}</p>-->
<!--    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></span>-->
    <span @click="$router.push('/document/'+message.document_id)" class="title-message" v-html="getMessageUa({type:message.type, document_title:message.document_title, document_id:message.document_id})"></span>
<!--    <span>{{message}}</span>-->
    <span class="date-message">{{ getConvertDate(message.created_at) }}</span>
<!--    // new Date(Date.parse(message.created_at)).toUTCString().slice(0,-4)-->
  </div>

  <div class="message-item unread-message" @click="read" v-else>

<!--    <p>{{message.type}}</p>-->
    <span @click="$router.push('/document/'+message.document_id)" class="title-message" v-html="getMessageUa({type:message.type, document_title:message.document_title, document_id:message.document_id})"></span>
    <span class="date-message">{{ getConvertDate(message.created_at) }}</span>

  </div>
</template>

<script>

import {mapMutations, mapState} from "vuex";

export default {
  mixins:['dateConverter', 'messages'],
  props:['message'],
  computed:{
    read(){
      axios.get(this.$store.state.api_url_v1+'/actions/check-message/'+this.message.id).then(res => {
        this.message.check = res.data.notice_check
        console.log('response',res);
        this.updateNewMessagesCount(-1)
      })
    },
    // ...mapState(['api_url_v1'])
  },
  methods:{
    ...mapMutations(['updateNewMessagesCount'])
  }

}
</script>

<style scoped>

.title-message{
  font-size: 20px;
  padding-right: 100px;
  cursor: pointer;
}

.date-message{
  position: absolute;
  margin: 5px;
  right: 0;
  top: 20px;
}

.message-item{
  background: white;
  position: relative;
  padding: 15px 10px 30px 5px;
  /*border-top: 1px solid #bbbbbb;*/
  border-bottom: 1px solid #bbbbbb;
  /*margin: 10px 0;*/
}

.unread-message{
  background: #d1effd;
  cursor: pointer;
}
</style>