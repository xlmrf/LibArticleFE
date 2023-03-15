<template>
  <div class="document-types" >
    <div>
      <h3>Тип</h3>
      <div class="files-tape">
        <div v-for="(type,key) in getTypes" :key="key"
             :class="['file-name',{'category-active':getDocument.type_id-1 === key}]"
             @click="getDocument.type_id = type.id">{{ type.name }}
        </div>
      </div>
    </div>
    <div class="type-description">
      <h3>Поля для заповнення</h3>
      <ul class="item-category-collection" v-if="getDocument.type_id">
        <li class="manual-item" v-for="(item, key) in getTypes?.find(type => type.id === getDocument.type_id)['fields']" :key="key">
          {{ translateAreas(item) }}
        </li>
      </ul>
      <span class="item-category-collection mid-title" v-else>Оберіть категорію</span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  mixins: ['translate'],
  computed: {
    ...mapGetters(['getDocument', 'getTypes']),
    ...mapActions(['requestTypes'])
  },
  mounted() {
    // this.requestTypes
  }
}
</script>

<style scoped>
.manual-item{
  padding:10px 25px;
  text-decoration:none;
  background: none;
  /*   border:1px solid #999; */
  position:relative;
  border: none;
  outline: none;
  overflow:hidden;
  color: #212121
}
.manual-item::after{
  content:'';
  position:absolute;
  width:70%;
  height:0.1rem;
  left:0;
  bottom:3px;
  background: #bfbfbf;
}
.manual-item::after{
  transform:scale(0.9,0.5);
}
.type-document-modal{
  padding: 3rem;
  display: block;
  height: 100%;
  /*border: 1px solid red;*/
  min-height: 500px;
}
.document-types{
  border-radius: 4px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin:2.5rem auto 0 auto;
  height: 100%;
  min-height: 300px;
  /*box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;*/
}
.type-description{
  display: flex;
  flex-flow: column;
  width: 60%;
  margin-left: 20px;
}
h3{
  height: 21px;
  color: #24292F;
  font-size: 1.1em;
  margin: 1rem 0;
  /*color: #212121;*/
  font-weight: normal;
}
.item-category-collection{
  display: inherit;
  flex-flow: column wrap;
  align-content: flex-start;
  width: 100%;
  border-radius: 2px;
  height: 220px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
  position: relative;
  z-index: 9;
}
.item-category-collection li{
  /*border-bottom: 1px dashed #bbb;*/
  list-style: none;
  cursor: default;
  padding: 0.7rem;
  margin-left: 0.4rem;
  width: 50%;
  font-size: 1em;
  align-self: center;
}

.mid-title{
  justify-content: center;
  align-content: center;
  font-size: 1.3rem;
}

.files-tape{
  /*box-shadow: rgba(0, 0, 0, 0.35) 0px -8px 12px -8px inset;*/
  /*box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;*/
  border-radius: 6px;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin: 10px;
  font-size: 0.8em;
  height: 220px;
  width: 200px;
  overflow: auto;
  /*overflow-y: hidden;*/
  scrollbar-width: thin;
  z-index: 10;
}
.files-tape > div{
  /*border-radius: 3px;*/
  /*border: 1px solid #0048BA;*/
  font-size: 18px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
}
.file-name{
  border: 2px solid transparent;
  border-radius: 4px;
  border-image-slice: 1;
  padding: 7px;
  margin: 1px;
  cursor: pointer;
  width: 98%;
  align-self: center;
  height: auto;
  transition: .1s ease;
}
.file-name:hover{
  /*background-image: linear-gradient(to right, rgba(119, 161, 211, 0.7) 0%, rgba(119, 161, 211, 0.69) 51%, rgba(119, 161, 211, 0.7) 100%);*/
  background: #f1f1f1;
  /*color: #F1F1F1;*/
}
.category-active{
  background: #F1f1f1;
  /*border-image-source: linear-gradient(to left, rgba(56, 56, 73, 0.44), rgba(28, 15, 43, 0.44));*/
}
.type-document-modal h2{
  font-size: 28px;
  /*font-weight: normal;*/
  /*margin-bottom: 1rem;*/
  /*text-align: center;*/
  color: #212121;
  width: 100%;
}
.top{
  display: flex;
  flex-flow: column;
  /*flex-wrap: wrap;*/
  align-items: center;
  justify-content: center;
  position: relative;
}

.top > label{
  color: rgba(229, 50, 45, 0.8);
  /*margin: 5px;*/
  font-size: 14px;
  position: absolute;
}

.title-input{
  font-size: 21px;
  padding: 10px;
  outline: #212121;
  width: 600px;
  border: 1px solid #212121;
  border-radius: 4px;
  position: relative;
  /*margin: 15px 0;*/
  /*height: 1.7rem;*/
  color: #212121;
  box-sizing: border-box;
  transition: 0.3s ease all;
  -moz-transition: 0.3s ease all;
  -webkit-transition: 0.3s ease all;
}
.type-document-modal input:focus{
  border: 1px solid rgba(16, 89, 255, 0.9);
}

.document-type{
  cursor: pointer;
  border: 2px solid transparent;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  border-radius: 1px;
  min-width: 175px;
  /*width: auto;*/
}
.document-types h3{
  text-align: center;
  width: 100%;
  /*background-image: linear-gradient(to right, #e4e6e7 0%, #f1f2f3 51%, #e4e6e7 100%);*/
  /*color: #F1F1F1;*/
}

.document-type:hover{
  border: 2px solid rgba(145, 150, 163, 0.5);
}


.alert-input{
  border: 1px solid rgba(229, 50, 45, 0.74);
}

.choose-type{

  text-align: center;
  text-transform: uppercase;
  /*transition: 0.5s;*/
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  display: block;
  font-size: 16px;
  margin:2.5rem auto;
  align-self: end;
  padding: 1rem 5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s ease all;
  -moz-transition: 0.5s ease all;
  -webkit-transition: 0.5s ease all;
}
.choose-btn-able{
  background-image: linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%);
}
.disable-btn{
  background-image: linear-gradient(to right, rgba(129, 131, 132, 0.36) 0%, rgba(103, 116, 116, 0.33) 51%, rgba(129, 131, 132, 0.33) 100%);
  cursor: default;
}
.choose-btn-able:hover{
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

</style>