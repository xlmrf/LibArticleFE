<template>
  <div class="document-types" >
    <div class="select-type-left-side">
      <div class="select-types-area left-side-cell">
        <span>{{this.$store.getters.getLanguage.type_areas.signs.type}}</span>

        <div  class="type-selector">
          <p @click="showTypesList = !showTypesList">
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

      <div>

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
      showTypesList:false
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
  padding:10px 25px;
  text-decoration:none;
  background: none;
  /*   border:1px solid #999; */
  position:relative;
  border: none;
  outline: none;
  overflow:hidden;
  text-align: center;
  color: #212121
}
.manual-item::after{
  content:'';
  position:absolute;
  width:100%;
  height:0.1rem;
  left:0;
  bottom:3px;
  background: #B8EBFF;
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
  background: #fcfcfc;
  display: flex;
  flex-flow: column;
  width: 60%;
  margin-left: 20px;
}

h3:after{
  content:'';
  position:absolute;
  width:100%;
  height:1px;
  left:0;
  bottom:0;
  background: rgba(191, 191, 191, 0.46);
}

/*h3{*/
/*  background: #009FFF;*/
/*  position: relative;*/
/*  overflow:hidden;*/
/*  outline: none;*/
/*  padding: 10px 0;*/
/*  border-top-right-radius: 4px;*/
/*  border-top-left-radius: 4px;*/
/*  !*height: 21px;*!*/
/*  !*color: #24292F;*!*/
/*  color: white;*/
/*  font-size: 1.1em;*/
/*  !*margin: 1rem 0;*!*/
/*  !*color: #212121;*!*/
/*  font-weight: normal;*/
/*}*/
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
  padding: 0.7rem;
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
  /*background-image: linear-gradient(to right, #e4e6e7 0%, #f1f2f3 51%, #e4e6e7 100%);*/
  /*color: #F1F1F1;*/
}

.document-type:hover{
  border: 2px solid rgba(145, 150, 163, 0.5);
}


.alert-input{
  border: 1px solid rgba(229, 50, 45, 0.74);
}

.category-error{
  transition: ease 0.2s;
  color: #cd2d2d;
}

.select-types-area{
  min-width: 100px;
}

.type-selector{
  min-width: 150px;
}

.type-selector > p{
  border: 1px solid #bbb;
  padding: 8px 10px;
  border-radius: 3px;
  color: #333333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.files-tape{
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