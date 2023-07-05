<template>
  <div class="settings-main-card">
    <side-action-bar></side-action-bar>
    <div class="settings-main-window">
<!--      <div class="loader settings-loader" v-if="!getProfile?.id" >-->
<!--        <loader width="2" radius="13"/>-->
<!--      </div>-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Loader from "@/components/additional/loader";
import SideActionBar from "@/components/actions/SideActionBar";

export default {
  components: {SideActionBar, Loader},
  data() {
    return {
      isDragging: false,
      files: [],
    };
  },
  methods: {
    onChange() {
      this.files = [...this.$refs.file.files];
      console.log('onChange',this.files)
    },
    dragover(e) {
      e.preventDefault();
      console.log('dragOver')
      this.isDragging = true;
    },
    dragleave() {
      console.log('dragLeave')
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      console.log('drop')
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-grow: 1;
  align-items: center;
  height: 100vh;
  justify-content: center;
  text-align: center;
}

.dropzone-container {
  display: flex;
  width: 592px;
  height: 400px;
  padding:10px;
  border-radius: 4px;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
}

.dropzone-active{
  border: 2px solid #1C75DD;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
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

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}

.preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>