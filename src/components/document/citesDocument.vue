<template>
<div >
  <span class="cite-frame" v-if="cites.document_citation" @click="showAllCites">Посилань<span>{{ cites.document_citation.value }}</span></span>

  <div class="cites-modal" v-if="openModal">
    <div class="modalActive">
      <small class="modalClose" title="Close" @click="openModal = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="#535353" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </small>
      <div class="modalWindow">
        <div class="top-modal-window">
          <input type="text" v-model="searchCites" placeholder="Estimation of radio...">
          <h3 @click="pageCounter++">Посилання документа</h3>
        </div>
        <div class="files-tape">
          <div class="item-reference" v-for="(reference,idx) in document_cites">
            <span class="ref-body">{{idx+1}}. {{reference.bibliographic_description}}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import router from "@/router";
import {mapState} from 'vuex'
import axios from "axios";
import DocumentRefs from "@/components/document/documentRefs";

export default {
  components: {DocumentRefs},
  props:['getDocument'],

  data(){
    return{
      cites:{},
      scrolled:false,
      pageCounter:1,
      lastPage:1,
      searchCites:'',
      document_cites: [
        {title:'Hello world'},
        {title:'Hello world2'}
      ],
      arr:[],
      openModal:true,
    }
  },

  methods:{
    citesDocument(){
      let id = router.currentRoute.value.params.id
      axios.get(this.api_url_v1 + '/report/document-citation/' + id).then(response => {
        this.cites = response.data
        console.log(this.cites, 'cites');
      }, err => {
        console.log('cites error:',err);
      })
    },
    getCites(){
      let id = router.currentRoute.value.params.id
      axios.get(this.api_url_v1 + '/document/'+ id + '/citation?q=&perPage=5').then(response => {
        this.lastPage = response.data.last_page
        this.document_cites = response.data.data
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

    showAllCites(){
      this.openModal = true
    },

    closeWindow(e){
      // if (!this.$el.contains(e.target))
      if (e.target.className === 'cites-modal')
      {
        this.openModal = false
      }
    },
    onScroll(e){

      if (e.target.offsetHeight + e.target.scrollTop > e.target.scrollHeight-10){
        this.scrolled = true
        console.log('ok')
      }

    }
  },

  watch:{

    searchCites(){
      this.findCites()
    },
    scrolled(){
      if (this.scrolled && this.pageCounter - 1 !== this.last_page ){
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
    this.citesDocument()
    this.getCites()
  },
  beforeDestroy () {
    window.removeEventListener('click',this.closeWindow, false)
    document.getElementsByClassName('files-tape')[0].removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style scoped>

/*.cites-modal{*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  background: rgba(255, 0, 0, 0.14);*/
/*  z-index: 999;*/
/*  position: absolute;*/
/*  top: 0;*/
/*  left: 0;*/

/*}*/

.item-reference{
  margin-top: 15px;
}

.top-modal-window{
  display: flex;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #A9A9A995;
}

.top-modal-window > input{
  position: absolute;
  left: 10px;
  top: 6px;
  padding: 5px 6px;
  font-size: 1em;
}

.cites-modal {
  display: block;
  background: rgba(0, 0, 0, 0.7);
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
  cursor: default;
  padding-bottom: 20px;
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
  align-self: center;
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  overflow: auto;
  /*overflow-y: hidden;*/
  scrollbar-width: thin;
  z-index: 10;
}
.files-tape > div{
  padding: 15px;
  /*border-radius: 3px;*/
  /*border: 1px solid #0048BA;*/
  font-size: 18px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
}

</style>