<template>
    <div class="spinner-box" :class="loader_class">
        <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" :r="radius? radius : 8" fill="none" :stroke-width="width? width: 2"></circle>
        </svg>
    </div>
</template>

<script>
export default {
    props:['radius', 'width','loader_class']
}
</script>

<style scoped>
.spinner-box{
  position: relative;
}

.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
  width: 50px;
  margin: 25px;
}
.mid-top > svg{
  left: 50%;
}
.over-wall{
  padding: 42px;
  border-radius: 4px;
  background: rgba(123, 123, 123, 0.54);
}
.over-wall > svg{
  margin: -25px;
}
.spinner .path {
    stroke: hsla(280, 48%, 6%, 0.89);
    stroke-linecap: round;
    animation: dash 1.6s ease-in-out infinite;
  }

.save-session-loader{
  margin: 0;
  top: -32px;
  left: 20px;
}

.save-session-loader .path{
  stroke: hsl(177, 70%, 41%);
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
