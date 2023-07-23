<template>
  <div>
    <message v-for="notice in getMessages.notices" :message="notice" :id="'notice-' + notice.id" type="notices" v-if="messageRequest"/>
    <loader v-else/>
  </div>
</template>

<script>
import Message from "@/components/actions/Message";
import axios from "axios";
import {mapGetters, mapMutations, mapState} from "vuex";
import Loader from "@/components/additional/loader";
export default {
  components: {Loader, Message},
  data(){
    return{
      notices:[
        // {
        //   id:7,
        //   text: 'Вас відзначено як співавтора в документі "Sensor system and new..."',
        //   date: '22-05-2022',
        //   type: 'coauthor',
        //   check: 'false',
        //   ref_doc_title_id: {id:12, title:'Sensor system..'},
        //   who_marked_full_name_id: {id:1, name:'Name'},
        // },
        // {
        //   id:8,
        //   text: 'Документ набрав високої популярності. "Sensor system and new..."',
        //   date: '29-05-2022',
        //   type: 'popular',
        //   check: 'false',
        //   ref_doc_title_id: {id:12, title:'Sensor system..'}
        // },

      ],
      messageRequest: true
    }
  },

  computed:{
    getNotices(){
      this.messageRequest = false
      axios.get(this.api_url_v1 + '/actions/notices').then(response => {
        this.upnotices(response.data.data)
        this.messageRequest = true
      }, err => {
        this.messageRequest = true
        console.log('cites error:',err);
      })
    },
    ...mapState(['api_url_v1']),
    ...mapGetters(['getMessages'])
  },

  methods: {
    scrollToMessage() {
      // Перевірка наявності якоря в URL
      const anchor = window.location.hash;
      if (anchor) {
        // Знаходження повного повідомлення з заданим id
        const element = document.querySelector(anchor);
        if (element) {
          // Прокручування до повного повідомлення
          element.scrollIntoView({behavior: 'smooth'});
        }
      }
    },
    ...mapMutations(['upnotices'])
  },

  mounted() {
    if (this.getMessages.notices.length === 0){
      this.getNotices
    }
    this.scrollToMessage()
  }

}
</script>

<style scoped>

</style>