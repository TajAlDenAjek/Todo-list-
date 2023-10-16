import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {
    static instance: ListTemplate = new ListTemplate()
    ul: HTMLUListElement;
    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }
    clear(): void {
        this.ul.innerHTML = ''
    }
    render(fullList: FullList): void {
        this.clear()

        fullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item"

            const check = document.createElement("input") as HTMLInputElement

            check.type = "checkbox"
            check.id = item.id
            check.tabIndex = 1
            check.checked = item.checked

            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
            })
            li.append(check)


            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement("button") as HTMLButtonElement

            button.className = 'button'
            button.textContent = 'X'
            button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.render(fullList)
            })
            li.append(button)
            this.ul.append(li)
        })
    }
}
