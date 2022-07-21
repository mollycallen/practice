const cards = document.querySelectorAll(".card");
const cardContainer = document.querySelector(".card-container");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        // if (entry.isIntersecting) {
        //     observer.unobserve(entry.target)
        // }
    })
}, {
    threshold: .5,
    //rootMargin: "-100px",
    //root:
})

const lastCardObserver = new IntersectionObserver(entries => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector(".card:last-child"))
}, {
    rootMargin: "50px",
})

lastCardObserver.observe(document.querySelector(".card:last-child"))
cards.forEach(card => {
    observer.observe(card);
})

function loadNewCards() {
    for (let i = 0; i < 10; i++) {
        const card = document.createElement("div");
        card.textContent = "new card";
        card.classList.add("card");
        observer.observe(card);
        cardContainer.append(card);
    }
}