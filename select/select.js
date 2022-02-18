const getTemplate = (data = [], placeholder, selectedId) => {
    let text = placeholder ?? 'Choose'
    const items = data.map(item => {
        let cls = ''
        if(item.id === selectedId){
            
            text = item.value
            cls = 'selected '
        }
        return `
            <li class = "select-item ${cls}" data-type="item" data-id =${item.id}> ${item.value} </li>
        `
    })
    return `
        <div class="select-backdrop" data-type="backdrop"></div>
        <div class="select-input" data-type="input">
            <span data-type = "value">
                ${text}
            </span>
            <i class="fa fa-solid fa-angle-down" data-type="arrow"></i>
        </div>
        <div class="select-dropdown">
            <ul class="select-list">
                ${items.join('')}
            </ul>
        </div>
    `
}

export class Select{
    constructor(selector, options){
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = options.selectedId
        this.#render()
        this.#setUp()
        
    }
    #render(){
        const { data, placeholder} = this.options
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)

    }
    #setUp(){
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$value = this.$el.querySelector('[data-type = "value"]')
    }
    clickHandler(event){
        const {type} = event.target.dataset
        const {arrow} = event.target.dataset
        if(type === 'input' || type === 'arrow'){
            this.toggle()
        }else if(type === 'item'){
            const {id} = event.target.dataset
            this.select(id)
        }else if(type === 'backdrop'){
            this.close()
        }
    }
    get isOpen(){
        return this.$el.classList.contains('open')
    }
    get current(){
        return this.options.data.find(item => item.id === this.selectedId)
    }
    select(id){
        this.selectedId = id
        this.$value.textContent = this.current.value
        this.$el.querySelectorAll('[data-type="item"]').forEach(item=>item.classList.remove('selected'))
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
        this.options.onSelected ? this.options.onSelected(this.current) : null
        this.close()
    }
    toggle(){
        this.isOpen ? this.close() : this.open()
    }
    open(){
        this.$el.classList.add('open')
    }
    close(){
        this.$el.classList.remove('open')
    }
    destroy(){
        this.$el.removeEventListener('click', this.clickHandler)
    }
}