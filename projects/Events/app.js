const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

const divs = document.querySelectorAll("div");
divs.forEach(div => {
    div.addEventListener("click", e => {
        console.log("hi")
    })

});

const newDiv = document.createElement("div");


newDiv.style.width = "200px";
newDiv.style.height = "200px";
newDiv.style.background = "purple";
document.body.append(newDiv);
// grandparent.addEventListener("click", e => {
//     console.log("Grandparent Bubble");

// })
// parent.addEventListener('click', e => {
//     console.log("Parent Bubble");

// }, { once: true })
// child.addEventListener('click', e => {
//     //e.stopPropagation();
//     console.log("Child Bubble");

// })
// grandparent.addEventListener("click", e => {
//     console.log("Grandparent Capture");

// }, { capture: true })
// parent.addEventListener('click', e => {

//     console.log("Parent Capture");

// }, { capture: true })

// child.addEventListener('click', e => {
//     console.log("Child Capture");

// }, { capture: true })
// document.addEventListener('click', e => {
//     console.log("Document");
// })