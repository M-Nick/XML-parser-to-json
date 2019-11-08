<template>
  <div class="parser">
    <div class="parser__from">
      <div class="parser__title">From Xml</div>
      <div class="parser__body"><textarea v-model="textSource"></textarea></div>
    </div>
    <button @click="parse" class="parser__button">> PARSE ></button>
    <div class="parser__to">
      <div class="parser__title">To Json</div>
      <div class="parser__body"><textarea v-model="textResult"></textarea></div>
    </div>
  </div>
</template>

<script>
import Xml from '@/js/xml/xml.js'

export default {
  name: 'Parser',
  data(){
    return {
      // textSource:`<a href="https://www.some-site.com">SomeSite</a>\n<a href=https://www.some-site.com>SomeSite</a>\n<a href="https://www.some-site.com"></a>\n<a href=https://www.some-site.com></a>\n<a></a>\n<a/>`,
      textSource:`a;l;k;s;j;d;l;k;a;j;s;d;<a href="https://www.some-site.com">SomeSite</a>alksdjhfl;akjsd;hf`,
      textResult: '',
    }
  },
  methods: {
    parse(){
      const parsedXml = new Xml(this.textSource)
      console.log(parsedXml)
      // this.textResult = JSON.stringify(xmlToJson.parse(this.textSource))
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/styles/parser.scss">

</style>
