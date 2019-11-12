<template>
  <div class="parser">
    <div class="parser__from">
      <div class="parser__title">From Xml</div>
      <div ref="dragClassEl" class="parser__body">
        <textarea ref="dragArea" v-model="textSource"></textarea>
      </div>
    </div>
    <button @click="parse" class="parser__button">> PARSE ></button>
    <div class="parser__to">
      <div class="parser__title">To Json</div>
      <div class="parser__body">
        <textarea v-model="textResult"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import dragModule from '@/modules/drag-n-drop.js'
import parserModule from '@/modules/parser.js'

export default {
  name: 'Parser',
  data(){
    return {
      // textSource:`<a href="https://www.some-site.com">SomeSite</a><a href=https://www.some-site.com>SomeSite</a><a href="https://www.some-site.com"></a><a href=https://www.some-site.com></a><a></a><a/>`,
      textSource:``,
      textResult: '',
    }
  },
  mounted(){
    this.addDragEvents()
  },
  methods: {
    addDragEvents(){
      dragModule.addDragEvents.call(this, dragModule)
    },
    parse(){
      this.textResult = parserModule.parse(this.textSource)
      console.log(this.textResult)
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/styles/parser.scss">

</style>
