<template>
  <div class="middle-spinner" v-if="!this.getMakeDocument.id">
    <span><loader width="4" radius="20"></loader></span>
  </div>
  <div v-else>
<!--    {{getMakeDocument}}-->
    <div class="card-top">
      <h2 :style="{ 'font-size': '22px' }" ref="refTitle">{{ getMakeDocument.title }}</h2>
      <h4>{{ this.$store.getters.getLanguage.types[getTypes.find(type => type.id === getMakeDocument.type_id)?.name] }}</h4>
      <!--      <h4>{{getMakeDocument}}</h4>-->
      <span class="rename-title-btn" @click="$emit('prev')">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg>
      </span>
    </div>
    <div class="fill-areas-document">
      <files-frame-component :empty="fileEmpty" @fileLoad="this.fileEmpty = false"/>
      <div class="fill-areas">
        <div class="form-item" v-for="(item,idx) in getTypes.find(type => type.id === getMakeDocument.type_id)?.fields"
             :key="idx" :class="{'universal-field': ['edition','place'].includes(item) }" >
          <label :for="item">
            {{this.$store.getters.getLanguage.document_make.signs[item] }}
            <span class="area-hint">
              <svg xmlns="http://www.w3.org/2000/svg"
                   @mouseover="hintTicket = idx" @mouseout="hintTicket = -1"
                   width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b5b5b5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </span>
            <span class="helper-hint-text" :class="{'helper-hint-text-show': hintTicket === idx}" >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#539DE7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>{{this.$store.getters.getLanguage.document_make.hint_description[item] }}</span>
            </span>
          </label>
          <component :is="setFields(item)" :key="idx" :field="item" :is-ready="isReady" @catchValidate="validate"></component>
<!--          <small class="text-error error-area-text" v-if="validationItems.includes(item)">Поле <span class="areas-name">{{ translateAreas(item) }}</span> не може бути пустим</small>-->
        </div>
        <div class="btn-control-panel">
          <button class="button conclusion-btn" :class="{'disable-btn': false}" @click="update()">
            {{ this.$store.getters.getLanguage.document_make.signs.publish_btn}}
          </button>

          <div class="loader-3 center"><span></span></div>
          <button class="button to-archive" @click="toArchive()">{{ this.$store.getters.getLanguage.document_make.signs.save_draft_btn}}</button><!--toArchive-->
          <small class="text-error save-error border-error" v-if="serverError">{{ serverError }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorsField from "@/components/DocumentMake/Fields/AuthorsField";
import KeywordsField from "@/components/DocumentMake/Fields/KeywordsField";
import PagesField from "@/components/DocumentMake/Fields/PagesField";
import Publication_dateField from "@/components/DocumentMake/Fields/DateField";
import ReferencesField from "@/components/DocumentMake/Fields/ReferencesField";
import UniversalField from "@/components/DocumentMake/Fields/UniversalField";
import DescriptionField from "@/components/DocumentMake/Fields/DescriptionField";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import loader from "@/components/additional/loader";
import FilesFrameComponent from "@/components/DocumentMake/Fields/FilesFrameComponent";

export default {
  emits: ['prev'],
  mixins: ['translate'],
  data() {
    return {
      isComplete: false,
      invalidAreas:{},
      serverError:null,
      hintTicket: -1,

      fileEmpty:false,

      validationItems:[],
      isReady: false,
    }
  },
  watch:{

    getFiles:{
      handler() {
        console.log('getFiles',this.getFiles);
        this.fileEmpty = false
      },
      deep:true
    }

  },
  methods: {
    ...mapActions(['updateDocument', 'requestDocument']),
    ...mapMutations(['DocumentMutate', 'FilePusher', "updateStoreDocument"]),

    validate(name){
      this.validationItems.push(name)
      this.isReady = false
      console.log('check')
    },

    setFields(item) {
      if (item === 'place' || item === 'subject_area')
        return 'universal-field';
      else
        return item + '-field';
    },

    async update(){
      await this.check()
      let document = this.getMakeDocument

      if (Object.keys(this.validationItems).length === 0 && !this.fileEmpty){
        console.log('upd doc not work')
        document.files = this.getFiles
        this.updateDocument(document)
      }
    },

    toArchive(){
      this.serverError = null
      let document = this.getMakeDocument
      document.files = this.getFiles
      this.updateDocument(document)
      this.$router.push('/profile/'+this.getUser.id)
    },
    check(){
      console.log('CHECK FUNCTION')
      this.validationItems = []
      this.serverError = null
      const rules = this.getTypes.find(type => type.id === this.getMakeDocument.type_id)?.rules
      const requiredKeys = Object.keys(rules).filter(key => rules[key].includes('required'));
      this.isReady = true
      setTimeout(() => {
        if (!this.getFiles.main || !this.getFiles.main.url){
          this.fileEmpty = true
          // this.point = false
          this.isReady = false
        }
        if (this.validationItems.length >! 0 && !this.validationItems.every(item => requiredKeys.includes(item))) {
          this.isReady = false
        }
      },500)
    },
  },
  computed: {
    ...mapGetters(['getMakeDocument', 'getTypes','getFiles', 'getUser']),
    ...mapState(['api_url_v1']),

    resetDocument() {

      // let document = JSON.parse(localStorage.getItem('not_finished_document'))
      // let new_document = Object.assign(document,this.document)
      // localStorage.setItem('reset_document',JSON.stringify(new_document))
    },
  },

  beforeMount() {
    // console.log('edit document mount doc, params: ', this.getMakeDocument, this.$route.params)
    if (this.getMakeDocument.id && this.getMakeDocument.id !== this.$route.params.id){
      console.log('document removed')
      // this.updateStoreDocument({})
      // this.requestDocument(this.$route.params.id);
    }
  },
  mounted() {
    if (!this.getMakeDocument.id ) {
      this.$emit('prev')
    }
  },


  components: {
    FilesFrameComponent,
    loader, Publication_dateField, KeywordsField, AuthorsField, PagesField, ReferencesField, UniversalField, DescriptionField
  }
}
</script>

<style>

.add-btn:hover{
  border: 1px solid #535353;
  color: #333333;
}



.card-top{
  font-size: 1em;
  padding: 5px;
  width: 100%;
  align-self: center;
  overflow:hidden;
  text-decoration:none;
  background: rgba(65, 159, 217, 0.15);
  position:relative;
  border: none;
  outline: none;
  color: #212121
}
.card-top h2{
  /*margin-bottom: 0.5rem;*/
}

.card-top h2, .card-top h4{
  /*border: 1px solid blue;*/
  font-weight: normal;
  text-align: center;
}
.card-top h4{
  color: #525252;
  /*margin: 0.5rem;*/
}
.card-top::after{
  content:'';
  position:absolute;
  width:100%;
  height:0.05rem;
  left:0;
  bottom:0;
  background: rgba(87, 176, 235, 0.2);
}
.card-top::after{
  transform:scale(1,1);
  transition: transform 0.22s ease;
}

.card-top svg:hover{
  stroke: #212121;
}

.card-top{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-top > h2{
  width: 80%;
  /*  text-align: center;*/
}

.wrapper{
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
}

/**************display:flex*********************/

.document-areas{
  display: inherit;
  width: 40%;
  flex-flow: column;
  align-items: end;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  /*margin-top: 3rem;*/
  background: #fff;
  padding: 1rem;
  /*border: 1px solid rgba(169, 169, 169, 0.75);*/
  border-radius: 5px;
  /*margin-right: 1rem;*/
}
.form-item{
  /*border: 1px solid #E1DBC8;*/
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: 8px;
  background: white;
  position: relative;
  display: inherit;
  flex-flow: column;
  width: 100%;
  /*border: 1px solid #bbb;*/
  margin: 10px 0;
  padding: 5px;
}

.form-item > div{
  /*padding: 5px 10px 0 10px;*/
}

.form-item > label{
  position: relative;
  /*top: -20px;*/
  color: #333333;
  /*background: #FBFBFB;*/
  display: flex;
  width: fit-content;
  left: 10px;
  padding: 0 3px;
  /*font-weight: bold;*/
  font-size: 20px;
  margin-bottom: 20px;
}

.area-hint{
  position: absolute;
  right: -20px;
  top: 3px;
}
.area-hint > svg{
  cursor: pointer;
  /*stroke: #b5b5b5;*/
  /*-webkit-transition: 0.22s;*/
  /*-moz-transition:    0.22s;*/
  /*-ms-transition:     0.22s;*/
  /*-o-transition:      0.22s;*/
  /*transition:         0.22s;*/
}
.area-hint > svg:hover{

  stroke: #1C75DD;
}

.helper-hint-text{
  font-size: 16px;

  display: none;
  width: max-content;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  z-index: 9;
  position: absolute;
  top: 33px;
  left: -20%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.95);
}
.helper-hint-text-show{
  display: flex;
  align-items: center;
  width: 300px;
}
.helper-hint-text > svg{
  margin: 1px 5px;
  margin-right: 15px;
  min-width: 20px;
}

.form-item label{
  color: #444444;

}

.universal-field{
  flex: 1;
  margin-right: 5px;
}

.universal-field:last-of-type{
  color: red;
}

.btn-control-panel
{
  margin-top: 15px;
  display: flex;
  flex-flow: column;
  width: 100%;
  align-items: center;
}

.btn-control-panel{
  position: relative;
  padding-top: 20px;
}
.btn-control-panel:after{
  content: "";
  position: absolute;
  background: rgba(154, 154, 154, 0.5);
  width: 100%;
  height: 1px;
  top: 0;
  right: 0;
}

.author-fill-list{
  border-left: 1px solid #BBBBBB;
  margin-left: 0.2rem;
  padding-left: 0.2rem;
  /*padding: 10px;*/
  /*width: 80%;*/
  /*border: 1px solid green;*/
  /*overflow:hidden;*/
  /*font-size: 14px;*/
  /*padding:10px 25px;*/
  text-decoration:none;
  background: none;
  outline: none;
  position: relative;
  /*border: 1px solid seagreen;*/
}
.author-list-item{
  text-decoration:none;
  background: none;
  outline: none;
  position: relative;
  display: flex;
  width: 95%;
  margin: 0.3rem 0;
  /*border: 1px solid orangered;*/
}
.author-list-item >:first-child{
  flex: 3;
}
.author-list-item > div{
  flex: 2;
}
.author-list-item > div{
  margin: 2px;
}

/*.author-list-item >:last-child{*/
/*  border: 1px solid red;*/
/*  !*flex-wrap: wrap;*!*/
/*}*/

/*.user-remove-btn{*/
/*  !*display: flex;*!*/
/*  margin-top: auto;*/
/*  !*align-self: center;*!*/
/*  top: 45%;*/
/*  right: -5%;*/
/*  position: absolute;*/
/*  !*right: -30px;*!*/
/*  cursor: pointer;*/
/*  !*border: 1px solid black;*!*/
/*}*/
/*.user-remove-btn:hover{*/
/*  stroke: #525252;*/
/*  !*border: 1px solid black;*!*/
/*}*/
.author-fill-list > span{
  display: flex;
  align-items: center;
  padding: 0.2rem;
  width: 100%;
}
.author-fill-list > span > label{
  cursor: pointer;
}
.new-author-btn{
  align-self: center;
  position: relative;
  cursor: pointer;
  /*margin-left: auto;*/
  /*margin-right: 40px;*/
  border-radius: 4px;
  padding: 6px 8px;
  margin-right: 4px;
  overflow:hidden;
  background: none;
  outline: none;
  color: #525252;
}
/*.new-author-btn::after{*/
/*  content:'';*/
/*  position:absolute;*/
/*  width:100%;*/
/*  height:0.05rem;*/
/*  left:0;*/
/*  bottom:0;*/
/*  background: #525252;*/
/*}*/
/*.new-author-btn::after{*/
/*  transform:scale(0.85,1);*/
/*  transition: transform 0.1s ease;*/
/*}*/
/*.new-author-btn:hover::after{*/
/*  transform:scale(1,1);*/
/*}*/

.new-author-btn:hover{
  background: #eeeeee;
}


.check-coauthor>input{
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.check-coauthor>span{
  display: inline-flex;
  align-items: center;
  user-select: none;
  font-size: 16px;
}

.check-coauthor>span::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
/*.check-coauthor>input:not(:disabled):not(:checked)+span:hover::before {*/
/*  border-color: #4E5477;*/
/*}*/
/*.check-coauthor>input:checked+span::before {*/
/*  border-color: #525252;*/
/*  background-color: #525252;*/
/*  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");*/
/*}*/

.complex-item-control > span{
  display: flex;
}

.list-keywords{
  display: none;
  list-style: none;
  flex-wrap: wrap;
  /*border: 1px solid #BBBBBB;*/
  margin: 5px 0;
  border-radius: 4px;
  padding-top: 0.2rem;
  color: #525252;
}
.list-able{
  display: flex;
}
.list-keywords small, .list-references small{
  display: flex;
  align-self: end;
  margin-left: 5px;
  cursor: pointer;
}
.list-keywords >li, .list-references > li{
  display: flex;
  border: 1px solid #BBB;
  border-radius: 3px;
  margin: 3px;
  padding: 5px;
  align-self: center;
}

.list-references{
  list-style: none;
  color: #525252;
  width: 90%;
  margin: 5px;
  position: relative;
  flex-flow: column;
  /*display: none;*/
}
.list-references small{
  display: flex;
  align-self: center;
  /*margin-left: 5px;*/
  cursor: pointer;
  position: absolute;
  right: 1rem;
  /*border-left: 1px solid #525252;*/
  /*margin-left: 5px;*/
  /*padding-left: 5px;*/
}



/*.list-references small:after {*/
/*  content: "";*/
/*  background: black;*/
/*  position: absolute;*/
/*  bottom: 0;*/
/*  left: 0;*/
/*  height: 100%;*/
/*  width: 1px;*/
/*}*/

.list-references > li{
  width: 100%;
  padding-right: 40px;
}
.list-references > li > span{
  margin: 0 3px;
}

.complex-item-control input{
  flex: 3;
  width: 50%;
}

.add-btn{
  flex: 1;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  margin: 0 5%;
  padding: 5px;
  overflow: hidden;
  background: none;
  text-align: center;
  border: 1px solid #A9A9A9;
  outline: none;
  color: #525252;
  align-self: center;
}

.btn-control{
  display: flex;
  align-self: center;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  margin: 2rem;
}
.btn-control span{
  margin: 0.5rem;
  color: #999999;
  border-bottom: 1px solid #999999;
  cursor: pointer;
}
.btn-control span:hover{
  color: #525252;
  border-bottom: 1px solid #525252;
}

/*items*/

.card-top button{
  background: transparent;
  width: auto;
  transition: transform .4s;
  cursor: pointer;
  border-radius: 50%;
}
.card-top button:hover{
  background: #f1f1f1;
}

.rename-title-btn{
  position: absolute;
  top: calc(50% - 16px);
  right: 2rem;
  /*margin: 0 0.4rem;*/
  cursor: pointer;
  width: 32px;
  height: 32px;

}

.sample-input{
  border: 1px solid #CCCCCC;
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  font-size: 16px;
  resize: none;
  outline: none;
  width: 100%;
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
  -ms-transition: all .3s ease-out;
  -o-transition: all .3s ease-out;
  transition: all .3s ease-out
}
.document-description-area{
  max-width: 100%;
  min-width: 30%;
  resize: both;
  padding: 0.3rem;
  transition: all .0s ease-out;
  color: #535353;
}

.sample-input:focus,
.sample-input:hover{
  border: 1px solid #419FD9;
}
.sample-input-error:valid{
  border: 1px solid rgba(229, 50, 45, 0.8);
}

.sample-input:disabled:hover{
  border: 1px solid #BBBBBB;
}
#co-author{
  margin: 0 0.5rem;
}
.complex-item-control > small{
  color: rgba(229, 50, 45, 0.8);
  margin-left: 5px;
}

.conclusion-btn{
  width: fit-content;
  padding: 10px 50px;
  font-size: 1em;
  background: #4694f1;
  border-radius: 3px;
  /*color: #333333;*/
  color: white;
  /*border: 1px solid #525252;*/
}

.conclusion-btn:hover{
  background: #5a9cea;
}

.disable-btn:hover{
  background: rgba(129, 131, 132, 0.25);
}

.fill-areas-document {
  position: relative;
  padding-bottom: 2rem;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.to-archive{
  /*position: absolute;*/
  margin: 10px 0;
  background: transparent;
  /*border: 1px solid #525252;*/
  border-bottom: 1px solid #323232;
  padding: 5px;
  /*border-radius: 4px;*/
}
.to-archive:hover{

}

.save-error{
  margin-top: 20px;
  /*padding: 5px;*/
}
.border-error{
  /*position: absolute;*/
  /*bottom: 0;*/
  /*right: 100px;*/

  padding: 8px 10px;
  border: 1px solid rgba(217, 39, 27, 0.87);
}

.fill-areas-document > div:first-child{
  flex: 3 300px;

}

.fill-areas{
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.areas-name{
  text-transform: lowercase;
  padding: 2px;
}

.error-area-text{
  margin: 0 5px;
}

.fill-areas-document > div {
  flex: 1 400px;
  margin: 0 1.3rem;
}

.complex-item-control{
  display: flex;
  flex-flow: column;
  width: 100%;
}
.complex-item-control > span{
  width: 100%;
}

.reference-list{
  padding: 0.4rem 0 0.2rem 0;
}


</style>