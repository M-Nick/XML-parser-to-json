<template>
  <div id="app">
    <Parser />
  </div>
</template>

<script>
import Parser from './components/Parser.vue';

export default {
  name: 'app',
  components: {
    Parser,
  },
};
</script>

<style lang="scss">
*,*::before,*::after{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
  font-family: Roboto, sans-serif;
}
.visually-hidden {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  opacity: 0.0000001;
}
*::-webkit-scrollbar {
  height: 0px;
  width: 3px;
}

*::-webkit-scrollbar-track {
  background-color: rgba(255, 0, 0, 0);
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #007bff;
}

*::-webkit-scrollbar-thumb {
  background-color: #3196ff;
  border-radius: 3px;
}
</style>
