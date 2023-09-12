// ------------------------------------- DOM ELEMENTS -------------------------------------
const title = document.querySelector(".text-center");
const searching = document.querySelector(".search");
const inputSearch = document.getElementById("input-form");
const noResult = document.getElementById("no-result");
const cardSection = document.querySelector(".card-section");
const dropdownIngredientItem = document.querySelector(
  ".dropdown-ingredient-item"
);
const dropdownApplianceItem = document.querySelector(
  ".dropdown-appliance-item"
);
const dropdownUstensilItem = document.querySelector(".dropdown-ustensil-item");
const inputSearchDropdown = document.querySelectorAll(".input-search-dropdown");
const dropdownMenu = document.querySelectorAll(".dropdown-menu");
const tagSection = document.querySelector(".tag-section");
const dropdownBtn = document.querySelectorAll(".sort-button");
const textBtn = document.querySelectorAll(".search-text-button");
let tagArray = [];
let recettes = [];
// let tagRecettes;

// ------------------------------------- RECHARGE LA PAGE EN CLIQUANT SUR LE LOGO DU SITE -------------------------------------
title.addEventListener("click", () => {
  location.reload();
});
// -------------------------------------------------------------------------

// --------------------- EFFACE L'ENTREE DANS L'INPUT, CONSERVE LES CARTES TRIEES, EN CLIQUANT SUR LA LOUPE --------------------------
searching.addEventListener("click", (e) => {
  if (inputSearch.value.length < 3) {
    alert("Indiquer au moins 3 lettres pour trouver une recette");
    cardDisplay(recipes);
  } else {
    inputSearch.value = ""; // Remise à zéro de l'input
    cardDisplay(recettes);
  }
});
// -------------------------------------------------------------------------

// ---------------- TRI DES RECETTES AVEC BOUCLE "FOR", EN FONCTION DE L'INPUT -----------------
function sortRecipes(item, array) {
  array = [];
  // let tagRecettes = [];
  // console.log(item.textContent);

  // TRI DES RECETTES -------------------------------------
  for (let i = 0; i < recipes.length; i++) {
    const element = item
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const name = recipes[i].name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const description = recipes[i].description
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const appliance = recipes[i].appliance
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const ustensil = recipes[i].ustensils
      .join()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const ingredient = recipes[i].ingredients;

    // console.log(item);

    if (
      name.includes(element) ||
      description.includes(element) ||
      appliance.includes(element) ||
      ustensil.includes(element)
    ) {
      array.push(recipes[i]); // <---------------------------------------- A REMETTRE
      // console.log(array);
    } else {
      for (let j = 0; j < ingredient.length; j++) {
        if (
          ingredient[j].ingredient
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(element)
        ) {
          array.push(recipes[i]); // <---------------------------------------- A REMETTRE
          // console.log(recettes);
        }
      }
    }
  }
  console.log(array);
  cardDisplay(array);
}

// RECHERCHE DES RECETTES AVEC LES ENTREES DANS L'INPUT -----
inputSearch.addEventListener("input", () => {
  if (inputSearch.value.length > 2) {
    sortRecipes(inputSearch.value, recettes);
  }
});

// ------------------------------- AFFICHAGE DES ELEMENTS DU DROPDOWN -------------------------------
function dropdownItem() {
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

  for (let ingredient of ingredientsWithNoDouble) {
    dropdownIngredientItem.innerHTML += `<dd class='col sort-item'>${ingredient}</dd>`;

    // if (ingredientsWithNoDouble.includes(tagArray)) {
    //   console.log("test");
    // }

    // if (tagArray == ingredient) {
    //   console.log("test sortRecipe");
    //   sortRecipes();
    //   // sortRecipesMethod();
    // }
  }

  // ------------------------------ SORT APPLIANCE ------------------------------
  let allAppliances = recipes.reduce(
    (acc, curVal) => acc.concat(curVal.appliance.toLowerCase()),
    []
  );
  let appliancesWithNoDouble = [...new Set(allAppliances)];

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

  for (let ustensil of ustensilsWithNoDouble) {
    dropdownUstensilItem.innerHTML += `<dd class='col sort-item'>${ustensil}</dd>`;
    // console.log(ustensil);
  }
  // inputDropdown();
  // dropdownSearch(
  //   ingredientsWithNoDouble,
  //   appliancesWithNoDouble,
  //   ustensilsWithNoDouble
  // );
}
dropdownItem();

function tagItem(item) {
  item.addEventListener("click", (e) => {
    if (item === dropdownIngredientItem) {
      tagSection.innerHTML += displayTag(e, "#0069d9");
      tagArray.push(e.target.textContent);
    } else if (item === dropdownApplianceItem) {
      tagSection.innerHTML += displayTag(e, "#68d9a4");
      tagArray.push(e.target.textContent);
    } else {
      tagSection.innerHTML += displayTag(e, "#ed6454");
      tagArray.push(e.target.textContent);
    }
    console.log(e.target.textContent);
    console.log(tagArray);
    sortRecipes(e.target.textContent, tagArray);
    closingTag();
  });
}
tagItem(dropdownIngredientItem);
tagItem(dropdownApplianceItem);
tagItem(dropdownUstensilItem);

// ------------------------------- TAG MODELE -------------------------------
function displayTag(e, bgParent) {
  let divTagHtml = `
        <div
                class="tag text-center d-inline-flex justify-content-around align-items-center p-2 rounded"
                style="background-color: ${bgParent}"
              >
                ${e.target.textContent}
                <svg
                  class="align-middle close-tag"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                    fill="white"
                  />
                </svg>
              </div>
        `;
  return divTagHtml;
}

function closingTag() {
  // DOM ELEMENTS -------------------------------------
  const tagEl = document.querySelectorAll(".tag");
  const closeTag = document.querySelectorAll(".close-tag");

  for (let i = 0; i < closeTag.length; i++) {
    // console.log(tagEl[i]);
    closeTag[i].addEventListener("click", () => {
      tagEl[i].remove();
      tagArray.splice(i, 1);
      console.log(tagArray);

      if (tagArray.length === 0) {
        cardDisplay(recipes);
        dropdownItem();
      }
    });
  }
}
