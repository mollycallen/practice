const commentTemplate = document.querySelector("[data-comment-template]");

export class Comment {
    constructor(id, name, email, body) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.body = body;
        this.div;
        this.buildDiv();
    }

    buildDiv() {
        //console.log(`building comment div ${this.id}`)

        this.div = commentTemplate.content.cloneNode(true).children[0];

        //name
        const nameDiv = this.div.querySelector("[data-post-name]");
        nameDiv.textContent = this.name;

        //email
        const emailDiv = this.div.querySelector("[data-post-email]");
        emailDiv.textContent = this.email;

        //body
        const bodyDiv = this.div.querySelector("[data-post-body]");
        bodyDiv.textContent = this.body;
    }
}