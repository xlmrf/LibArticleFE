<template>
  <div class="middle-spinner" v-if="!getDocument.id">
    <span><loader width="4" radius="20"></loader></span>
  </div>
  <div class="main-card" v-else>
    <div class="card-top">
      <h2>{{getDocument.title}}</h2>
      <h4>{{getDocument.category}}</h4>
<!--      <h4>{{getDocument}}</h4>-->
      <span class="rename-title-btn" @click="resetDocument"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg></span>
    </div>
        <div class="wrapper">

          <div class="file-card" >
            <files-frame></files-frame>    <!-- поле для завантаження файлу -->
          </div>

          <div class="document-areas" >
            <div class="form-item" v-for="(item,idx) in fromStorage ? JSON.parse(getDocument.category.areas) : getCategories.filter(x => x.name === getDocument.category).map(x => x['areas'])[0]"> <!-- find method not work -->
              <label :for="item">{{translateAreas(item)}}</label>
              <div class="author-fill-list" v-if="item === 'authors'">
                <author-fields :getUser="getUser" @newAuthor="setAuthors"></author-fields>
              </div>

              <div class="complex-item-control" v-else-if="item === 'keywords' || item === 'references'">
                <span>
                  <input type="text" class="inp-e" :id="item" v-model="comprehensive[item]" @keypress.enter="addItem(item)" >
                  <span class="add-keyword-btn" @click="addItem(item)">Додати</span>
                </span>
                <div :class="[{'list-keywords':item === 'keywords'},{'list-references':item === 'references'},{'list-able':this.document.keywords.length}]">
                  <li v-for="(el,idx) in document[item]"><span v-if="item === 'references'">{{idx+1}}.</span>{{el}}
                    <small @click="deleteItem(item,idx)"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line></svg></small>
                  </li>
                </div>
                <small>{{ error[item] }}</small>
              </div>

              <div v-else-if="item === 'description'"><textarea class="inp-e document-description-area" v-model="document[item]"></textarea></div>
              <input type="text" class="inp-e required-area" required :id="item" v-model="document[item]" v-else>
            </div>
            <div class="btn-control">
              <button class="btn conclusion-btn" @click="pushDocument">Створити</button>
              <span class="to-archive-btn" @click="pushDocument(false)">Занести в архів</span>
            </div>
          </div>
        </div>

  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import Loader from "../../additional/loader";
import FilesFrame from "../write/FilesFrameComponent";
import DocumentTypes from "./NewDocumentBaseComponent"
import AuthorFields from "../write/AuthorFieldsComponent"

export default {
  mixins:['translate'],
  data(){
    return{
      comprehensive: [],
      error:{
        keywords:'',
        references:''
      },
      document:{
        edition:'',
        place:'',
        authors:[
          {
            first_name:'',
            last_name:'',
            email:''
          }
        ],
        keywords:[],
        references:[],
        description:'',
        year:'',
        pages:'',
        ready:1
      },
      localFiles:[],
      fromStorage:false,
      valid: false,
      disabled: false,
      message: '',

    }
  },
  computed:{
    ...mapGetters(['getDocument','getCategories', 'getUser','getFiles']),
    ...mapActions(['reviseDocument','requestCategories']),
    transformDocument(){
      this.document.type = this.getDocument.category
      this.document.title = this.getDocument.title
      console.log('doc',this.getDocument)
      this.document.files = []
      this.getFiles.map(e => {
        e = {
          id: e.id,
          nameFile: e.nameFile,
          typeFile: e.typeFile
        }
        this.document.files.push(e)
      })
      return this.document
    },
    resetDocument(){
      let document = JSON.parse(localStorage.getItem('not_finished_document'))
      let new_document = Object.assign(document,this.document)
      localStorage.setItem('reset_document',JSON.stringify(new_document))
      },
  },
  watch:{
    title(){
      this.titleValid = ''
    },
    category(){
      this.categoryValid = ''
    },
    description(){
      this.descriptionValid = ''
    },
    'files.length':{
      handler: key =>{
        if(key >= 5 ){
          console.log('disabled')
          // this.disabled = true
        }
        else {
          // this.disabled = false
        }
      },
    }

  },
  methods:{
    ...mapActions(['updateDocument','DocumentSearcher']),
    ...mapMutations(['DocumentMutate']),
    setAuthors(value){
      this.document.authors = value
    },
    validate(valid){
      let size = valid.size/1024/1024
      if (size > 512){
        return null
      }
      if (valid.type !== 'application/pdf' && valid.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && valid.type !== 'application/msword'){
        return null
      }
      if (this.getFiles.length === 0){
        this.valid = true
      }
      if (this.description === ''){
        this.descriptionValid = 'Опишіть файл'
      }
      let charCode = (this.document.year.which) ? this.document.year.which : this.document.year.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        this.document.year.preventDefault();
      }else {
        return true;
      }
      if(this.title === ''){
        this.titleValid = 'Назвите файл'
      }
      return valid
    },

    pushDocument(ready = true){
      localStorage.setItem('archive_document',JSON.stringify(this.transformDocument))
      if (!ready){
        this.document.ready = 0
      }
      console.log(this.document);
      this.updateDocument(this.document)
    },

    addItem(item){
      if (this.comprehensive[item] === '' || this.comprehensive[item] === undefined){
        this.error[item] = 'Введіть значення'
      }
      else {
        if (this.error[item]){
          this.error[item] = ''
        }
        this.document[item].push(this.comprehensive[item])
        this.comprehensive[item] = ''
      }
    },
    deleteKeyword(idx){
      this.document.keywords.splice(idx, 1)
    },
    deleteItem(item,idx){
      this.document[item].splice(idx, 1)
    }

  },
  mounted(){
    this.requestCategories
    this.reviseDocument
  },
  components:{
    FilesFrame,
    Loader,
    DocumentTypes,
    AuthorFields
  }
}
</script>

<style>
.card{
  overflow: hidden;
  padding: 1rem 0;
}
.block{
  border: 1px solid;
  margin: 20px;
  width: auto;
  min-width: 200px;
  height: 250px;
}
.file-card{
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  background: #fff;
  border-radius: 5px;
  /*border: 1px solid burlywood;*/
  /*margin: 5px;*/
  /*width: 70%;*/
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 45%;
  /*margin-left: 2rem;*/
}
.card-top{
  font-size: 1em;
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
  display: inherit;
  flex-flow: column;
  width: 100%;
  /*border: 1px solid #bbb;*/
  margin: 3px;
}
.form-item label{
  margin: 3px;
  color: #313131;
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
  width: 90%;
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
  margin: 0 5%;
  padding: 5px;
  overflow:hidden;
  background: none;
  outline: none;
  color: #525252;
}
.new-author-btn::after{
  content:'';
  position:absolute;
  width:100%;
  height:0.05rem;
  left:0;
  bottom:0;
  background: #525252;
}
.new-author-btn::after{
  transform:scale(0.85,1);
  transition: transform 0.1s ease;
}
.new-author-btn:hover::after{
  transform:scale(1,1);
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
  padding: 0.5rem;
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

.add-keyword-btn{
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
.main-card svg:hover{
  stroke: #525252;
}

.inp-e{
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

.inp-e:focus,
.inp-e:hover{
  border: 1px solid #419FD9;
}
.required-area:valid{
  border: 1px solid #419FD9;
}

.inp-e:disabled:hover{
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
  /*text-transform: uppercase;*/
  margin: 3px;
  font-size: 1em;
}

@keyframes loader {

  0% {
    width: 0;
  }

  20% {
    width: 10%;
  }

  25% {
    width: 24%;
  }

  43% {
    width: 41%;
  }

  56% {
    width: 50%;
  }

  66% {
    width: 52%;
  }

  71% {
    width: 60%;
  }

  75% {
    width: 76%;

  }

  94% {
    width: 86%;
  }

  100% {
    width: 100%;
  }

}

.progress-bar {
  border-radius: 60px;
  overflow: hidden;
  width: 100%;

}

.progress-bar span{
  display: block;
}

.bar {
  background: rgba(0,0,0,0.075);
}

.progress {
  animation: loader 8s ease infinite;
  background: green;
  color: #fff;
  padding: 5px;
  width: 0;
}


/*.select-type {*/
/*  display: block;*/
/*  font-size: 16px;*/
/*  font-family: sans-serif;*/
/*  font-weight: 700;*/
/*  color: #444;*/
/*  line-height: 1.3;*/
/*  padding: .6em 1.2em .5em .7em; width: 100%;*/
/*  max-width: 90%;*/
/*  box-sizing: border-box;*/
/*  margin: 0;*/
/*  border: 1px solid #aaa;*/
/*  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);*/
/*  border-radius: .5em;*/
/*  -moz-appearance: none;*/
/*  -webkit-appearance: none;*/
/*  appearance: none;*/
/*  background-color: #fff;*/
/*  !*background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);*!*/
/*  !*background-repeat: no-repeat, repeat;*!*/
/*  !*background-position: right .7em top 50%, 0 0;*!*/
/*  !*background-size: .65em auto, 100%;*!*/
/*}*/
/*.select-type::-ms-expand { display: none; }*/
/*.select-type:hover { border-color: #888; }*/
/*.select-type:focus { border-color: #aaa;*/
/*    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);*/
/*    box-shadow: 0 0 0 3px -moz-mac-focusring;*/
/*    color: #222;*/
/*    outline: none;*/
/*}*/
/*.select-type option { font-weight:normal; }*/
/**[dir="rtl"] .select-type, :root:lang(ar) .select-type, :root:lang(iw) .select-type {*/
/*    background-position: left .7em top 50%, 0 0;*/
/*    padding: .6em .8em .5em 1.4em;*/
/*}*/

/*.file_control > div{*/
/*  position: relative;*/
/*}*/

/*/*input settings*/

/*.marker > span{*/
/*  padding-left: 20px;*/
/*  color: #b4b4b4;*/
/*}*/
/*.fill-area > label{*/
/*  position: relative;*/
/*  left: 0.2rem;*/
/*  top: -0.2rem;*/
/*}*/

/*.header_title{*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  margin: 0.5rem;*/
/*  !*margin-bottom: 3.5rem;*!*/
/*  color: #212121;*/
/*}*/


/*.none_file > span{*/
/*  color: red;*/
/*  position: absolute;*/
/*}*/
/*.valid{*/
/*  border: 1px dashed red;*/
/*}*/

/*.file_frame > span{*/
/*  position: relative;*/
/*  top: 1.5rem;*/
/*}*/
/*.fill-area{*/
/*  position: relative;*/
/*  margin: 1rem;*/
/*}*/
/*.fill-area small{*/
/*  margin: 5px;*/
/*  margin-left: 10px;*/
/*  color: #d40d0d;*/
/*}*/
/*textarea{*/
/*  overflow: hidden;*/
/*  min-height: 100px;*/
/*}*/
/*.files__tape > div{*/
/*  !*border-radius: 3px;*!*/
/*  !*border: 1px solid #0048BA;*!*/
/*  display: inline-block;*/
/*  text-align: center;*/
/*  text-decoration: none;*/
/*}*/
/*.document-areas{*/
/*  !*border: 1px solid black;*!*/
/*  display: grid;*/
/*  margin-left: 10px;*/
/*}*/
/*.item{*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  cursor: pointer;*/
/*  transition: all 0.1s;*/
/*  position: relative;*/
/*  text-align: center;*/
/*}*/
/*.active{*/
/*  border-bottom: 1px solid #0048BA;*/
/*  !*border-radius: 5px;*!*/
/*}*/

/*.disabled{*/
/*  border: 1px solid #999;*/
/*  color: #999;*/
/*  cursor: not-allowed;*/
/*}*/
/*.continue{*/
/*  right: 3rem;*/
/*}*/

/*.delete_item{*/
/*  right: 8rem;*/
/*}*/


/*.nav {*/
/*  width: 100%;*/
/*  height: 100px;*/
/*  padding-top: 40px;*/
/*  opacity: 1;*/
/*  transition: all .5s ease;*/
/*}*/

/*li {*/
/*  padding-left: 10px;*/
/*  font-size: 18px;*/
/*  display: inline;*/
/*  text-align: left;*/
/*  text-transform: uppercase;*/
/*  padding-right: 10px;*/
/*  color: #ffffff;*/
/*}*/
/*.remove_file{*/
/*  color: red;*/
/*  border: 1px solid red;*/
/*}*/
/*.signin-active a {*/
/*  padding-bottom: 10px;*/
/*  color: #ffffff;*/
/*  text-decoration: none;*/
/*  border-bottom: solid 2px #1059FF;*/
/*  transition: all .25s ease;*/
/*  cursor: pointer;*/
/*}*/

/*.signin-inactive a {*/
/*  padding-bottom: 0;*/
/*  color: rgba(255,255,255,.3);*/
/*  text-decoration: none;*/
/*  border-bottom: none;*/
/*  cursor: pointer;*/
/*}*/

/*.signup-active a {*/
/*  cursor: pointer;*/
/*  color: #ffffff;*/
/*  text-decoration: none;*/
/*  border-bottom: solid 2px #1059FF;*/
/*  padding-bottom: 10px;*/
/*}*/

/*.signup-inactive a {*/
/*  cursor: pointer;*/
/*  color: rgba(255,255,255,.3);*/
/*  text-decoration: none;*/
/*  transition: all .25s ease;*/
/*}*/

/*@media screen and (max-width: 800px){*/
/*  .wrapper{*/
/*    display: grid;*/
/*    grid-template-columns: 1fr;*/
/*    grid-template-rows: auto;*/
/*    border: 1px solid blueviolet;*/
/*  }*/
/*  .box_frame{*/
/*    display: none;*/
/*  }*/
/*  .add{*/
/*    display: none;*/
/*  }*/
/*}*/
</style>
