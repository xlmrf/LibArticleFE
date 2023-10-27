<template>
  <div class="avatar">
    <loader width="2" radius="21"  class="img-loader" v-if="imgLoader" />
    <img :class="['user-avatar']" :src="getTempPhoto.progress === 100 ? getTempPhoto.image : image" alt="" v-else>
    <input class="photo-loader-input" type="file" id="files" @change="photoUpdate()" accept="image/jpeg,image/png"
           ref="image">
    <span @click="changePhoto()" class="change-photo-btn">{{this.$store.getters.getLanguage.settings.account_titles.change_photo}}</span>
    <span class="photo-load-error" v-if="loadError" ><small v-if="loadError === 413">photo is too large</small><small v-else>error loading photo</small></span>
    <!--          https://i.photographers.ua/images/pictures/45416/dsc_4556_1.jpg-->
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters, mapState} from "vuex";
import Loader from "@/components/additional/loader";

export default {
  components: {Loader},
  data(){
    return{
      imgLoader: false,
      loadError:'',
      photo:''
    }
  },

  props:['image'],

  methods:{
    photoUpdate() {
      this.imgLoader = true
      let image = this.$refs.image.files;
      let form = new FormData();
      form.set('file', image[0]);
      console.log('file:', form);
      axios.post(this.server_url_v1+'/file?image', form, {
        onUploadProgress: progressEvent => {
          if (progressEvent.lengthComputable){
            this.getTempPhoto.progress = (progressEvent.loaded / progressEvent.total) * 100
          }
        }
      }).then(response => {
        this.getTempPhoto.image = response.data.url
        this.imgLoader = false
      }, error => {
        this.loadError = error.response.status
        this.imgLoader = false
        console.log('error in add files:', error.response);
      });
      // axios.post('http://192.168.0.102/api/upload-image', form).then(response => {
      //   this.newPhoto = response.data.nameFile;
      //   this.data.info.image = this.newPhoto;
      // }, error => console.log('Server catch error', error));
    },
    changePhoto() {
      this.loadError = ''
      this.valid = false
      this.$refs.image.click()
    },
  },
  computed:{
    ...mapState(['server_url_v1']),
    ...mapGetters(['getTempPhoto'])
  }

}
</script>

<style scoped>

.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  margin: 1rem;
}

.change-photo-btn{
  cursor: pointer;
  text-decoration: #212121 underline;
  font-family: "Consolas, sans-serif";
  letter-spacing: 1px;
}

.user-avatar {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  object-fit: cover;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.user-avatar:hover {
  /*color: rgba(33, 33, 33, 0.34);*/
  /*clip-path: ellipse(200px 200px at 0px 10px);*/
}

.photo-loader-input {
  position: absolute;
  display: none;
}

.img-loader{
  padding: 100px;
  position: relative;
  bottom: 10px;
}

.photo-load-error{
  text-decoration: none;
  color: #d43535;
  text-transform: uppercase;
  padding: 5px;
}

</style>