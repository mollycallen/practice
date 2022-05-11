



const quoteBtn = document.querySelector('.quote-btn');
const quoteTxt = document.querySelector('.quote-txt');
quoteBtn.addEventListener('click', () => {
    fetch("https://api.adviceslip.com/advice")
        .then(result => result.json())
        .then(data => {
            //console.log(data);
            quoteTxt.innerText = data.slip.advice;
        })
})

const catBtn = document.querySelector('.cat-btn');
const catTxt = document.querySelector('.cat-txt');
catBtn.addEventListener('click', () => {
    fetch("https://catfact.ninja/fact?max_length=140")
        .then(result => result.json())
        .then(data => {
            catTxt.innerText = data.fact;


        });

})

const wordBtn = document.querySelector('.word-btn');
const wordTxt = document.querySelector('.word-txt');
const wordDefn = document.querySelector('.word-defn');
wordBtn.addEventListener('click', () => {
    fetch("https://random-words-api.vercel.app/word")
        .then(result => result.json())
        .then(data => {
            console.log(data);
            wordTxt.innerHTML = `${data[0].word}:`;
            wordDefn.innerHTML = data[0].definition;
        });
})

const activityBtn = document.querySelector('.activity-btn');
const activityTxt = document.querySelector('.activity-txt');
activityBtn.addEventListener('click', () => {
    fetch("http://www.boredapi.com/api/activity/")
        .then(result => result.json())
        .then(data => {
            activityTxt.innerHTML = data.activity;
        });
})

const dogBtn = document.querySelector('.dog-btn');
const dogImg = document.querySelector('.dog-img');
dogBtn.addEventListener('click', () => {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(result => result.json())
        .then(data => {
            dogImg.src = data.message;
        })
});

const jokeBtn = document.querySelector('.joke-btn');
const jokeTxt = document.querySelector('.joke-txt');
const jokeAns = document.querySelector('.joke-ans');
jokeBtn.addEventListener('click', () => {


    fetch("https://official-joke-api.appspot.com/jokes/random")
        .then(result => result.json())
        .then(data => {
            jokeTxt.innerText = data.setup;
            jokeAns.innerText = "";
            setTimeout(() => {
                jokeAns.innerText = data.punchline;
            }, 1500);
        })
})

// change layout
const containerDiv = document.querySelector('.container');
const stackLink = document.querySelector('a.stack');
const gridLink = document.querySelector('a.grid');

stackLink.addEventListener('click', () => {
    containerDiv.classList.remove('grid-container');
    containerDiv.classList.add('stack-container');
    stackLink.classList.add('selected');
    gridLink.classList.remove('selected');

});
gridLink.addEventListener('click', () => {
    containerDiv.classList.add('grid-container');
    containerDiv.classList.remove('stack-container');
    gridLink.classList.add('selected');
    stackLink.classList.remove('selected');
});




