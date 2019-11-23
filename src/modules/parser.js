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

  addProperty(obj, key, value){
    if(obj && key){
      if(Object.keys(obj).includes(key)){
        if(obj[key] instanceof Array){
          obj[key].push(value)
        } else {
          obj[key] = value instanceof Array ? [obj[key], ...value] : [obj[key], value]
        }
      } else {
        obj[key] = value
      }
      return true
    } else return false
  },

  tag(node){
    if(node && node.nodeType == 1 && node.nodeName){
      const result = {
        key: node.nodeName,
        value: {},
      }
      const attributes = this.attributes(node)
      if(attributes) result.value = attributes || {}
      const children = this.children(node)
      if(children){
        if(children.text){
          this.addProperty(result.value, 'text', children.text)
          delete children.text
        }
        Object.keys(children).forEach(key => this.addProperty(result.value, key, children[key]))
        result.value
      }
      return result
    }
  },

  attributes(node){
    if(node && node.attributes){
      const result = {}
      for(let attr of node.attributes){
        this.addProperty(result, attr.nodeName, attr.value)
      }
      return result
    }
  },

  text(node){
    if(node && node.nodeValue){
      const result = node.nodeValue.trim()
      return result ? result : void 0
    }
  },

  children(el){
    if(el && el.childNodes && el.childNodes.length > 0){
      let result = {}
      for(let node of el.childNodes){
        switch (node.nodeType){
          case 1: {
            const tag = this.tag(node)
            if(tag) this.addProperty(result, tag.key, tag.value)
          }
          case 3: {
            const text = this.text(node)
            if(text) this.addProperty(result, 'text', text)
          }
        }
      }
      return result
    }
  },
}

export default parserModule
