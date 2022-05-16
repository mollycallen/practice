const closeBtn = document.querySelector(".close-btn");
const menuBtn = document.querySelector(".menu i");
const navHeadings = document.querySelectorAll(".heading-btn");



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

navHeadings.forEach(subheading => {
    subheading.addEventListener("click", (e) => {
        //console.log(e.currentTarget)
        e.currentTarget.nextElementSibling.classList.toggle("not-visible");
        e.currentTarget.children[0].classList.toggle('rotate');
    })
})

