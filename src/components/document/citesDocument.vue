<template>
<div >
  <span class="cite-frame" v-if="cites.document_citation" @click="show_all_cites">Посилань<span>{{ cites.document_citation.value }}</span></span>

  <div class="cites-modal" v-if="openModal">
    <div class="modalBackground">
      <div class="modalActive">
        <div class="modalClose" @click="openModal = false">
          <small title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg></small>
        </div>
        <div class="modalWindow">
          <h3>Посилання документа</h3>
          <div class="item-reference" v-for="(reference,idx) in getDocument.references">
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

export default {
  props:['getDocument'],

  data(){
    return{
      cites:{},
      document_cites: [
        {title:'Hello world'},
        {title:'Hello world2'}
      ],
      openModal:false,
    }
  },

  methods:{
    citesDocument(){
      let id = router.currentRoute.value.params.id
      axios.get(this.api_url_v1 + '/report/document-citation/' + id).then(response => {
        this.cites = response.data
      }, err => {
        console.log('cites error:',err);
      })
    },
    show_all_cites(){
      this.openModal = true

      // this.modalTrigger.addEventListener("click", function () {
      //   // делаем модальное окно видимым
      //   this.modalBackground.style.display = "block";
      //
      //   // если размер экрана больше 1366 пикселей (т.е. на мониторе может появиться ползунок)
      //   if (this.windowInnerWidth >= 1366) {
      //     this.bodyMargin;
      //   }
      //
      //   // позиционируем наше окно по середине, где 175 - половина ширины модального окна
      //   this.modalActive.style.left = "calc(50% - " + (175 - this.scrollbarWidth / 2) + "px)";
      // });
    },

    closeWindow(e){
      // if (!this.$el.contains(e.target))
      if (e.target.className === 'modalBackground')
      {
        this.openModal = false
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
    this.citesDocument()
  },
  beforeDestroy () {
    window.removeEventListener('click',this.closeWindow, false)
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


.modalBackground {
  display: block;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  /* указываем z-индекс для корректного наслаивания */
  z-index: 1;
}
.modalActive {
  position: absolute;
  width: 60%;
  top: 60px;
  left: 20%;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  cursor: default;
  padding: 40px 20px;
  z-index: 999;
}

.modalClose {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.modalWindow {
  position: relative;
}

.modalWindow > h3{
  text-align: center;
}

.cite-frame{
  display: flex;
}

.cite-frame > span{
  font-weight: bold;
  color: #333333;
}

</style>