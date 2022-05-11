// global selections and variables
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll("input[type=range]");
const currentHexes = document.querySelectorAll(".color h2");
const popup = document.querySelector(".copy-container");
const adjustBtns = document.querySelectorAll(".adjust");
const lockBtns = document.querySelectorAll(".lock");
const closeAdjustments = document.querySelectorAll(".close-adjustment");
const sliderContainers = document.querySelectorAll(".sliders");

// save the initial colors before  altering them
let initialColors;

// event listeners
generateBtn.addEventListener("click", () => {
  randomColors();
});
sliders.forEach((slider) => {
  slider.addEventListener("input", hslControls);
});

colorDivs.forEach((div, index) => {
  div.addEventListener("change", () => {
    updateTextUI(index);
  });
});
currentHexes.forEach((hex) => {
  hex.addEventListener("click", (ev) => {
    //console.log(hex);
    copyToClipboard(hex, ev);
  });
});

popup.addEventListener("transitionend", () => {
  const popupBox = popup.children[0];
  popupBox.classList.remove("active");
  popup.classList.remove("active");
});

adjustBtns.forEach((button, index) => {
  button.addEventListener("click", () => {
    openAdjustmentPanel(index);
  });
});

closeAdjustments.forEach((button, index) => {
  button.addEventListener("click", () => {
    closeAdjustmentPanel(index);
  });
});
lockBtns.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    lockLayer(e, index);
  });
});
// functions

function randomColors() {
  initialColors = [];
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomHex = generateHex();
    //console.log(hexText.innerText);
    //console.log(randomHex.hex());
    // save to array
    if (div.classList.contains("locked")) {
      initialColors.push(hexText.innerText);
      return;
    } else {
      initialColors.push(randomHex.hex());
    }
    displayColor(div, randomHex);
  });
  resetInputs();
}

function displayColor(div, colorHex) {
  // add color to background
  div.style.backgroundColor = colorHex;
  div.children[0].innerText = colorHex;

  // check for text contrast
  checkTextContrast(colorHex, div.children[0]);
  const icons = div.querySelectorAll(".controls button");
  for (icon of icons) {
    checkTextContrast(colorHex, icon);
  }
  //initialize colorize sliders
  const color = chroma(colorHex);
  const sliders = div.querySelectorAll(".sliders input");
  const hue = sliders[0];
  const brightness = sliders[1];
  const saturation = sliders[2];
  colorizeSliders(color, hue, brightness, saturation);
}

function colorizeSliders(color, hue, brightness, saturation) {
  // saturation
  const s0 = color.set("hsl.s", 0);
  const s1 = color.set("hsl.s", 1);
  const sScale = chroma.scale([s0, color, s1]);
  // update input colors
  saturation.style.backgroundImage = `linear-gradient(to right, ${sScale(
    0
  )}, ${sScale(1)})`;

  // brightness
  const bMid = color.set("hsl.l", 0.5);
  const bScale = chroma.scale(["black", bMid, "white"]);

  brightness.style.backgroundImage = `linear-gradient(to right, ${bScale(
    0
  )}, ${bScale(0.5)}, ${bScale(1)})`;

  // hue
  hue.style.backgroundImage =
    "linear-gradient(to right, rgb(204,75,75), rgb(204,204,75), rgb(75,204,75), rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))";
}

function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
  //   const letters = "0123456789ABCDEF";
  //   let hash = "#";
  //   for (let i = 0; i < 6; i++) {
  //     hash += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return hash;
}

function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
}

function hslControls(e) {
  const index =
    e.target.getAttribute("data-hue") ||
    e.target.getAttribute("data-bright") ||
    e.target.getAttribute("data-sat");
  //console.log(e.target.parentElement);
  let sliders = e.target.parentElement.querySelectorAll("input[type=range]");
  const hue = sliders[0];
  const brightness = sliders[1];
  const saturation = sliders[2];

  const bgColor = initialColors[index];
  let color = chroma(bgColor)
    .set("hsl.s", saturation.value)
    .set("hsl.l", brightness.value)
    .set("hsl.h", hue.value);
  colorDivs[index].style.backgroundColor = color;
  colorizeSliders(color, hue, brightness, saturation);
}
function updateTextUI(index) {
  const activeDiv = colorDivs[index];
  const color = chroma(activeDiv.style.backgroundColor);
  const textHex = activeDiv.querySelector("h2");
  const icons = activeDiv.querySelectorAll(".controls button");
  textHex.innerText = color.hex();
  checkTextContrast(color, textHex);
  for (icon of icons) {
    checkTextContrast(color, icon);
  }
}
function resetInputs() {
  const sliders = document.querySelectorAll(".sliders input");
  sliders.forEach((slider) => {
    if (slider.name === "hue") {
      const hueColor = initialColors[slider.getAttribute("data-hue")];
      const hueValue = chroma(hueColor).hsl()[0];
      slider.value = Math.floor(hueValue);
    }
    if (slider.name === "brightness") {
      const brColor = initialColors[slider.getAttribute("data-bright")];
      const brValue = chroma(brColor).hsl()[2];
      slider.value = Math.floor(brValue * 100) / 100;
    }
    if (slider.name === "saturation") {
      const satColor = initialColors[slider.getAttribute("data-sat")];
      const satValue = chroma(satColor).hsl()[1];
      slider.value = Math.floor(satValue * 100) / 100;
    }
  });
}

function copyToClipboard(hex, ev) {
  // trick to copy to clipboard
  // create a textarea with the text to be copied
  // use the execCommand to copy
  // remove textarea
  const el = document.createElement("textarea");
  el.value = hex.innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  const popupBox = popup.children[0];
  //console.log(ev);
  // display popup where mouse is clicked
  popupBox.style.top = `${ev.clientY}px`;
  popupBox.style.left = `${ev.clientX}px`;
  popupBox.classList.add("active");
  console.log(popupBox.style);

  popup.classList.add("active");
}

function openAdjustmentPanel(index) {
  sliderContainers[index].classList.toggle("active");
}
function closeAdjustmentPanel(index) {
  sliderContainers[index].classList.remove("active");
}

function lockLayer(e, index) {
  const lockIcon = lockBtns[index].children[0];
  lockIcon.classList.toggle("fa-lock-open");
  lockIcon.classList.toggle("fa-lock");
  colorDivs[index].classList.toggle("locked");
}

// save to local storage
const saveBtn = document.querySelector(".save");
const submitSave = document.querySelector(".submit-save");
const closeSave = document.querySelector(".close-save");
const saveContainer = document.querySelector(".save-container");
const saveInput = document.querySelector(".save-input");
const libraryContainer = document.querySelector(".library-container");
const palettesContainer = document.querySelector(".palettes-container");
const libraryBtn = document.querySelector(".library");
const closeLibraryBtn = document.querySelector(".close-library");

// local storage event listeners
saveBtn.addEventListener("click", openPalette);
closeSave.addEventListener("click", closePalette);
submitSave.addEventListener("click", savePalette);
libraryBtn.addEventListener("click", openLibrary);
closeLibraryBtn.addEventListener("click", closeLibrary);

// local storage functions
function openPalette(e) {
  //console.log(saveBtn);
  const popup = saveContainer.children[0];
  saveContainer.classList.add("active");
  popup.classList.add("active");
  saveInput.focus();
}

function closePalette(e) {
  const popup = saveContainer.children[0];
  saveContainer.classList.remove("active");
  popup.classList.remove("active");
}
function savePalette(e) {
  closePalette();
  const name = saveInput.value;
  const colors = [];
  currentHexes.forEach((hex) => {
    colors.push(hex.innerText);
  });

  const paletteObj = { name, colors };

  //save to local storage
  const paletteIndex = saveToStorage(paletteObj);
  console.log(paletteIndex);
  saveInput.value = "";
  // ! need index
  addPaletteToLibrary(paletteObj, paletteIndex);
}

function addPaletteToLibrary(paletteObj, paletteIndex) {
  // generate the palette for library
  const paletteDiv = document.createElement("div");
  paletteDiv.classList.add("custom-palette");
  const title = document.createElement("h4");
  title.innerText = paletteObj.name;
  const preview = document.createElement("div");
  preview.classList.add("small-preview");
  paletteObj.colors.forEach((smallColor) => {
    const smallDiv = document.createElement("div");
    smallDiv.style.backgroundColor = smallColor;
    preview.appendChild(smallDiv);
  });

  const paletteBtn = document.createElement("button");
  paletteBtn.classList.add("pick-palette-btn");
  paletteBtn.innerText = `Select`;

  const deletePaletteBtn = document.createElement("button");
  deletePaletteBtn.classList.add("delete-palette-btn");
  deletePaletteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;

  // add event listener to buttons
  paletteBtn.addEventListener("click", () => {
    loadPaletteFromLibrary(paletteObj.colors);
    closeLibrary();
  });
  deletePaletteBtn.addEventListener("click", () => {
    //console.log(paletteIndex);
    paletteDiv.remove();
    const customArray = document.querySelectorAll(".custom-palette");
    if (customArray.length === 0) {
      displayLibraryMessage();
    }
    deleteFromStorage(paletteIndex);
  });

  // append to library div
  paletteDiv.appendChild(title);
  paletteDiv.appendChild(preview);
  paletteDiv.appendChild(paletteBtn);
  paletteDiv.appendChild(deletePaletteBtn);
  palettesContainer.appendChild(paletteDiv);
}

function saveToStorage(paletteObj) {
  let localPalettes;
  if (localStorage.getItem("palettes") === null) {
    localPalettes = [];
  } else {
    localPalettes = JSON.parse(localStorage.getItem("palettes"));
  }
  //console.log(localPalettes);
  localPalettes.push(paletteObj);
  localStorage.removeItem("palettes");
  localStorage.setItem("palettes", JSON.stringify(localPalettes));

  return localPalettes.length - 1;
}
function deleteFromStorage(paletteIndex) {
  // delete palette from local storage
  console.log(paletteIndex);
  let localPalettes;
  if (localStorage.getItem("palettes") === null) {
    localPalettes = [];
  } else {
    localPalettes = JSON.parse(localStorage.getItem("palettes"));
  }
  localPalettes.splice(paletteIndex, 1);
  console.log(localPalettes);
  localStorage.removeItem("palettes");
  localStorage.setItem("palettes", JSON.stringify(localPalettes));
}

function getPalettesFromStorage() {
  let localPalettes;
  if (localStorage.getItem("palettes") === null) {
    localPalettes = [];
  } else {
    localPalettes = JSON.parse(localStorage.getItem("palettes"));
  }

  localPalettes.forEach((palette, index) => {
    //console.log(palette);
    addPaletteToLibrary(palette, index);
  });
}

function loadPaletteFromLibrary(colorArray) {
  // load selected palette into initial colors
  // display selected palette
  //console.log(colorArray);
  initialColors = [];
  colorArray.forEach((color, index) => {
    initialColors.push(color);
    displayColor(colorDivs[index], color);
  });
  //console.log(initialColors);
  resetInputs();
}
function displayLibraryMessage() {
  // if message exists do nothing
  let msg = palettesContainer.querySelector("p");
  if (msg === null) {
    msg = document.createElement("p");
    msg.innerHTML = "<em>No palettes in library</em>";
    palettesContainer.appendChild(msg);
  }
}
function removeLibraryMessage() {
  // if message does not exist, do nothing
  const msg = palettesContainer.querySelector("p");
  if (msg != null) {
    msg.remove();
  }
}

function openLibrary() {
  const customArray = document.querySelectorAll(".custom-palette");
  if (customArray.length === 0) {
    displayLibraryMessage();
  } else {
    removeLibraryMessage();
  }

  const popup = libraryContainer.children[0];

  libraryContainer.classList.add("active");
  popup.classList.add(".active");
}
function closeLibrary() {
  const popup = libraryContainer.children[0];
  libraryContainer.classList.remove("active");
  popup.classList.remove(".active");
}
randomColors();
getPalettesFromStorage();
