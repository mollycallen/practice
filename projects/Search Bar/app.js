
import { Post } from "./post.js";
import { User } from "./user.js";

const userContainer = document.querySelector("[data-user-container]");
const searchInput = document.querySelector("[data-search]");
const searchBtn = document.querySelector("[data-search-btn]");

let posts = [];
let users = [];

getUsers();

searchBtn.addEventListener("click", (e) => {
    doSearch(e);
});

searchInput.addEventListener("input", (e) => {
    doSearch(e);
});

function doSearch(e) {
    const value = e.target.value.toLowerCase();
    //console.log(value)
    users.forEach(user => {
        const isVisible =
            user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
        //console.log(`checking ${user.name} ${isVisible}`)
        user.div.classList.toggle("hide", !isVisible);
    })
}
function getUsers() {

    // get all user data from api and store in users array
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => {
            data.forEach(entry => {
                users[entry.id] = new User(entry.id, entry.name, entry.email, entry.phone, entry.website, entry.company.name);
            })
            buildUserContainer();
        })
}

function buildUserContainer() {

    users.forEach(user => {

        // set name
        const nameDiv = user.div.querySelector("[data-user-name]");
        nameDiv.textContent = user.name;

        // set email
        const emailDiv = user.div.querySelector("[data-email]");
        emailDiv.textContent = user.email;

        // set phone
        const phoneDiv = user.div.querySelector("[data-phone]");
        phoneDiv.textContent = user.phone;

        // set website
        const websiteDiv = user.div.querySelector("[data-website]");
        websiteDiv.textContent = user.website;

        // set company
        const companyDiv = user.div.querySelector("[data-company]");
        companyDiv.textContent = user.company;

        const postBtn = user.div.querySelector("[data-post-btn]");
        postBtn.addEventListener("click", () => {
            const viewHide = user.div.querySelector("[data-view-hide]");
            const icon = user.div.querySelector(".fa-chevron-down")
            icon.classList.toggle("rotate-arrow")
            if (viewHide.textContent.includes("View")) {
                user.getPosts();
                viewHide.textContent = "Hide Posts"
            } else {
                user.hidePosts();
                viewHide.textContent = "View Posts"
            }
        });

        const todoBtn = user.div.querySelector("[data-todo-btn]");
        todoBtn.addEventListener("click", (e) => {
            user.getTodos(e);
        });


        userContainer.append(user.div);

    })
}


