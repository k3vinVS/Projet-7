// ------------------------------------- DOM ELEMENTS -------------------------------------
const form = document.querySelector("form");
const title = document.querySelector(".text-center");
const inputSearch = document.getElementById("input-form");
const noResult = document.getElementById("no-result");
const cardSection = document.querySelector(".card-section");
let tagArray = [];
let recettes = [];
let tagRecettes = [];

// ------------------------------------- EMPÊCHE L'ENVOI DU FORMULAIRE -------------------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// ------------------------------------- RECHARGE LA PAGE EN CLIQUANT SUR LE LOGO DU SITE -------------------------------------
title.addEventListener("click", () => {
  location.reload();
});
// -------------------------------------------------------------------------

// ---------------- TRI DES RECETTES AVEC BOUCLE "FOR", EN FONCTION DE L'INPUT -----------------
function sortRecipes(arrayOfItems, currentRecipeArray) {
  for (let j = 0; j < arrayOfItems.length; j++) {
    let newArrayOfRecipes = [];

    // TRI DES RECETTES -------------------------------------
    for (let i = 0; i < currentRecipeArray.length; i++) {
      const element = arrayOfItems[j]
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const name = currentRecipeArray[i].name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const description = currentRecipeArray[i].description
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const appliance = currentRecipeArray[i].appliance
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const ustensil = currentRecipeArray[i].ustensils
        .join()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const ingredient = currentRecipeArray[i].ingredients;

      // console.log(ustensil);

      if (
        name.includes(element) ||
        description.includes(element) ||
        appliance.includes(element) ||
        ustensil.includes(element)
      ) {
        newArrayOfRecipes.push(currentRecipeArray[i]);
        // console.log(array);
      } else {
        // TRI DES INGREDIENTS DE CHAQUE RECETTE ------------------------------
        for (let k = 0; k < ingredient.length; k++) {
          if (
            ingredient[k].ingredient
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(element)
          ) {
            newArrayOfRecipes.push(currentRecipeArray[i]);
            // console.log(array);
          }
        }
      }
    }
    currentRecipeArray = [...newArrayOfRecipes];
  }
  recettes = [...currentRecipeArray];

  console.log(recettes);
  cardDisplay(recettes);

  // TRIE DES ELEMENTS DES DROPDOWNS + AFFICHAGE DES CARTES TRIEES AVEC TAGS -----
  sortDropdown(recettes);

  // TEXTE SI PAS DE RECETTES -------------------------------------------------------
  if (recettes.length === 0) {
    // console.log("pas de recette");
    noResult.innerHTML = `<h4 class='text-center text-warning'>Aucune recette ne contient '${inputSearch.value}'.</br> Vous pouvez
    chercher « tarte aux pommes », « poisson », etc...</h4>`;
    cardSection.innerHTML = "";
  }
}

// RECHERCHE DES RECETTES AVEC LES ENTREES DANS L'INPUT -----
inputSearch.addEventListener("input", () => {
  let inputValue = inputSearch.value;

  // RECHERCHE DES RECETTES A PARTIR DE 3 CARACTERES -----
  if (inputValue.length > 2) {
    if (tagArray.length == 0) {
      tagArray[0] = inputValue;
      sortRecipes(tagArray, recipes);
    } else {
      tagArray[tagArray.length - 1] = inputValue;
      sortRecipes(tagArray, recettes);
    }
  } else if (inputValue.length < 3) {
    console.log("pas d'input");
    tagArray.splice(inputValue, 1);
    sortRecipes(tagArray, recipes);
  }

  // Si input vide et aucun tag, remise à zéro des recettes et ce qui s'y rattache -----
  if (tagSection.lastElementChild === null && inputValue.length === 0) {
    tagArray = [];
    recettes = [];
    cardDisplay(recipes);
    dropdownIngredientItem.innerHTML = "";
    dropdownApplianceItem.innerHTML = "";
    dropdownUstensilItem.innerHTML = "";
    dropdownItem();
  }
  console.log(tagArray);
});
