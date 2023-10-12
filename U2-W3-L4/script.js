const myRow = document.getElementById("row");
const form = document.getElementById("form");
const searchInput = document.getElementById("search");
let firstSearch = "landscape";
let secondSearch = "nature";
// let functionTrack = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   functionTrack = true;

  searchAndChange();
});

const searchAndChange = () => {
  firstSearch = searchInput.value;
  const newDiv = document.querySelectorAll(".col-md-4");
  newDiv.forEach((el) => {
    el.innerHTML = "";
  });

  loadImages();
};
const searchAndChange2 = () => {
  secondSearch = searchInput.value;
  const newDiv = document.querySelectorAll(".col-md-4");
  newDiv.forEach((el) => {
    el.innerHTML = "";
  });

  loadSecondaryImages();
};

// FUNCTION HIDE BUTTON
const hideCards = (e) => {
  const card = e.target.closest(".col-md-4");
  card.remove();
};

// FIRST LOAD BUTTON
const loadImages = (e) => {
  fetch(`https://api.pexels.com/v1/search?query=${firstSearch}`, {
    headers: {
      Authorization: "nXKMS0XYxYyJH1V9cfndCd2Y8hGuJZlK0IfUT0KNS75Y94sDocsAFuSH",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("C'è stato un problema");
      }
    })
    .then((landscape) => {
      console.log(landscape);
      createElements(landscape);
    })
    .catch((err) => {
      console.log("Errore: ", err);
    });
};

// SECOND LOAD BUTTON
const loadSecondaryImages = (e) => {
  fetch(`https://api.pexels.com/v1/search?query=${secondSearch}`, {
    headers: {
      Authorization: "nXKMS0XYxYyJH1V9cfndCd2Y8hGuJZlK0IfUT0KNS75Y94sDocsAFuSH",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("C'è stato un problema");
      }
    })
    .then((nature) => {
      console.log(nature);
      createElements(nature);
    })
    .catch((err) => {
      console.log("Errore: ", err);
    });
};

// FUNCTION PER GENERARE LE CARDS
const createElements = (imgs) => {
  imgs.photos.forEach((el, index) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("col-md-4", "mb-3");

    newDiv.innerHTML = `    
      <div class="card mb-4 shadow-sm h-100">
        <img
          src="${el.src.landscape}"
          class="bd-placeholder-img card-img-top"
        />
        <div class="card-body">
          <h5 class="card-title">Immagine numero ${index + 1}</h5>
          <p class="card-text">
            Photographer: ${el.photographer}
          </p>
          <div
            class="d-flex justify-content-between align-items-center"
          >
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                onclick="hideCards(event)"
              >
                Hide
              </button>
            </div>
            <small class="text-muted">${el.id}</small>
          </div>
        </div>
      </div>
    `;
    myRow.appendChild(newDiv);
  });
};
