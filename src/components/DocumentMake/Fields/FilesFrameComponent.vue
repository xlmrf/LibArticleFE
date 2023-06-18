<template>
  <div>
    <form class="card" @submit.prevent enctype="multipart/form-data">
      <input
          name="file"
          class="form-control select-input" type="file" id="files" @change="selectedFiles()"
          ref="files" :multiple="getFiles.main.url" :accept="typeOfFile"
      />
      <!--    enctype="multipart/form-data"-->
<!--      <input class="form-control select-input" type="file" id="files" @change="selectedFiles()"-->
<!--             ref="files" :multiple="getFiles.main.url">-->
      <div class="document-files-wrapper">



<!--        <div class="files-roll-manager">-->
<!--          <div v-if="getFiles.length !== 0">-->
<!--            <div class="files-tape">-->
<!--              <span :class="['item', key === file_id ? 'active' : 'inactive']" v-for="(file, key) in getFiles"-->
<!--                    @click="file_id = key">{{ file.originalNameFile }}</span>-->
<!--            </div>-->
<!--            <svg class="document-increment-label" @click="addFile()" xmlns="http://www.w3.org/2000/svg" width="28"-->
<!--                 height="28" viewBox="0 0 24 24" fill="none" stroke="#B2B2B2" stroke-width="2" stroke-linecap="round"-->
<!--                 stroke-linejoin="round">-->
<!--              <line x1="12" y1="5" x2="12" y2="19"></line>-->
<!--              <line x1="5" y1="12" x2="19" y2="12"></line>-->
<!--            </svg>-->
<!--          </div>-->
<!--          <h4 v-else>Завантажте перший документ</h4>-->
<!--        </div>-->



        <span v-if="loadError">{{loadError}}</span>
        <div v-if="!getFiles.main.url"
            class="dropzone-container"
            :class="{'dropzone-active':isDragging, 'dropzone-error':file_type_error}"
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="drop">

          <label for="files" class="file-label" @dragover="dragover">
            <div class="text-predict" v-if="isDragging" >Опускайте файл</div>
            <div class="text-error" v-else-if="file_type_error" >Тип документу не коректний</div>
            <div class="file-loader" v-else-if="this.getProgressLoadingFile !== 0 && this.getProgressLoadingFile !== 100" ><loader width="3" radius="12" /></div>
            <div v-else @click="addFile()">Щоб завантажити файл, перетягніть файл в поле або <u>натисніть сюди</u>.</div>
          </label>
        </div>
        <div class="box-frame" v-else>
<!--          <iframe :src='frameUrl(getFiles[file_id])+"#view=FitH"'></iframe>-->
          <iframe :src="getFiles.main.url" frameborder="0">Не вийшло завантажити файл</iframe>

<!--          <iframe :src="'https://view.officeapps.live.com/op/embed.aspx?src='+getFiles[file_id].url" v-else-if="getFiles[file_id].typeFile === 'doc'" frameborder="0">Не вийшло завантажити файл</iframe>-->

        </div>
        <hr class="top-load-line" :style="'width:'+getProgressLoadingFile+'%'">

      </div>
    </form>
    <div class="files-control-panel" v-if="getFiles.main.url">
<!--      <label class="label-file-category">Головний файл</label>-->
      <div class="inside-file-item main-item-file" v-if="getFiles.main.url">
        <span class="file-name">
          {{ getFiles.main.originalNameFile }}.{{ getFiles.main.typeFile }}
        </span>
        <span class="label-file-size">{{ checkSize(getFiles.main.sizeFile)}}</span>
        <span class="remove-item-file" @click="RemoveFile()">Видалити</span>
      </div>
<!--      <label class="label-file-category">Додаткові файли</label>-->
      <div class="inside-file-item" v-if="getFiles.add[0]" v-for="(file,idx) in getFiles.add">
        <span class="file-name">
          {{ file.originalNameFile }}.{{ file.typeFile }}
        </span>
        <span class="label-file-size">{{ checkSize(file.sizeFile)}}</span>
        <span class="remove-item-file" @click="RemoveFile(idx)">Видалити</span>
      </div>
      <div class="no-files" v-else>Додаткових файлів немає <p @click="addFile()" class="add-extra-files">Добавити</p></div>
<!--      <div v-for="file in getFiles.add">{{ file }}</div>-->
    </div>

  </div>
</template>

<script>
import loader from "../../additional/loader";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import axios from "axios";
// import axios from "axios";

export default {

  props:['isReady'],

  data() {
    return {
      isDragging:false,
      file_id: 0,
      valid: false,
      process: 0,
      loadError: null,
      file_type_error: null,
      getProgressLoadingFile: 0
    }
  },
  computed: {
    ...mapState(['access_file_types']),
    ...mapGetters(['getFiles']),

    typeOfFile(){
      if (!this.getFiles.main.url) {
        return 'application/pdf'
      }
      else{
        return "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf"

      }
    },

    checkItem() {
      if (this.src[this.file_id] === undefined) {
        for (let i = 0; i < this.getFiles.length; i++) {
          if (this.src[i] !== undefined) {
            return this.src[i]
          }
        }
        return 'none'
      } else {
        return this.src[this.file_id]
      }
    },
  },
  watch: {
    getProcess() {
      console.log(this.getProcess);
    },
  },
  methods: {
    ...mapMutations(['FilePusher', 'updateFiles']),


    //При дропі документа файл добавляється в стор, потім відправляється на бек,
    // для того щоб контролювати файл який закинули і при помилці маніпулювати інформацією

    // onChange() {
      // this.files = [...this.$refs.file.files];
      // this.selectedFiles()
      // console.log('onChange',this.files)
    // },

    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.files.files = e.dataTransfer.files;
      this.selectedFiles()
      console.log('file transfer',this.$refs)
      // let uploadedFiles = this.$refs.files.files;
      // let formData = new FormData();
      // let length = 0
      // uploadedFiles.length > 5 ? length = 5 : length = uploadedFiles.length
      // for (var i = 0; i < length; i++) {
      //   let file = this.validate(uploadedFiles[i]);
      //   formData.set('file', file);
      //   if (file !== null) {
      //     this.pushFile(formData)
      //   }
      // }
      // this.pushFile(e.dataTransfer.files[0])
      this.isDragging = false;
    },

    checkSize(item) {
      let type = ''
      if (item > 1000) {
        type = 'K'
        item = item / 1024
        if (item > 1000) {
          type = 'M'
          item = item / 1024
        }
        return parseFloat(item).toFixed(2) + " " + type + "B"
      } else {
        return item + " " + 'B'
      }
    },

    pushFile(data){
      console.log('push file',data)
      axios.post('https://s1.libarticle.polidar.in.ua/api/v1/file', data, {
        onUploadProgress: progressEvent => {
          if (progressEvent.lengthComputable){
            console.log('loader',this.getProgressLoadingFile)
            this.getProgressLoadingFile = (progressEvent.loaded / progressEvent.total) * 100
          }
        }
      }).then(response => {
        if (Object.keys(this.getFiles.main).length === 0){
          this.getFiles.main = response.data
        }
        else {
          this.getFiles.add.push(response.data)
        }
      }, error => {
        this.loadError = error
        console.log('error in add files:', error);
      });
    },


    RemoveFile(idx = -2){
      if (idx === -2){
        this.getFiles.main = {}
      }
      else {
         this.getFiles.add.splice(idx,1)
      }
    },

    validate(file) {
      // this.valid = valid
      let size = file.size / 1024 / 1024
      console.log('file types:', )
      console.log('valid -', file);
      this.file_type_error = false
      if (size > 512) {
        return null
      }
      if(!Object.values(this.access_file_types).includes(file.type))
      {
        this.file_type_error = true
        return null
      }
      // if (valid.type !== 'application/pdf' && valid.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && valid.type !== 'application/msword') {
      //   return null
      // }
      if (this.getFiles.length === 0) {
        this.valid = true
      }
      return file
    },


    addFile() {
      this.valid = false
      this.$refs.files.click()
    },


    removeItem() {
      this.getFiles.splice(this.file_id, 1)
      // this.src.splice(this.file_id, 1)
      // this.FileRemover(this.file_id)
      this.file_id = this.files.length - 1
      if (this.files.length === 0) {
        this.file_id = 0
      }
    },


    selectedFiles() {
      let uploadedFiles = this.$refs.files.files;
      let formData = new FormData();
      let length = 0
      uploadedFiles.length > 5 ? length = 5 : length = uploadedFiles.length
      for (var i = 0; i < length; i++) {
        let file = this.validate(uploadedFiles[i]);
        formData.set('file', file);
        if (file !== null) {
          this.pushFile(formData)
        }
      }
    }
  },
  components: {loader}
}
</script>

<style scoped>
.files-control-panel{
  /*max-width: 592px;*/
  position: relative;
  margin: 10px 0;
}

.files-control-panel > div{
  background: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.inside-file-item{
  cursor: pointer;
  display: flex;
  padding: 10px 5px;
  border-radius: 3px;
}

.inside-file-item > span{
  align-self: center;
}

.main-item-file{
  margin-bottom: 20px;
}

.label-file-size{
  margin-left: auto;
  padding: 0 10px;
}

.remove-item-file{
  color: #d2443b;
  margin: 0 10px;
}

.label-file-category{
  position: relative;
  top: -5px;
  margin: 5px;
}

.remove-item-file:hover{
  text-decoration: underline;
}

.remove-file{
  padding: 6px;
  position: absolute;
  right: -40px;
  height: 40px;
  width: 40px;
  z-index: 99;
}
.remove-file:hover{
  /*background: rgba(239, 149, 149, 0.8);*/
}

.file-name{
  max-width: 65%;
  overflow-wrap: anywhere;
  color: #1C75DD;
}

.no-files{
  text-align: center;
  padding: 20px 0;
}

.inside-file-item:hover{
  background: #f1f1f1;
}

.dropzone-container {
  display: flex;
  width: 592px;
  height: 400px;
  padding:10px;
  border-radius: 4px;
  background: white;
  border: 1px solid #e2e8f0;

}

.dropzone-error{
  box-shadow: rgba(214, 11, 3, 0.3) 0px 0px 0px 3px;
}

.dropzone-active{
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
}




.file-label {
  text-align: center;
  font-size: 20px;
  display: block;
  width: 100%;
  align-self: center;
  cursor: pointer;
}

.preview-container {
  display: flex;
  margin-top: 2rem;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}
.document-increment-label {
  position: relative;
  display: flex;
  align-self: center;
  margin-left: -36px;
  color: rgba(33, 33, 33, 0.65);
  cursor: pointer;
}

.document-increment-label:hover {
  stroke: #222222;
}

body {
  background: #eef1f3;
}

.progress-bar {
  border-radius: 60px;
  overflow: hidden;
  width: 100%;
}

.progress-bar span {
  display: block;
}

.dragover{
  border: 1px solid #0969DA;
}

.file-loader{
  position: relative;
  top: -50px;
  right: 40px;
}

.rotate-shadows {
  width: 120px;
  height: 2rem;
  /*height: 120px;*/
  position: relative;
  border: 1px solid cornflowerblue;
}

.rotate-shadows:after,
.rotate-shadows:before {
  content: "";
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: center center;
}

.select-input {
  display: none;
}

.form-control:disabled, .form-control[readonly] {
  /*background-color: #e9ecef;*/
  opacity: 0;
  display: none;
}

/*input settings*/

.marker > span {
  padding-left: 20px;
  color: #b4b4b4;
}

.fill-area > label {
  position: relative;
  left: 0.2rem;
  top: -0.2rem;
}

.document-files-wrapper {
  position: relative;
  display: flex;
  padding: 0.2rem;
  height: 100%;
  width: 100%;

  flex-direction: column;
  /*justify-content: center;*/
  /*align-items: center;*/
  /*border: 3px solid palevioletred;*/

}

.wrapper-ground {
  display: flex;
  justify-content: center;
}

.wrapper-ground > div {
  border-bottom: 1px solid;
}

.wrapper-ground > span {
  margin-top: auto;
  align-self: center;
  cursor: pointer;
  position: relative;
  height: 40px;
  /*top: 30px;*/
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: center;
  color: rgba(229, 50, 45, 0.8);
  border-bottom: 2px solid transparent;
}

.wrapper-ground > span:hover {
  border-bottom: 2px solid rgba(229, 50, 45, 0.8);
}

.wrapper-ground > small {
  color: #535353;
  position: absolute;
  margin: 0.2rem;
  left: 0;
  /*top: 5px;*/
}

.files-roll-manager h4 {
  font-weight: normal;
  text-align: center;
  color: #525252;
  cursor: default;
  align-self: center;
}

.files-tape {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
  border-radius: 4px;
  font-size: 0.8em;
  width: 90%;
  overflow: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  /*padding: 0.3rem;*/
  display: flex;
  height: 100%;
}

.files-tape .item {
  align-self: center;
  flex-shrink: 0;
}

.files-tape .item:after {
  content: "";
  background-color: rgba(187, 187, 187, 0.75);
  position: absolute;
  width: 2px;
  height: 60%;
  top: 20%;
  left: 99.7%;
  display: block;
  border-radius: 20%;
}

.files-tape .item:hover {
  background: #bbbbbb;
}

.files-tape .item:last-child:after {
  content: "";
  background-color: transparent;
  /*position: absolute;*/
  /*width: 2px;*/
  /*height: 20px;*/
  /*top: 30%;*/
  /*left: 99.5%;*/
  /*display: block;*/
  /*border-radius: 20%;*/
}

.files-tape > span {
  font-size: 18px;
  align-items: center;
  padding: 0.5rem;
  text-decoration: none;
}

.document-increment-label {
  position: relative;
  display: flex;
  align-self: center;
  margin-left: 10px;
  color: rgba(33, 33, 33, 0.65);
  cursor: pointer;
}

.files-roll-manager {
  /*border-bottom: 1px solid #BBBBBB;*/
  border-radius: 3px;
  width: 100%;
  padding: 0.3rem;
  height: 70px;
  overflow: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  display: flex;
  justify-content: center;
}

.files-roll-manager > div {
  width: 100%;
  display: flex;
  /*padding: 0.5rem;*/
  justify-content: center;
}

.file-update-area {

  display: inherit;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  /*margin-top: 1rem;*/
  /*margin-left: auto;*/
  /*margin-right: auto;*/
  /*width: 40%;*/
  height: 400px;
  /*margin: 3rem 0;*/

  font-size: 16px;
  /*text-decoration: underline #00c7c5;*/
  cursor: pointer;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  position: relative;
  /*left: 20%;*/
  /*top: 10%;*/
}

.file-update-area > span{
  margin-top: 30px;
  color: #535353;
}


.valid {
  border: 1px dashed red;

}

.item {
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all 0.1s;
  position: relative;
  text-align: center;
  height: 100%;
}

.active {
  /*padding-bottom: 0.1rem;*/
  background: rgba(178, 178, 178, 0.25);
  /*  */
  /*  border-bottom: 1px solid #0048BA;*/
  /*  !*border-radius: 5px;*!*/
}

/*.active::after{*/
/*  content:'';*/
/*  position:absolute;*/
/*  width:90%;*/
/*  text-align: center;*/
/*  height:0.05rem;*/
/*  !*left:20%;*!*/
/*  bottom:0;*/
/*  background: #B2B2B2;*/
/*}*/
.active::after {
  transform: scale(0.8, 1);
  /*transition: transform 0.22s ease;*/
}

.btn {
  border: 1px solid #212121;
  background: none;
  color: #212121;
  border-radius: 10px;
}

.disabled {
  border: 1px solid #999;
  color: #999;
  cursor: not-allowed;
}

.continue {
  right: 3rem;
}

.delete_item {
  right: 8rem;
}

.continue > .btn {
  width: 100px;
}

.box-frame {
  height: 100%;
  position: relative;
}

.box-frame iframe {
  min-height: 500px;
  width: 100%;
  height: 100%;
  display: block;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  margin-bottom: 30px;

}

.top-load-line{
  max-width: 592px;
}

.nav {
  width: 100%;
  height: 100px;
  padding-top: 40px;
  opacity: 1;
  transition: all .5s ease;
}

li {
  padding-left: 10px;
  font-size: 18px;
  display: inline;
  text-align: left;
  text-transform: uppercase;
  padding-right: 10px;
  color: #ffffff;
}

.remove_file {
  color: red;
  border: 1px solid red;
}

.signin-active a {
  padding-bottom: 10px;
  color: #ffffff;
  text-decoration: none;
  border-bottom: solid 2px #1059FF;
  transition: all .25s ease;
  cursor: pointer;
}

.signin-inactive a {
  padding-bottom: 0;
  color: rgba(255, 255, 255, .3);
  text-decoration: none;
  border-bottom: none;
  cursor: pointer;
}

.signup-active a {
  cursor: pointer;
  color: #ffffff;
  text-decoration: none;
  border-bottom: solid 2px #1059FF;
  padding-bottom: 10px;
}

.signup-inactive a {
  cursor: pointer;
  color: rgba(255, 255, 255, .3);
  text-decoration: none;
  transition: all .25s ease;
}

.text-predict{
  color: rgba(16, 89, 255, 0.82);
}

.add-extra-files{
  cursor: pointer;
}

.add-extra-files:hover{
  text-decoration: underline;
}

@media screen and (max-width: 800px) {
  .wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    border: 1px solid blueviolet;
  }

  .box_frame {
    display: none;
  }

  .adder {
    display: none;
  }
}
</style>
