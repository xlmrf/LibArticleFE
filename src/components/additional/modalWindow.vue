<template>
  <div class="modal-body">
    <small class="modalClose" title="Close" @click="$emit('close-modal')">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </small>
    <div class="modalActive">
<!--      <div class="modalWindow">-->
        <component :is="component" />
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import PulseLoader from "@/components/additional/pulseLoader";
import draftModal from "@/components/DocumentMake/draftModal";
import citesModal from "@/components/document/citesModal";
import router from "@/router";
import axios from "axios";
import {mapState} from "vuex";
export default {
  components: {PulseLoader, draftModal, citesModal},
  emits:['close-modal'],
  props:['component'],

  data(){
    return{
      cites:{},
      scrolled:false,
      pageCounter:1,
      lastPage:1,
      searchCites:'',
      document_cites: [],
      arr:[],
      openModal:false,
    }
  },

  methods:{
    getCites(){
      let id = router.currentRoute.value.params.id
      axios.get(this.api_url_v1 + '/document/'+ id + '/citation?q='+this.searchCites+'&perPage=5').then(response => {

        this.lastPage = response.data.last_page
        this.document_cites = response.data.data
        this.pageCounter = 1

      }, err => {
        console.log('get cites error:',err);
      })
    },

    findCites(){

      let id = router.currentRoute.value.params.id
      axios.get(this.api_url_v1 + '/document/'+ id + '/citation?q='+this.searchCites+'&perPage=5&page='+this.pageCounter).then(response => {
        this.document_cites = [].concat(this.document_cites,response.data.data)
        this.scrolled = false
      }, err => {
        console.log('get cites error:',err);
      })
    },
    onScroll(e){
      if (e.target.offsetHeight + e.target.scrollTop > e.target.scrollHeight-10 && this.lastPage !== this.pageCounter){
        this.scrolled = true
      }

    },
    closeWindow(e){
      if (e.target.className === 'modal-body')
      {
        this.$emit('close-modal')
      }
    }
  },

  watch:{

    searchCites(){
      this.getCites()
    },
    scrolled(){
      if (this.scrolled && (this.lastPage > this.pageCounter)){
        this.pageCounter++
        this.findCites()
      }
    }
  },

  computed:{
    ...mapState(['api_url_v1']),
    // bodyMargin() {
    //   this.bodyElementHTML.style.marginRight = "-" + this.scrollbarWidth + "px";
    // }
  },
  mounted() {
    window.addEventListener('click', this.closeWindow, false)
    // document.getElementsByClassName('files-tape')[0].addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('click',this.closeWindow, false)
    // document.getElementsByClassName('files-tape')[0].removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style>

.modal-body {
  display: block;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.modalActive {
  position: absolute;
  overflow-y: auto;
  width: 60%;
  top: 60px;
  left: 20%;
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
  z-index: 999;
  min-height: 300px;
  height: calc(100% - 65px);
}

.modalClose {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  top: 72px;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  cursor: pointer;
  z-index: 99;
}

.modalClose:hover{
  /*stroke: #222222;*/
  background: rgba(236, 236, 236, 0.2);
}

.modalWindow {
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  overflow-y: auto;
}

.pulse-loader{
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>