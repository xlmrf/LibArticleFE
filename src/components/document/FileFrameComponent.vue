<template>
<!--  <div class="document-files-wrapper">-->
      <div class="files-roll-manager" >
        <div v-if="getFiles.length !== 0" >
          <div class="files-tape">
            <span :class="['item', key === file_id ? 'active' : 'inactive']" v-for="(file, key) in getFiles" @click="file_id = key">{{file.originalNameFile}}</span>
          </div>
        </div>
        <div class="box-frame" v-else>
          <iframe :src="getFiles[file_id].url" v-if="getFiles[file_id].typeFile === 'pdf'" frameborder="0">Не вийшло завантажити файл</iframe>
          <iframe :src="'https://view.officeapps.live.com/op/embed.aspx?src='+getFiles[file_id].url" v-else-if="getFiles[file_id].typeFile === 'doc'" frameborder="0">Не вийшло завантажити файл</iframe>
        </div>
        <div class="wrapper-ground" v-if="getFiles.length !== 0">
          <small>{{checkSize(getFiles[file_id].sizeFile)}}</small>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.document-increment-label{
  position: relative;
  display: flex;
  align-self: center;
  margin-left: -36px;
  color: rgba(33, 33, 33, 0.65);
  cursor: pointer;
}
.document-increment-label:hover{
  stroke: #222222;
}
body {
  background: #eef1f3;
}

/*input settings*/

.marker > span{
  padding-left: 20px;
  color: #b4b4b4;
}
.fill-area > label{
  position: relative;
  left: 0.2rem;
  top: -0.2rem;
}

.document-files-wrapper{
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
.wrapper-ground{
  display: flex;
  justify-content: center;
}
.wrapper-ground > div{
  border-bottom: 1px solid;
}
.wrapper-ground > span{
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
.wrapper-ground > span:hover{
  border-bottom:2px solid rgba(229, 50, 45, 0.8);
}
.wrapper-ground > small{
  color: #535353;
  position: absolute;
  margin: 0.2rem;
  left: 0;
  /*top: 5px;*/
}

.files-roll-manager h4{
  font-weight: normal;
  text-align: center;
  color: #525252;
  cursor: default;
  align-self: center;
}
.files-tape{
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
.files-tape .item{
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
.files-tape .item:hover{
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
.files-tape > span{
  font-size: 18px;
  align-items: center;
  padding: 0.5rem;
  text-decoration: none;
}

.files-roll-manager{
  border-bottom: 1px solid #BBBBBB;
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
.files-roll-manager > div{
  width: 100%;
  display: flex;
  /*padding: 0.5rem;*/
  justify-content: center;
}

.item{
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all 0.1s;
  position: relative;
  text-align: center;
  height: 100%;
}
.active{
  /*padding-bottom: 0.1rem;*/
  background: rgba(178, 178, 178, 0.25);
  /*  */
  /*  border-bottom: 1px solid #0048BA;*/
  /*  !*border-radius: 5px;*!*/
}

.continue > .btn{
  width: 100px;
}

.box-frame{
  height: 100%;
  position: relative;
}

.box-frame iframe{
  min-height: 700px;
  width: 100%;
  height: 100%;
  display: block;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;

}
</style>