
const auth = "563492ad6f91700001000001c159677c065d4371af36fa010537e6db";

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
const moreBtn = document.querySelector('.more');

let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

// event listener
searchInput.addEventListener('input', updateInput);
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchPhotos(searchValue);
})

moreBtn.addEventListener('click', loadMore);

function updateInput(e) {
    searchValue = e.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    })
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.small}></img>
        `;
        gallery.appendChild(galleryImg);
    });
}
async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1"
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

async function searchPhotos(query) {
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    clear();
    generatePictures(data);
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}
async function loadMore() {
    console.log(searchValue);
    page++;
    if (searchValue) {
        fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}
curatedPhotos();