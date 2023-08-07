<template>
  <div class="cites-modal">
    <div class="modalActive">
      <small class="modalClose" title="Close" @click="$emit('close-modal')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="#535353" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </small>
      <div class="modalWindow">
        <div class="top-modal-window">
          <h3 @click="pageCounter++">Посилання документа</h3>
          <input type="text" v-model="searchCites" placeholder="Estimation of radio...">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#777777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <div class="files-tape">
          <div class="item-reference" v-for="(reference,idx) in document_cites">
            <span class="ref-body">{{idx+1}}. {{reference.bibliographic_description}}</span>
          </div>
          <button v-if="this.lastPage > this.pageCounter" @click="scrolled=true;">Підвантажити посилання</button>
        </div>
        <pulse-loader class="pulse-loader" v-if="scrolled" />
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from "@/components/additional/pulseLoader";
import router from "@/router";
import axios from "axios";
import {mapState} from "vuex";
export default {
  components: {PulseLoader},
  emits:['close-modal'],

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
      if (e.target.className === 'cites-modal')
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
    document.getElementsByClassName('files-tape')[0].addEventListener('scroll', this.onScroll)
    this.getCites()
  },
  beforeDestroy () {
    window.removeEventListener('click',this.closeWindow, false)
    document.getElementsByClassName('files-tape')[0].removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style scoped>
.item-reference{
  margin-top: 15px;
}

.top-modal-window{
  display: flex;
  position: relative;
  flex-flow: column;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #A9A9A995;
}

.top-modal-window > input{
  margin-top: 15px;
  padding: 5px 6px;
  font-size: 1em;
}

.top-modal-window > svg{
  position: absolute;
  right: 20px;
  bottom: 15px;
}

.cites-modal {
  display: block;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
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
  right: 5px;
  top: 9px;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  cursor: pointer;
  z-index: 99;
}

.modalClose:hover{
  /*stroke: #222222;*/
  background: rgba(169, 169, 169, 0.4);
}

.modalWindow {
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  overflow-y: auto;
}

.top-modal-window > h3{
  margin-left: auto;
  margin-right: auto;
  font-weight: normal;
}

.cite-frame{
  display: flex;
}

.cite-frame > span{
  font-weight: bold;
  color: #333333;
}


.files-tape{
  /*box-shadow: rgba(0, 0, 0, 0.35) 0px -8px 12px -8px inset;*/
  /*box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;*/
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  overflow: auto;
  /*overflow-y: hidden;*/
  /*scrollbar-width: thin;*/
  z-index: 10;
}
.files-tape > div{
  padding: 15px;
  /*border-radius: 3px;*/
  /*border: 1px solid #0048BA;*/
  font-size: 18px;
  display: inline-block;
  text-decoration: none;
}

.files-tape > button{
  display: flex;
  width: fit-content;
  margin: 8px auto;
  background: transparent;
  font-size: 1.1em;
  padding: 2px;
  color: #222222;
  border-bottom: 1px solid #222222;
  cursor: pointer;
}

.pulse-loader{
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>