import { Post } from "./post.js";
import { Todo } from "./todo.js";

const userTemplate = document.querySelector("[data-user-template]");



export class User {
    constructor(id, name, email, phone, website, company) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.company = company;
        this.posts = [];
        this.todos = [];

        this.div = userTemplate.content.cloneNode(true).children[0];

        this.postContainer = this.div.querySelector("[data-post-container]");

    }

    getPosts() {
        // if we have already gotten the posts, show them
        if (this.posts.length > 0) {
            this.postContainer.style.display = "grid"
        } else {
            // get post data for this user from api and populate posts array
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.id}`)
                .then(res => res.json())
                .then(data => {
                    data.forEach(entry => {
                        this.posts[entry.id] = new Post(entry.id, entry.userId, entry.title, entry.body);
                    });
                    this.buildPostContainer();
                })
        }
    }

    hidePosts() {
        this.postContainer.style.display = "none";
    }

    buildPostContainer() {
        this.posts.forEach(post => {
            this.postContainer.append(post.div);
        })
    }
    getTodos(e) {
        // // if we have already gotten the todos, show them
        if (this.todos.length > 0) {
            this.buildTodoPopup(e);
        } else {
            //get todo data for this user from api and populate todos array
            fetch(`https://jsonplaceholder.typicode.com/todos?userId=${this.id}`)
                .then(res => res.json())
                .then(data => {
                    data.forEach(entry => {
                        this.todos.push(new Todo(entry.id, entry.userId, entry.title, entry.completed));
                    });
                    this.buildTodoPopup(e);
                })
        }
    }
    buildTodoPopup(e) {
        const popup = document.querySelector("[data-todo-popup]");
        //console.log(popup)
        const close = popup.querySelector(".close");
        close.addEventListener("click", () => {
            this.hideTodos();
        });
        const name = popup.querySelector(".user-name");
        name.textContent = this.name;
        const todoContainer = popup.querySelector("[data-todo-container]")
        this.todos.forEach(todo => {

            todoContainer.append(todo.div);
        })
        console.log(e.pageY + e.offsetY)
        popup.style.top = `${e.pageY + e.offsetY}px`;
        popup.style.display = "flex";

    }
    hideTodos() {
        document.querySelector("[data-todo-popup]").style.display = "none";
    }
}