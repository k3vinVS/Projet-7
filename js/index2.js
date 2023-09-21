// ------------------------------------- DOM ELEMENTS -------------------------------------
const title = document.querySelector(".text-center");
const inputSearch = document.getElementById("input-form");
const noResult = document.getElementById("no-result");
const cardSection = document.querySelector(".card-section");
let tagArray = [];
let recettes = [];
let tagRecettes = [];

// ------------------------------------- RECHARGE LA PAGE EN CLIQUANT SUR LE LOGO DU SITE -------------------------------------
title.addEventListener("click", () => {
  location.reload();
});
// -------------------------------------------------------------------------

// ---------------- TRI DES RECETTES AVEC METHODE "FILTER", EN FONCTION DE L'INPUT -----------------
function sortRecipesMethod(arrayOfItems, currentRecipeArray) {
  arrayOfItems.filter((itemSearch) => {
    let newArrayOfRecipes = [];

    currentRecipeArray.filter((recipe) => {
      const element = itemSearch
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const name = recipe.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const description = recipe.description
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const appliance = recipe.appliance
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const ustensil = recipe.ustensils
        .join()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const ingredient = recipe.ingredients;

      // console.log(ingredient);

      if (
        name.includes(element) ||
        description.includes(element) ||
        appliance.includes(element) ||
        ustensil.includes(element)
      ) {
        newArrayOfRecipes.push(recipe);
        // console.log(recettes);
      } else {
        // TRI DES INGREDIENTS DE CHAQUE RECETTE ------------------------------
        ingredient.filter((ing) => {
          if (
            ing.ingredient
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(element)
          ) {
            newArrayOfRecipes.push(recipe);
            // console.log(recettes);
          }
        });
      }
    });
    currentRecipeArray = [...newArrayOfRecipes];
  });
  recettes = [...currentRecipeArray];

  console.log(recettes);
  cardDisplay(recettes);

  // TRIE DES ELEMENTS DES DROPDOWNS + AFFICHAGE DES CARTES TRIEES AVEC TAGS ------
  sortDropdown(recettes);

  // TEXTE SI PAS DE RECETTES -----------------------------------------------------
  if (recettes.length === 0) {
    // console.log("pas de recettes");
    noResult.innerHTML = `<h4 class='text-center text-warning'>Aucune recette ne correspond à votre critère.</br> Vous pouvez
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
      sortRecipesMethod(tagArray, recipes);
    } else {
      tagArray[tagArray.length - 1] = inputValue;
      sortRecipesMethod(tagArray, recettes);
    }
  } else if (inputValue.length < 3) {
    console.log("pas d'input");
    tagArray.splice(inputValue, 1);
    sortRecipesMethod(tagArray, recipes);
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
