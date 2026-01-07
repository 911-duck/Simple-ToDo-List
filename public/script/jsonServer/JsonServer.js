class JsonServer {
    constructor(API, type) {
        this.API = API
        this.type = type
    }
    async getItems() {
        const response = await fetch(`${this.API}/${this.type}`)
        const result = await response.json()
        return result
    }

    async deleteItem(button, id) {
        button.parentElement.remove()

        const response = fetch(`${this.API}/${this.type}/${id}`, {
            method: 'DELETE'
        })

        return response
    }

    async patchItem(checkbox, id, header, discription) {
        fetch(`http://localhost:3000/items/${id}` , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "header": header,
                "discription": discription,
                "done": checkbox,
            })
        })
    }
    async display(container) {
        container.innerHTML = ""

        const result = await this.getItems()

        result.forEach(item => {

            const element = document.createElement("div")

            element.classList.add("item")
            element.classList.add("list__item")

            element.innerHTML = `
                <input type="checkbox" class="item__checkbox" ${item.done}>
                <div class="item__txt txt">
                    <input disabled class="txt__header">
                    <span>${item.date}</span>
                    <input disabled class="txt__discription">
                </div>
                <button class="item__mod mod"><i class="fa-solid fa-recycle"></i></button>
                <button class="item__delete delete"><i class="fa-regular fa-trash-can"></i></button>
            `

            element.querySelector(".txt__header").value = `${item.header}`
            element.querySelector(".txt__discription").value = `${item.discription}`

            element.querySelector(".delete").addEventListener('click', async e => {
                this.deleteItem(element.querySelector(".delete"), item.id)
            })

            element.querySelector(".item__checkbox").addEventListener('input', async e => {
                this.patchItem(element.querySelector(".item__checkbox").checked, item.id, item.header, item.discription)
            })

            element.querySelector(".mod").addEventListener('click',async e =>{
                if(element.querySelector(".txt__header").disabled == true)element.querySelector(".txt__header").disabled = false
                else element.querySelector(".txt__header").disabled = true
                if(element.querySelector(".txt__discription").disabled == true)element.querySelector(".txt__discription").disabled = false
                else element.querySelector(".txt__discription").disabled = true
            })

            element.querySelector(".txt__discription").addEventListener("input",async e=>{
                this.patchItem(element.querySelector(".item__checkbox").checked, item.id,item.header , element.querySelector(".txt__discription").value)
            })

            element.querySelector(".txt__header").addEventListener("input",async e=>{
                this.patchItem(element.querySelector(".item__checkbox").checked, item.id, element.querySelector(".txt__header").value, item.discription)
            })

            container.appendChild(element)
        });
    }
    async postItem(obj) {
        const response = await fetch(`${this.API}/${this.type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        return response 
    }
    async getLastID() {
        const result = await this.getItems()

        if (result.length) return result[result.length - 1].id
        else return 0
    }
    async add(header, discription) {
        const now = new Date()

        const obj = {
            id: `${Number(await this.getLastID()) + 1}`,
            header: header,
            discription: discription,
            done: "",
            date: now.toLocaleString("ru-RU")
        }

        await this.postItem(obj)
    }
}

export default JsonServer