<template>
  <div class="avatar">
    <img :class="['user-avatar']" :src="getUser.info.image" alt="">
    <input class="photo-loader-input" type="file" id="files" @change="photoUpdate()" accept="image/jpeg,image/png"
           ref="image">
    <span @click="changePhoto()">change photo</span>
    <!--          https://i.photographers.ua/images/pictures/45416/dsc_4556_1.jpg-->
  </div>
</template>

<script>
import axios from "axios";

export default {

  methods:{
    photoUpdate() {
      let image = this.$refs.image.files;
      let form = new FormData();
      form.set('file', image[0]);
      console.log('file:', form);
      axios.post('http://192.168.0.102/api/upload-image', form).then(response => {
        this.newPhoto = response.data.nameFile;
        this.data.info.image = this.newPhoto;
      }, error => console.log('Server catch error', error));
    },
    changePhoto() {
      this.valid = false
      this.$refs.image.click()
    },
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

.avatar span {
  cursor: pointer;
  text-decoration: #212121 underline;
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

</style>