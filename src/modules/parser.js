const parserModule = {
  parse(xml){
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const result = this.DOMtoObj(xmlDoc)
    return result
  },
  DOMtoObj(XmlDoc){
    return JSON.stringify(this.children(XmlDoc), null, '\t')
  },
  tag(node){
    if(node && node.nodeType == 1 && node.nodeName){
      const result = {
        name: node.nodeName,
        type: 'tag',
      }
      const attributes = this.attributes(node)
      if(attributes) result['attributes'] = attributes
      const children = this.children(node)
      if(children) result['children'] = children
      return result
    }
  },
  attributes(node){
    if(node && node.attributes){
      const result = []
      for(let attr of node.attributes){
        result.push({ name: attr.nodeName, value: attr.value, type: 'attribute' })
      }
      return result
    } else {
      return void 0
    }
  },
  text(node){
    if(node && node.nodeValue){
      const result = {
        type: 'text',
        value: node.nodeValue.trim()
      }
      return result.value ? result : void 0
    } else {
      return void 0
    }
  },
  children(el){
    if(el && el.childNodes && el.childNodes.length > 0){
      const result = []
      for(let node of el.childNodes){
        switch (node.nodeType){
          case 1: {
            const tag = this.tag(node)
            if(tag) result.push(tag)
          }
          case 3: {
            const text = this.text(node)
            if(text) result.push(text)
          }
        }
      }
      return result
    } else {
      return void 0
    }
  },
}

export default parserModule
