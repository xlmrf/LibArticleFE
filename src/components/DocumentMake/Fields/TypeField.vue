<template>
  <div class="document-types" >
    <div class="select-type-left-side">
      <div class="select-types-area left-side-cell">
        <span>{{this.$store.getters.getLanguage.type_areas.signs.type}}</span>

        <div  class="type-selector">
          <p @click="showTypesList = !showTypesList" class="type-selector-frame selector-frame" :class="{'active-type-selector': showTypesList}">
            <span v-if="!getMakeDocument.type_id">Choose type</span>
            <span v-else>{{$store.getters.getLanguage.types[getTypes[getMakeDocument.type_id-1]?.name]}}</span>
            <svg v-if="!showTypesList" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#363636" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f5361" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
          </p>
          <div class="files-tape">
            <div v-if="showTypesList" v-for="(type,key) in getTypes" :key="key"
                 :class="['file-name' ,{'category-active':getMakeDocument.type_id-1 === key}]"
                 @click="selectType(type)">{{ $store.getters.getLanguage.types[type.name] }}
            </div>
          </div>
        </div>
      </div>

      <div class="left-side-cell">
        <span>Приватність</span>
        <div class="private-selector">
          <p class="selector-frame" @click="isPublic = true" :class="{'active-type-privat': isPublic}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>Public</span>
          </p>
          <p class="selector-frame" @click="isPublic = false" :class="{'active-type-privat': !isPublic}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <span>Private</span>
          </p>
        </div>
      </div>

    </div>


    <div class="type-description">
      <h3>{{this.$store.getters.getLanguage.type_areas.signs.fill_areas}}</h3>
      <ul class="item-category-collection" v-if="getMakeDocument.type_id">
        <li class="manual-item" v-for="(item, key) in getTypes?.find(type => type.id === getMakeDocument.type_id)['fields']" :key="key">
          {{ this.$store.getters.getLanguage.type_areas.areas[item] }}
        </li>
      </ul>
      <span class="item-category-collection mid-title" :class="{'category-error':error}" v-else>{{this.$store.getters.getLanguage.type_areas.signs.category_tip}}</span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  mixins: ['translate'],
  props:['error'],

  data(){
    return{
      showTypesList:false,
      isPublic: true
    }
  },

  methods:{
    selectType(item){
      this.getMakeDocument.type_id = item.id
      console.log('dd',this.showTypesList);
      this.showTypesList = false
      console.log('ddaa',this.showTypesList);
    }
  },

  computed: {
    ...mapGetters(['getMakeDocument', 'getTypes']),
    // ...mapActions(['requestTypes'])
  },
  mounted() {
    // this.requestTypes
  }
}
</script>

<style scoped>
.manual-item{
  /*padding:10px 25px;*/
  margin-left: 20px;
  text-decoration:none;
  background: none;
  /*   border:1px solid #999; */
  position:relative;
  border: none;
  outline: none;
  overflow:hidden;
  /*text-align: center;*/
  color: #212121
}
.manual-item::after{
  content:'';
  position:absolute;
  width:9px;
  height:7px;
  border-radius: 999px;
  left: 0;
  bottom:calc(50% - 4px);
  background: #222222;
}
.manual-item::after{
  transform:scale(0.8,1);
  border-radius: 22px;
}
.type-document-modal{
  padding: 3rem;
  display: block;
  height: 100%;
  /*border: 1px solid red;*/
  min-height: 500px;
}
.document-types{
  color: #333333;
  border-radius: 4px;
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin:2.5rem auto 0 auto;
  height: 100%;
  min-height: 200px;
  /*box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;*/
}
.type-description{
  /*box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;*/
  border: 1px solid #D4DEE1;
  color: #333333;
  border-radius: 9px;
  background: #fcfcfc;
  display: flex;
  flex-flow: column;
  width: 60%;
  margin-left: 20px;
}

.select-type-left-side > div{
  margin-bottom: 20px;
}


.item-category-collection{
  display: inherit;
  flex-flow: column wrap;
  align-content: flex-start;
  width: 100%;
  border-radius: 2px;
  height: 220px;
  /*background: #f5f5f5;*/
  /*box-shadow: rgba(0, box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;*/
  position: relative;
  padding: 0 10px;
  z-index: 9;
}
.item-category-collection li{
  /*border-bottom: 1px dashed #bbb;*/
  list-style: none;
  cursor: default;
  padding: 0.8rem;
  width: 50%;
  font-size: 1em;
  align-self: center;
}

.mid-title{
  justify-content: center;
  align-content: center;
  font-size: 1.3rem;
}

.file-name{
  border: 2px solid transparent;
  background: #ffffff;
  border-radius: 4px;
  border-image-slice: 1;
  padding: 7px;
  margin: 1px;
  cursor: pointer;
  width: 99%;
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
  background: #e2e2e2;
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
  padding: 12px;
  /*background-image: linear-gradient(to right, #e4e6e7 0%, #f1f2f3 51%, #e4e6e7 100%);*/
  /*color: #F1F1F1;*/

}

.left-side-cell{
  display: flex;
  flex-flow: column;
  min-width: 170px;
}



.left-side-cell > span{
  padding-bottom: 10px;
  font-weight: bold;
}

.category-error{
  transition: ease 0.2s;
  color: #cd2d2d;
}


.private-selector > p{
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.private-selector > p > span{
  font-size: 1.1rem;
  /*position: absolute;*/
  margin-left: 10px;
}

.type-selector{

}

.type-selector-frame{
  justify-content: space-between;
}

.selector-frame{
  padding: 8px 10px;
  border: 1px solid #bbb;
  border-radius: 3px;
  color: #333333;
  cursor: pointer;
  display: flex;
}

.active-type-selector{
  border: 1px solid #1f5361;
  box-shadow: rgba(31, 83, 97, 0.1) 0px 4px 6px -1px, rgba(31, 83, 97, 0.06) 0px 2px 4px -1px;
}

.active-type-privat{
  border: 1px solid #0969DA;
  box-shadow: rgba(9, 105, 218, 0.04) 0px 3px 5px;
  color: #0969DA;
}
.active-type-privat > svg{
  stroke: #0969DA;
}

.files-tape{
  position: absolute;
  background: #ffffff;
  min-width: 170px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  overflow: auto;
  height: auto;
  max-height: 150px;
  scrollbar-width: thin;
  z-index: 10;
}
.files-tape > div{
  display: inline-block;
  text-decoration: none;
}

</style>