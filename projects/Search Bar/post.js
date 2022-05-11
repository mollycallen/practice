import { Comment } from "./comment.js";

const postTemplate = document.querySelector("[data-post-template]");

export class Post {
    constructor(id, userId, title, body) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.body = body;
        this.comments = [];
        this.div;
        this.buildDiv();

        this.commentContainer = this.div.querySelector("[data-comment-container]");
    }

    getComments() {
        // if we've already fetched the comments, show them
        if (this.comments.length > 0) {
            this.commentContainer.style.display = "grid"
        } else {

            // get comment data from api and store in comment array and append to comment container
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.id}`)
                .then(res => res.json())
                .then(data => {
                    data.forEach(entry => {
                        this.comments[entry.id] = new Comment(entry.id, entry.name, entry.email, entry.body);
                    })
                    this.buildCommentContainer();
                    //console.log(this.comments);
                })
        }
    }

    hideComments() {
        this.commentContainer.style.display = "none";
    }

    buildDiv() {
        //console.log("building post div" + this.id)
        this.div = postTemplate.content.cloneNode(true).children[0];

        // title
        const titleDiv = this.div.querySelector("[data-post-title]");
        titleDiv.textContent = this.title;

        // body
        const bodyDiv = this.div.querySelector("[data-post-body]");
        bodyDiv.textContent = this.body;

        const commentBtn = this.div.querySelector("[data-comment-btn]");

        commentBtn.addEventListener("click", () => {
            //console.log("pressed comment button")
            const viewHide = this.div.querySelector("[data-view-hide]");
            if (viewHide.textContent.includes("View")) {
                this.getComments();
                viewHide.textContent = "Hide Comments"
            } else {
                this.hideComments();
                viewHide.textContent = "View Comments"
            }
        })
    }

    buildCommentContainer() {
        this.comments.forEach(comment => {
            this.commentContainer.append(comment.div);
        })
    }
}