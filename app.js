const closeBtn = document.querySelector(".close-btn");
const menuBtn = document.querySelector(".menu i");
const navDropDowns = document.querySelectorAll(".nav-heading > a");
console.log(navDropDowns);

function displayNav() {
    const nav = document.querySelector(".nav-bar");
    //nav.style.display = "block";
    nav.style.left = "0px";
};

function closeNav() {
    const nav = document.querySelector(".nav-bar");
    //nav.style.display = "none";
    nav.style.left = "-500px";
}

menuBtn.addEventListener("click", displayNav);
closeBtn.addEventListener("click", closeNav);
navDropDowns.forEach(dropDown => {
    dropDown.addEventListener("click", (e) => {
        e.target.nextElementSibling.classList.toggle("not-visible");
        e.target.children[0].classList.toggle('rotate');
        console.log(e.target.children)
    })
})
