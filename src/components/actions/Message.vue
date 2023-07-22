<template>
<!--  v-for="notice in type === 'message' ? sortNotices: notices" sort in message-->
  <div @click="read(message.id)">
    <div class="message-item" :class="{'unread-message': type === 'message' ? !message.check : false}">
      <span @click="$router.push('/document/'+message.document_id)" class="title-message" v-html="getMessageUa(message,type)"></span>
      <span class="date-message">{{ getConvertDate(message.created_at) }}</span>
    </div>
  </div>
</template>

<script>

import {mapMutations, mapState} from "vuex";

export default {
  mixins:['dateConverter', 'messages'],
  props:['message','type'],
  computed:{
    sortNotices(){
      const checkedItems = this.notices.filter(item => item.check === 1);
      const uncheckedItems = this.notices.filter(item => item.check === 0);
      return [...uncheckedItems, ...checkedItems];
    }
    // ...mapState(['api_url_v1'])
  },
  methods:{
    read(idx){
      // console.log(this.notices.find(item => item.id === idx).check);

      axios.get(this.$store.state.api_url_v1+'/actions/check-message/'+idx).then(res => {
        this.notices.find(item => item.id === idx).check = res.data.notice_check
        console.log('response',res);
        this.updateNewNoticesCount(-1)
      })
    },
    ...mapMutations(['updateNewNoticesCount'])
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