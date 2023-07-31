<template v-cloak>
  <div class="window">
    <div class="city">
      <router-view />
    </div>
    <supplement class="subway"></supplement>
  </div>
  <!--  <loader v-else class="page-loader" width="3" radius="15"></loader>-->
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import Supplement from "./components/footer/FooterComponent"

export default {
  name: 'App',
  components: {Supplement},
  beforeMount() {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'ua')
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  border: 0;
  /*font-family: 'Manrope Var','Manrope','Inter Var','Inter',Arial,sans-serif;*/
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Apple Color Emoji", "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

[v-cloak] {
  display: none;
}

.window {
  height: 100vh;
  display: flex;
  flex-direction: column;
}


body {
  display: flex;
  flex-direction: column;
  margin: 0;
}

.subway {
  margin-top: 75px;
  min-height: 42px;
  display: block;
}

.city {
  flex: 1;
/*  !*min-height: 450px;*!*/
}

input {
  border: 1px solid #bbb;
}

.w-70{
  width: 70%;
}

.w-40{
  width: 40%;
}

.item-underline{
  position: relative;
  overflow:hidden;
  outline: none;
}

.item-underline:after{
  content:'';
  position:absolute;
  width:100%;
  height:1px;
  left:0;
  bottom:3px;
  background: #bfbfbfb0;
}

.item-underline:last-child:after{
  content:'';
  position:absolute;
  width:100%;
  height:1px;
  left:0;
  bottom:3px;
  background: transparent;
}

.document-list-item{
  background: rgba(232, 232, 232, 0.4);
  margin: 15px 0;
}

.user-avatar-cycle{
  object-fit: cover;
  border-radius: 50%;
}


/*others*/


.middle-spinner {
  justify-content: center;
  /*background: rgba(222, 222, 222, 0.38);*/
  border-radius: 5px;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 -50% 0 0;
  transform: translate(-50%, -50%);
  /*width: 100%;*/
  /*height: 100%;*/
  z-index: 999;
}

.middle-spinner > span {
  display: flex;
  margin: 24px;
}

.main-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  /*border: 1px solid fuchsia;*/
}

.save-session > input {
  opacity: 0;
  position: absolute;
  z-index: -1;

}

.save-session > span {
  display: inline-flex;
  align-items: center;
  user-select: none;
  font-size: 16px;
}

.save-session > span::before {
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

.save-session > input:not(:disabled):not(:checked) + span:hover::before {
  border-color: #4E5477;
}

.save-session > input:checked + span::before {
  border-color: #318CE7;
  background-color: #318CE7;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.select{
  /*border: 1px solid #1C75DD;*/
  text-align: center;
  cursor: pointer;
  position: relative;
  background: none;
}
.select > option{
  color: #333333;
}

.setting-block {
  display: inherit;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  outline: none;
  padding: 20px;
  width: 100%;
}

.setting-block > .fields_fill{
  margin: 6px 0;
  width: 300px;
}

.setting-block > .fields_fill > input{
  margin-top: 5px;
}


.setting-block > .fields_fill > label{
  padding: 5px;
}

.delete-item{
  cursor: pointer;
  color: rgba(229, 50, 45, 0.8);
}
.delete-item > svg:hover{
  stroke: rgba(229, 50, 45, 0.8);
}
.button{
  cursor: pointer;
  /*border: 1px solid #222222;*/
}


.sample-input{
  border: 1px solid #CCCCCC;
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  font-size: 16px;
  resize: none;
  background: #FDFDFD;
  outline: none;
  width: 100%;
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
  -ms-transition: all .3s ease-out;
  -o-transition: all .3s ease-out;
  transition: all .3s ease-out
}

.sample-input:focus,
.sample-input:hover{
  border: 1px solid #419FD9;
}

.sample-input-error:valid{
  border: 1px solid rgba(229, 50, 45, 0.8);
}
.sample-input-error{
  border: 1px solid rgba(229, 50, 45, 0.8);
}

.field-message-error {
  display: flex;
  white-space: nowrap;
  align-self: start;
  top: -20px;
  right: 10px;
  position: absolute;
  color: red;
}
.disable-btn{
  /*background-image: linear-gradient(to right, rgba(129, 131, 132, 0.36) 0%, rgba(103, 116, 116, 0.33) 51%, rgba(129, 131, 132, 0.33) 100%);*/
  background: rgba(129, 131, 132, 0.36);
  cursor: default;
}

.author-item-link{
  color: #0969DA;
  text-decoration: none;
}
.author-item-link:hover{
  text-decoration: underline #3684DD;
}
.author-item{
  position: relative;
  padding: 10px;
}
.author-item:after{
  content: "";
  position: absolute;
  background: rgba(154, 154, 154, 0.5);
  width: 1px;
  top: 25%;
  right: 0;
  height: 50%;
}
.author-item:last-child:after{
  content: "";
  background: transparent;
}

.doc-list-item{
  background: rgba(51, 51, 51, 0.04);
  padding: 15px;
  display: flex;
  flex-flow: column;
  border-radius: 3px;
}

.display-none{
  display: none;
}

.doc-list-item h3{
  display: flex;
  align-items: center;
  color: #333333;
  cursor: pointer;
}

.doc-list-item .tumbler-filter{
  fill: #535353;
}

.doc-counters > div > span{
  display: flex;
  padding: 10px;
  margin: 15px 10px;
  align-items: center;
  flex-flow: column;
  /*padding: 20px;*/
  background: rgba(187, 187, 187, 0.25);
  border-radius: 5px;
}

.doc-counters > div > span:hover{
  background: #e0e0e0;
  cursor: default;
}

.doc-counters > div > span:last-child:hover{
  cursor: pointer;
}

.doc-counters > div > span > span{
  font-weight: bold;
  color: #333333;
}

.not-exist{
  text-align: center;
  display: flex;
  flex-flow: column;
  color: #222222;
  font-size: 40px;
  margin-top: 2rem;
}

.not-exist > a{
  color: #222222;
}
.mid-loader{
  position: absolute;
  top: 33%;
  left: calc(45% + 30px);
}

.input{
  font-size: 18px;
  padding: 10px;
  display: block;
  width: 100%;
  border: 1px solid #cecece;
  border-radius:7px;
  position: relative;
  height: 2.7rem;
  color: #212121;
  /*border-bottom: 1px solid #ccc;*/
}

.input:valid {
  border: 1px solid #1059FF;
}

.input:hover {
  border: 1px solid #212121;
}

.input:focus {
  outline: none;
  border: 2px solid #212121;
}


.input.invalid {
  border: 1px solid red;
}

.input.invalid:focus {
  border: 2px solid red;
}

.invalid:valid {
  border: 1px solid red;
}

.text-error{
  color: rgba(217, 39, 27, 0.87);
}


.top > label{
  color: rgba(229, 50, 45, 0.8);
  /*margin: 5px;*/
  font-size: 14px;
  bottom: -20px;
  position: absolute;
}


</style>