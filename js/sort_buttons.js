// DOM ELEMENTS ------------------------------
const dropdownBtn = document.querySelectorAll(".sort-button");
const textBtn = document.querySelectorAll(".search-text-button");
const inputSearch = document.querySelectorAll(".input-search-dropdown");
const dropdownMenu = document.querySelectorAll(".dropdown-menu");
const dropdownIngredientItem = document.querySelector(
  ".dropdown-ingredient-item"
);
const dropdownApplianceItem = document.querySelector(
  ".dropdown-appliance-item"
);
const dropdownUstensilItem = document.querySelector(".dropdown-ustensil-item");
const tagArray = [];
const ingredientsArray = [];
const appliancesArray = [];
const ustensilsArray = [];

// SORT BUTTONS CHOICE ------------------------------
dropdownBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    recipeCard();
  });
});

function dropdown(e) {
  // ------------------------------ SORT INGREDIENTS ------------------------------
  let allIngredients = recipes.reduce(
    (acc, curVal) => acc.concat(curVal.ingredients),
    []
  );
  let ingredientInIngredients = allIngredients.reduce(
    (acc, curVal) => acc.concat(curVal.ingredient.toLowerCase()),
    []
  );

  let ingredientsWithNoDouble = [...new Set(ingredientInIngredients)];

  // console.log(ingredientsWithNoDouble);

  // dropdownIngredientItem.innerHTML = "";

  for (let ingredient of ingredientsWithNoDouble) {
    dropdownIngredientItem.innerHTML += `<dd class='col sort-item'>${ingredient}</dd>`;
  }

  // ------------------------------ SORT APPLIANCE ------------------------------
  let allAppliances = recipes.reduce(
    (acc, curVal) => acc.concat(curVal.appliance.toLowerCase()),
    []
  );
  let appliancesWithNoDouble = [...new Set(allAppliances)];

  // console.log(appliancesWithNoDouble);

  // dropdownApplianceItem.innerHTML = "";

  for (let appliance of appliancesWithNoDouble) {
    dropdownApplianceItem.innerHTML += `<dd class='col sort-item'>${appliance}</dd>`;
    // console.log(appliance);
  }

  // ------------------------------ SORT USTENSILS ------------------------------
  let allUstensils = recipes.reduce(
    (acc, curVal) => acc.concat(curVal.ustensils),
    []
  );
  let lowerCaseUstensils = allUstensils.map((elm) => elm.toLowerCase());

  let ustensilsWithNoDouble = [...new Set(lowerCaseUstensils)];

  // console.log(ustensilsWithNoDouble);

  // dropdownUstensilItem.innerHTML = "";

  for (let ustensil of ustensilsWithNoDouble) {
    dropdownUstensilItem.innerHTML += `<dd class='col sort-item'>${ustensil}</dd>`;
    // console.log(ustensil);
  }

  // INPUT DES BOUTONS DE TRI -----------------------------------------------------
  let resultat = "";

  // --------------------------- DROPDOWN INGREDIENTS -----------------------------
  inputSearch[0].onfocus = () => {
    dropdownMenu[0].style.display = "block";
    inputSearch[0].addEventListener("input", (e) => {
      if (inputSearch[0].value.length > 2) {
        // tableau des ingrédients
        let sortIngredient = () => {};
        const filteredIngredients = ingredientInIngredients.filter(
          (ele, pos) => {
            return ingredientInIngredients.indexOf(ele) === pos;
          }
        );
        const searchIngredient = e.target.value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        const filteredIng = filteredIngredients.filter((el) =>
          el
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchIngredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
        );
        // ingredientArray.push(filteredIng);

        // FILTRE LES INGREDIENTS EN FONCTION DE L'ENTREE DE L'INPUT -----------------
        if (filteredIng) {
          dropdownIngredientItem.innerHTML = "";
          console.log(filteredIng);
        }

        // AFFICHE LES INGREDIENTS TRIES CORRESPONDANTS A L'ENTREE DANS L'INPUT -----
        for (ingredient of filteredIng) {
          dropdownIngredientItem.innerHTML += `<dd class='col-3 sort-item'>${ingredient}</dd>`;
        }
      }
    });
  };

  // --------------------------- DROPDOWN APPLIANCES -----------------------------

  inputSearch[1].onfocus = () => {
    dropdownMenu[1].style.display = "block";
    inputSearch[1].addEventListener("input", (e) => {
      if (inputSearch[1].value.length > 2) {
        const filteredAppliances = allAppliances.filter((ele, pos) => {
          return allAppliances.indexOf(ele) === pos;
        });
        const searchAppliance = e.target.value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const filteredApp = filteredAppliances.filter((el) =>
          el
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchAppliance.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
        );
        // console.log(filteredApp);
        // dropdownApplianceItem.innerHTML = "";

        // FILTRE LES APPAREILS EN FONCTION DE L'ENTREE DE L'INPUT -----------------
        if (filteredApp) {
          dropdownApplianceItem.innerHTML = "";
          // dropdownIngredientItem.innerHTML = "";
          // dropdownUstensilItem.innerHTML = "";
        }

        // AFFICHE LES APPAREILS TRIES CORRESPONDANTS A L'ENTREE DANS L'INPUT -----
        for (appliance of filteredApp) {
          dropdownApplianceItem.innerHTML += `<dd class='col-3 sort-item'>${appliance}</dd>`;
          // console.log(ingredient);
        }
      }
    });
  };

  // --------------------------- DROPDOWN USTENSILS -----------------------------

  inputSearch[2].onfocus = () => {
    dropdownMenu[2].style.display = "block";
    inputSearch[2].addEventListener("input", (e) => {
      const filteredUstensils = lowerCaseUstensils.filter((ele, pos) => {
        return lowerCaseUstensils.indexOf(ele) === pos;
      });
      const searchUstensils = e.target.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const filteredUst = filteredUstensils.filter((el) =>
        el
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            searchUstensils.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          )
      );
      // console.log(filteredApp);
      // dropdownUstensilItem.innerHTML = "";

      // FILTRE LES USTENSILES EN FONCTION DE L'ENTREE DE L'INPUT -----------------
      if (filteredUst) {
        dropdownUstensilItem.innerHTML = "";
        // dropdownIngredientItem.innerHTML = "";
        // dropdownApplianceItem.innerHTML = "";
      }

      // AFFICHE LES USTENSILES TRIES CORRESPONDANTS A L'ENTREE DANS L'INPUT -----
      for (ustensil of filteredUst) {
        dropdownUstensilItem.innerHTML += `<dd class='col-3 sort-item'>${ustensil}</dd>`;
        // console.log(ustensil);
      }
    });
  };

  // console.log(ustensilsWithNoDouble);

  //  DROPDOWN BUTTON ------------------------------
  inputFunction();

  // TAG ARRAY ------------------------------
  filterTag();
}
dropdown();

function inputFunction() {
  const btn = document.querySelectorAll(".sort-button");
  const textBtn = document.querySelectorAll(".search-text-button");
  const inputSearch = document.querySelectorAll(".input-search-dropdown");
  const sortItem = document.querySelectorAll(".sort-item");

  for (let i = 0; i < btn.length; i++) {
    btn[i].onclick = () => {
      textBtn[i].innerText = "";
      inputSearch[i].style.display = "inline-block";
      inputSearch[i].style.border = "none";
      dropdownMenu[i].style.display = "block";
      window.onclick = () => {
        textButton();
        dropdownMenu[i].style.display = "none";
        // console.log("test dropdown");
      };
    };

    // A CHAQUE CLIQUE DISPARISTION DE L'INPUT DE RECHERCHE DES TAGS ----------
    dropdownMenu[i].onclick = () => {
      textButton();
    };

    // REMOVE INPUT SEARCH OF DROPDOWN BUTTONS ---------------------------------
    function textButton() {
      inputSearch[i].style.display = "none";
      inputSearch[i].value = "";

      if (btn[i].style.backgroundColor === "rgb(237, 100, 84)") {
        textBtn[i].textContent = "Ustensiles";
      } else if (btn[i].style.backgroundColor === "rgb(104, 217, 164)") {
        textBtn[i].textContent = "Appareils";
      } else {
        textBtn[i].textContent = "Ingredients";
      }
    }
    // -------------------------------------------------------------------------
  }
}

// PUSH THE TEXT INTO THE "tagArray"
function getTag(e) {
  // console.log(e.target.textContent);
  tagArray.push(e.target.textContent);
  searchTagMeals(tagArray);
  console.log(tagArray);
  let ingredientDropdown = recipesArray;
  console.log(ingredientDropdown);
  dropdownIngredientItem.innerHTML = `<dd class='col sort-item'>${ingredientDropdown}</dd>`;
}

// -----------------------------------------------------------------------------

// GET THE TEXT ON THE DROPDOWN INTO TAGS --------------------------------------
function filterTag() {
  const dropdownIngredientItem = document.getElementsByClassName(
    "dropdown-ingredient-item"
  );
  const dropdownApplianceItem = document.getElementsByClassName(
    "dropdown-appliance-item"
  );
  const dropdownUstensilItem = document.getElementsByClassName(
    "dropdown-ustensil-item"
  );
  for (i = 0; i < dropdownIngredientItem.length; i++) {
    dropdownIngredientItem[i].onclick = getTag;
  }
  for (j = 0; j < dropdownApplianceItem.length; j++) {
    dropdownApplianceItem[j].onclick = getTag;
  }
  for (k = 0; k < dropdownUstensilItem.length; k++) {
    dropdownUstensilItem[k].onclick = getTag;
  }
}
// filterTag();
// -----------------------------------------------------------------------------

// AFFICHAGE TAGS DE LA BONNE COULEUR EN FONCTION DE L'ELEMENT CHOISI (DROPDOWN)---
function tagSectionArray(item) {
  item.addEventListener("click", (e) => {
    if (item === dropdownIngredientItem) {
      tagSection.innerHTML += sortTag(e, "#0069d9");
    } else if (item === dropdownApplianceItem) {
      tagSection.innerHTML += sortTag(e, "#68d9a4");
    } else if (item === dropdownUstensilItem) {
      tagSection.innerHTML += sortTag(e, "#ed6454");
    }
    closeBtn();
    recipeCard();
    // dropdown();
    // searchTagMeals();
  });
}
tagSectionArray(dropdownIngredientItem);
tagSectionArray(dropdownApplianceItem);
tagSectionArray(dropdownUstensilItem);
// ----------------------------------------------------------------------------
