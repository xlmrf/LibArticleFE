<template>
  <div class="pulse-loader">
    <div class="snippet" data-title="dot-pulse">
      <div class="stage">
        <div class="dot-pulse" :class="{'pulse-style':pulseStyle}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['pulseStyle']

}
</script>

<style scoped>

.dot-pulse {
  /*///*/
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  color: #3a3a3b;
  /*box-shadow: 9999px 0 0 -5px;*/
  animation: dot-pulse 1.2s infinite linear;
  animation-delay: 0.25s;
}
.dot-pulse::before, .dot-pulse::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  color: #3a3a3b;
}
.pulse-style{
  color: #3eaf7c;
}
.pulse-style::before, .pulse-style::after{
  color: #3eaf7c;
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px;
  animation: dot-pulse-before 1.2s infinite linear;
  animation-delay: 0s;
}
.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px;
  animation: dot-pulse-after 1.2s infinite linear;
  animation-delay: 0.5s;
}

@keyframes dot-pulse-before {
  0% {
    box-shadow: 9984px 0 0 -5px;
  }
  30% {
    box-shadow: 9984px 0 0 2px;
  }
  60%, 100% {
    box-shadow: 9984px 0 0 -5px;
  }
}
@keyframes dot-pulse {
  0% {
    box-shadow: 9999px 0 0 -5px;
  }
  30% {
    box-shadow: 9999px 0 0 2px;
  }
  60%, 100% {
    box-shadow: 9999px 0 0 -5px;
  }
}
@keyframes dot-pulse-after {
  0% {
    box-shadow: 10014px 0 0 -5px;
  }
  30% {
    box-shadow: 10014px 0 0 2px;
  }
  60%, 100% {
    box-shadow: 10014px 0 0 -5px;
  }
}


</style>