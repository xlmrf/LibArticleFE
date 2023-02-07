<template>
  <div>


    <div class="wrapper">
      <svg width="200" height="300" class="svg">

        <symbol id="s-mask-circles">
          <g stroke="gray" stroke-width="12" fill="white">
            <circle cx="33%" cy="30%" r="20%" />
            <circle cx="52%" cy="62%" r="32%" />
          </g>
        </symbol>

        <mask id="mask-circles">
          <use xlink:href="#s-mask-circles" />
        </mask>

        <symbol id="s-flower-m">
          <image xlink:href="https://img-fotki.yandex.ru/get/7/yoksel.4f/0_39955_f25b22ae_M" width="199" height="300" />
        </symbol>

        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#s-flower-m"></use>

      </svg>

      <span class="sign">+</span>

      <svg width="200" height="300" class="svg">
        <rect y="0" width="100%" height="100%" fill="black" />
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#s-mask-circles"></use>
      </svg>

      <span class="sign">=</span>

      <svg width="200" height="300" class="svg">
        <g mask="url(#mask-circles)">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#s-flower-m"></use>
        </g>
      </svg>

    </div>


  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/*BODY {*/
/*  background:*/
/*      linear-gradient( #EEE 1px, transparent 2px),*/
/*      linear-gradient( to right, #EEE 1px, transparent 2px);*/
/*  background-size: 1em 1em;*/
/*}*/

.wrapper {
  /*position: absolute;*/
  /*top: 0;*/
  /*bottom: 0;*/
  margin: auto;
  width: 100%;
  height: 300px;
  text-align: center;
  white-space: nowrap;
  font-family: Arial, sans-serif;
}

.svg,
.sign {
  display: inline-block;
  vertical-align: middle;
}

.sign {
  margin: .5em 0;
  padding: 0 .5em;
  font-size: 3em;
}
</style>