
const todoTemplate = document.querySelector("[data-todo-template]");

export class Todo {
    constructor(id, userId, title, completed) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.completed = completed
        this.div;
        this.buildDiv();

    }

    buildDiv() {

        this.div = todoTemplate.content.cloneNode(true).children[0];

        //title
        const titleDiv = this.div.querySelector("[data-todo-title]");
        titleDiv.textContent = this.title;

        //completed
        const checkmark = this.div.querySelector(".checkmark");

        checkmark.classList.toggle("hide", this.completed);

    }
}