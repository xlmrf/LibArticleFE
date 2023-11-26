<template>
  <div class="title-modal">
    <div class="modalActive">
      <small class="modalClose" title="Close" @click="$emit('close-modal')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="#535353" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </small>
      <div class="modalWindow">
        <component :is="theComponent[$route.name]"  />
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from "@/components/additional/pulseLoader";
import TitleWarning from "@/components/DocumentMake/TitleWarning";
import DeleteWarning from "@/components/document/DeleteWarning";
import router from "@/router";
import axios from "axios";
import {mapGetters, mapState} from "vuex";

export default {
  emits:['close-modal','create-to-despite'],

  data(){
    return{
      openModal:false,

      theComponent:{
        'DocumentMake' :'title-warning',
        'document' : 'delete-warning'
      }
    }
  },

  methods:{
    closeWindow(e){
      if (e.target.className === 'title-modal')
      {
        this.$emit('close-modal')
      }
    },

    changeTitle(){

      this.$emit('close-modal')
      const titleInput = this.getTitleInput

      titleInput.select();

    }
  },

  computed:{
    ...mapState(['api_url_v1']),
    ...mapGetters(['getTitleInput','getDocumentMakeWarning', 'getMakeDocument'])

  },
  mounted() {
    window.addEventListener('click', this.closeWindow, false)
  },
  beforeDestroy () {
    window.removeEventListener('click',this.closeWindow, false)
  },
  components:{DeleteWarning, TitleWarning}
}
</script >

<style scoped>
.item-reference{
  margin-top: 15px;
}

.top-modal-window{
  color: #3a3a3b;
  font-size: 1.2em;
  text-align: center;
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

.title-modal {
  display: block;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.modalActive {
  position: relative;
  width: 420px;
  top: 25%;
  height: auto;
  left: 0;
  margin: 0 auto;
  border-radius: 8px;
  background-color: white;
}

.modalClose {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  cursor: pointer;
  z-index: 99;
}

.modalClose:hover{
  /*stroke: #222222;*/
  background: rgba(169, 169, 169, 0.3);
}

.modal-text-warning{
  display: flex;
  padding: 20px;
  font-size: 1.1em;
  margin: auto;
}
.modal-text-warning > svg{
  flex: 1;
  stroke: #4B89D9;
  align-self: center;
}

.modal-text-warning > span{
  color: #535353;
  font-size: 0.9em;
  flex: 5;
}

.btn-panel{
  display: flex;
  margin: 10px;
}
.btn-panel > button{
  margin: 10px;
}
.btn-panel > button:first-child{
  border: 1px solid transparent;
  background: #1C75DD;
  color: white;
}
.btn-panel > button:first-child:hover{
  background: #4188db;
  color: white;
}
.btn-panel > button:last-child:hover{
  border: 1px solid #006acd;
  color: #006acd;
}
.btn-panel > button:last-child{
  border: 1px solid #318CE7;
  color: #318CE7;
}

.cite-frame{
  display: flex;
}

.cite-frame > span{
  font-weight: bold;
  color: #333333;
}

.link-to-doc{
  display: flex;
  text-decoration: none;
  align-items: center;
  color: #318CE7;
  cursor: pointer;
  font-size: 1em;
}
.link-to-doc > svg{
  position: relative;
  top: 2px;
}

</style>