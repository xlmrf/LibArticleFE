<template>
  <div>
    <message :notices="story" type="story" v-if="messageRequest"/>
    <loader v-else/>
  </div>
</template>

<script>
import Message from "@/components/actions/Message";
import axios from "axios";
import {mapState} from "vuex";
import Loader from "@/components/additional/loader";
export default {
  components: {Loader, Message},
  data(){
    return{
      story:[
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
      messageRequest: false
    }
  },

  computed:{
    getNotices(){
      this.messageRequest = false
      axios.get(this.api_url_v1 + '/actions/story').then(response => {
        this.story = response.data
        this.messageRequest = true
      }, err => {
        this.messageRequest = true
        console.log('cites error:',err);
      })
    },
    ...mapState(['api_url_v1'])
  },

  methods:{

  },

  mounted() {
    this.getNotices
  }

}
</script>

<style scoped>

</style>