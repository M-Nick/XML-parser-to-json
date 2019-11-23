export const dragModule = {
  addProxyDrag(fn){
    const handler = {
      apply: (target, thisArg, args) => {
        if(args && args[0] && args[0].dataTransfer &&
                args[0].dataTransfer &&
                args[0].dataTransfer.types){
          for (var i = 0; i < args[0].dataTransfer.types.length; i++) {
              if (args[0].dataTransfer.types[i] == "Files") {
                return target.apply(thisArg, args)
              }
          }
        }
      }
    }
    return new Proxy(fn, handler)
  },

  addDragEvents(dragModule){
    const dragArea = this.$refs.dragArea
    window.addEventListener('dragover', dragModule.addProxyDrag(dragModule.handleWindowDragOver.bind(this)))
    window.addEventListener('dragleave', dragModule.addProxyDrag(dragModule.handleWindowDragLeave.bind(this)))
    window.addEventListener('drop', dragModule.addProxyDrag(dragModule.handleWindowDrop.bind(this)))
    dragArea.addEventListener('dragenter', dragModule.addProxyDrag(dragModule.handleAreaDragEnter.bind(this)))
    dragArea.addEventListener('dragover', dragModule.addProxyDrag(dragModule.handleAreaDragOver.bind(this)))
    dragArea.addEventListener('dragleave', dragModule.addProxyDrag(dragModule.handleAreaDragLeave.bind(this)))
    dragArea.addEventListener('drop', dragModule.addProxyDrag(dragModule.handleAreaDrop.bind(this)))
  },

  async handleAreaDragEnter(e){
    e.preventDefault()
    e.stopPropagation()
    const dragClassEl = this.$refs.dragClassEl
    if(dragClassEl){
      dragClassEl.classList.add('parser__body--drag-area', 'parser__body--drag-over')
      dragClassEl.classList.remove('parser__body--drag-out')
    }
  },

  async handleAreaDragOver(e){
    e.preventDefault()
    e.stopPropagation()
    const dragClassEl = this.$refs.dragClassEl
    if(dragClassEl){
      dragClassEl.classList.add('parser__body--drag-area', 'parser__body--drag-over')
      dragClassEl.classList.remove('parser__body--drag-out')
    }
  },

  handleAreaDragLeave(e){
    e.preventDefault()
    e.stopPropagation()
    const dragClassEl = this.$refs.dragClassEl
    if(dragClassEl){
      dragClassEl.classList.add('parser__body--drag-area', 'parser__body--drag-out')
      dragClassEl.classList.remove('parser__body--drag-over')
    }
  },

  async handleAreaDrop(e){
    e.preventDefault()
    e.stopPropagation()
    const dragClassEl = this.$refs.dragClassEl
    const file = e.dataTransfer.files[0]
    if(file){
      this.textSource = await file.text('xml')
    }
    if(dragClassEl){
      dragClassEl.classList.remove('parser__body--drag-over', 'parser__body--drag-area', 'parser__body--drag-out')
    }
  },

  handleWindowDragOver(e){
    e.preventDefault()
    const dragClassEl = this.$refs.dragClassEl
    if(dragClassEl){
      dragClassEl.classList.add('parser__body--drag-area', 'parser__body--drag-out')
      dragClassEl.classList.remove('parser__body--drag-over')
    }
  },

  handleWindowDrop(e){
    e.preventDefault()
    const dragClassEl = this.$refs.dragClassEl
    if(dragClassEl){
      dragClassEl.classList.remove('parser__body--drag-over', 'parser__body--drag-area', 'parser__body--drag-out')
    }
  },

  handleWindowDragLeave(e){
    e.preventDefault()
    e.stopPropagation()
    const dragClassEl = this.$refs.dragClassEl
    if(dragClassEl){
      dragClassEl.classList.remove('parser__body--drag-over', 'parser__body--drag-area', 'parser__body--drag-out')
    }
  },
}
