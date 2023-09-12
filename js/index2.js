// ------------------------------------- DOM ELEMENTS -------------------------------------
const title = document.querySelector(".text-center");
const searching = document.querySelector(".search");
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

// --------------------- EFFACE L'ENTREE DANS L'INPUT, CONSERVE LES CARTES TRIEES, EN CLIQUANT SUR LA LOUPE --------------------------
searching.addEventListener("click", (e) => {
  if (inputSearch.value.length < 3) {
    alert("Indiquer au moins 3 lettres pour trouver une recette");
    cardDisplay(recipes);
  } else {
    inputSearch.value = ""; // Remise à zéro de l'input
    // cardDisplay(recettes);
  }
});
// -------------------------------------------------------------------------

// ---------------- TRI DES RECETTES AVEC METHODE "FILTER", EN FONCTION DE L'INPUT -----------------
function sortRecipesMethod(item, array) {
  array = [];

  recipes.filter((recipe) => {
    const element = item
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
      array.push(recipe);
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
          array.push(recipe);
          // console.log(recettes);
        }
      });
    }
  });
  console.log(array);
  cardDisplay(array);

  // TRIE DES ELEMENTS DES DROPDOWNS + AFFICHAGE DES CARTES TRIEES AVEC TAGS ------
  sortDropdown(array);

  // SI INPUT VIDE ET TAGS SELECTIONNES, RAFRAICHIT LES DROPDOWNS ET LES RECETTES -----
  // if (inputSearch.value.length === 0 && tagRecettes.length !== 0) {
  //   cardDisplay(tagRecettes);
  //   sortDropdown(tagRecettes);
  //   // dropdownItem();
  // }

  // TEXTE SI PAS DE RECETTES -----------------------------------------------------
  if (array.length === 0) {
    // console.log("pas de recettes");
    noResult.innerHTML = `<h4 class='text-center text-warning'>Aucune recette ne correspond à votre critère.</br> Vous pouvez
    chercher « tarte aux pommes », « poisson », etc...</h4>`;
    cardSection.innerHTML = "";
  }
}

// RECHERCHE DES RECETTES AVEC LES ENTREES DANS L'INPUT -----
inputSearch.addEventListener("input", () => {
  // RECHERCHE DES RECETTES A PARTIR DE 3 CARACTERES -----
  if (inputSearch.value.length > 2) {
    sortRecipesMethod(inputSearch.value, recettes);
  } else {
    cardDisplay(recipes);
    dropdownItem();
  }
});
