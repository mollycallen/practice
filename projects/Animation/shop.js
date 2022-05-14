const btns = document.querySelectorAll(".basket-btn");
const countElement = document.getElementById("item-count");
let itemCount = 0;

btns.forEach(btn => {
    btn.addEventListener("click", e => {
        const item = e.target.parentNode;
        const newImg = document.createElement("img");
        newImg.src = item.querySelector("img").getAttribute("src");
        console.log(e)
        newImg.style.background = "none";
        newImg.style.right = e.mouseX + "px";
        newImg.style.top = e.mouseY + "px";
        newImg.classList.add("zoom");

        item.appendChild(newImg)
        setTimeout(() => {
            itemCount++;
            countElement.textContent = itemCount;

        }, 1500)


    })
})