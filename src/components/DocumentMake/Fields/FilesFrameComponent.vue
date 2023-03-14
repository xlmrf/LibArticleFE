<template>
  <div>


    <form class="card" @submit.prevent enctype="multipart/form-data">
      <!--    enctype="multipart/form-data"-->
      <input class="form-control select-input" type="file" id="files" @change="selectedFiles()"
             ref="files" multiple>
      <div class="document-files-wrapper">
        <div class="files-roll-manager">
          <div v-if="getFiles.length !== 0">
            <div class="files-tape">
              <span :class="['item', key === file_id ? 'active' : 'inactive']" v-for="(file, key) in getFiles"
                    @click="file_id = key">{{ file.originalNameFile }}</span>
            </div>
            <svg class="document-increment-label" @click="addFile()" xmlns="http://www.w3.org/2000/svg" width="28"
                 height="28" viewBox="0 0 24 24" fill="none" stroke="#B2B2B2" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <h4 v-else>Завантажте перший документ</h4>
        </div>
        <hr :style="'width:'+getProgressLoadingFile+'%'">
        <div :class="['file-update-area',{valid}]" @click="addFile()" v-if="getFiles.length === 0">завантажити файл
        </div>
        <div class="box-frame" v-else>
          <iframe :src='frameUrl(getFiles[file_id])+"#view=FitH"'></iframe>
          <!--          <iframe :src="getFiles[file_id].url" frameborder="0">Не вийшло завантажити файл</iframe>-->
          <!--        <iframe :src="'https://view.officeapps.live.com/op/embed.aspx?src='+getFiles[file_id].url" v-else-if="getFiles[file_id].typeFile === 'doc'" frameborder="0">Не вийшло завантажити файл</iframe>-->
        </div>
        <div class="wrapper-ground" v-if="getFiles.length !== 0">
          <small>{{ checkSize(getFiles[file_id].sizeFile) }}</small>
          <!--        <div :class="[{'loader-sprint':getProgress}]">{{getProgress}}</div>-->
          <span @click="removeItem">Видалити файл</span>
        </div>
      </div>
    </form>
    {{getFiles}}
  </div>
</template>

<script>
import loader from "../../additional/loader";
import {mapActions, mapGetters, mapMutations} from "vuex";
// import axios from "axios";

export default {
  data() {
    return {
      files: [],
      file_id: 0,
      valid: false,
      process: 0,
      loadError: null
    }
  },
  computed: {
    ...mapGetters(['getProgressLoadingFile', 'getFiles']),
    checkItem() {
      if (this.src[this.file_id] === undefined) {
        for (let i = 0; i < this.files.length; i++) {
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
    //   'files.length':{
    //         handler: key =>{
    //             if(key >= 5 ){
    //                 console.log('disabled')
    //                 // this.disabled = true
    //             }
    //             else {
    //                 // this.disabled = false
    //             }
    //         },
    //   }
  },
  methods: {
    ...mapActions(['pushFile']),
    ...mapMutations(['FilePusher', 'FileRemover', 'updateFiles']),
    checkSize(item, type) {
      if (item > 1000) {
        type = 'KB'
        item = item / 1024
        if (item > 1000) {
          type = 'MB'
          item = item / 1024
        }
        return parseFloat(item).toFixed(2) + " " + type
      } else {
        return item + " " + 'B'
      }
    },
    frameUrl(file) {
      if (file.typeFile === 'doc' || file.typeFile === 'docx')
        return 'https://view.officeapps.live.com/op/embed.aspx?src=' + file.url;
      else
        return file.url;
    },
    validate(valid) {
      // this.valid = valid
      let size = valid.size / 1024 / 1024
      console.log('valid -', valid.type);
      if (size > 512) {
        return null
      }
      // if (valid.type !== 'application/pdf' && valid.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && valid.type !== 'application/msword') {
      //   return null
      // }
      if (this.files.length === 0) {
        this.valid = true
      }
      return valid
    },
    next() {
      console.log("validator", this.files.length);
      this.uploadDocument(this.document)
    },
    addFile() {
      this.valid = false
      this.$refs.files.click()
    },
    removeItem() {
      this.files.splice(this.file_id, 1)
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
  mounted() {
    let document = JSON.parse(localStorage.getItem('not_finished_document'))
    if (document) {
      if (document.files) {
        for (let file in document.files) {
          // this.localFiles[file] = document.files[file]
          this.files.push(document.files[file])
        }
        console.log('files', this.files);
        console.log('getFiles', this.getFiles)
        this.updateFiles(this.files)

      }
    }
  },
  components: {loader}
}
</script>

<style scoped>
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

.bar {
  background: rgba(0, 0, 0, 0.075);
}

.progress {
  animation: loader 0.1s ease infinite;
  /*// Change the animation fill mode 'infinite' to 'forwards' to stop the animation from repeating.*/
  background: #75b800;
  color: #fff;
  padding: 5px;
  width: 20%;
}

/*.progress-bar {*/
/*  left: 50%;*/
/*  max-width: 50%;*/
/*  position: absolute;*/
/*  top: 50%;*/
/*  transform: translate3d(-50%,-50%,0);*/
/*}*/


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

/*.rotate-shadows:before {*/
/*  box-shadow: inset 0 20px 0 rgba(6, 159, 219, 0.6), inset 20px 0 0 rgba(16, 111, 111, 0.6), inset 0 -20px 0 rgba(48, 115, 137, 0.6), inset -20px 0 0 rgba(49, 120, 137, 0.6);*/
/*  animation: rotate-before 2s -0.5s linear infinite;*/
/*}*/
.rotate-shadows:after {
  box-shadow: inset 0 10px 0 rgba(175, 0, 250, 0.6), inset 10px 0 0 rgba(196, 0, 250, 0.6), inset 0 -10px 0 rgba(225, 0, 250, 0.6), inset -10px 0 0 rgba(183, 0, 250, 0.6);
  animation: rotate-after 3s -0.1s linear infinite;
}

@keyframes rotate-after {
  0% {
    transform: rotateZ(0deg) scaleX(1) scaleY(1);
  }
  25% {
    transform: rotateZ(90deg) scaleX(0.96) scaleY(0.97);
    box-shadow: inset 0 10px 0 rgba(137, 11, 213, 0.3), inset 10px 0 0 rgba(250, 0, 0, 0.6), inset 0 -10px 0 rgba(113, 205, 213, 0.6), inset -10px 0 0 rgba(38, 90, 245, 0.6);
  }
  50% {
    transform: rotateZ(180deg) scaleX(0.92) scaleY(0.95);
    box-shadow: inset 0 10px 0 rgba(196, 0, 0, 0.3), inset 10px 0 0 rgba(233, 0, 250, 0.6), inset 0 -10px 0 rgba(12, 105, 217, 0.6), inset -10px 0 0 rgba(7, 209, 219, 0.6);
  }
  75% {
    transform: rotateZ(270deg) scaleX(0.96) scaleY(0.98);
    box-shadow: inset 0 10px 0 rgba(63, 229, 51, 0.3), inset 10px 0 0 rgba(0, 63, 250, 0.6), inset 0 -10px 0 rgba(217, 166, 12, 0.6), inset -10px 0 0 rgba(198, 7, 219, 0.6);
  }
  100% {
    transform: rotateZ(360deg) scaleX(1) scaleY(1);
  }
}

@keyframes rotate-before {
  0% {
    transform: rotateZ(0deg) scaleX(1) scaleY(1);
  }
  50% {
    transform: rotateZ(-180deg) scaleX(0.95) scaleY(0.95);
  }
  100% {
    transform: rotateZ(-360deg) scaleX(1) scaleY(1);
  }
}


.select-input {
  display: none;
}

.form-control:disabled, .form-control[readonly] {
  /*background-color: #e9ecef;*/
  opacity: 0;
  display: none;
}

.type-loader {
  display: none;
  /*display: flex;*/
  position: relative;
  /*padding: 50px;*/
  /*  top: 50%;*/
  /*  right: 20%;*/
  /*justify-content: center;*/
}

.main-card {
  display: block;
  height: 100%;
  /*border: 1px solid black;*/
}

.card {

}

.wrapper {
  display: grid;
  margin-top: 1rem;
  grid-template-columns: 3fr 4fr;
  /*border: 1px solid blueviolet;*/
}

/*.file-areas{*/
/*    display: grid;*/
/*    grid-template-rows: repeat(4,1fr);*/
/*    grid-gap: 25px;*/

/*}*/

.file_control {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
}

.file_control > div {
  position: relative;
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

  /*width: 60%;*/
  display: inherit;
  align-self: center;
  justify-content: center;
  padding: 15% 20%;
  margin: 3rem 0;
  /*height: 50%;*/
  text-align: center;
  font-size: 24px;
  text-decoration: underline;
  cursor: pointer;
  border: 1px dashed #BBB;
  border-radius: 10px;
  position: relative;
  /*left: 20%;*/
  /*top: 10%;*/
}

.file-update-area svg {
  position: absolute;
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
  min-height: 700px;
  width: 100%;
  height: 100%;
  display: block;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  margin-bottom: 30px;

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
