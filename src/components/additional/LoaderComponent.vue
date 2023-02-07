<template>
    <div class="spinner-box">
        <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" :r="radius? radius : 8" fill="none" :stroke-width="width? width: 2"></circle>
        </svg>
    </div>
</template>

<script>
export default {
    props:['radius', 'width']
}
</script>

<style scoped>
.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
/*top: 50%;*/
/*left: 50%;*/
/*  margin: -25px 0 0 -25px;*/
  width: 50px;
  /*height: 50px;*/
}
.spinner .path {
    stroke: hsla(280, 48%, 6%, 0.89);
    stroke-linecap: round;
    animation: dash 1.6s ease-in-out infinite;
  }

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

</style>
