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
// -------------------------------------------------------------------------

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

// ---------------- TRI DES RECETTES AVEC BOUCLE "FOR", EN FONCTION DE L'INPUT -----------------
function sortRecipes(item, array) {
  array = [];

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

    // console.log(ustensil);

    if (
      name.includes(element) ||
      description.includes(element) ||
      appliance.includes(element) ||
      ustensil.includes(element)
    ) {
      array.push(recipes[i]);
      // console.log(recettes);
    } else {
      // TRI DES INGREDIENTS DE CHAQUE RECETTE ------------------------------
      for (let j = 0; j < ingredient.length; j++) {
        if (
          ingredient[j].ingredient
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(element)
        ) {
          array.push(recipes[i]);
          // console.log(recettes);
        }
      }
    }
  }
  console.log(array);
  cardDisplay(array);

  // TRIE DES ELEMENTS DES DROPDOWNS + AFFICHAGE DES CARTES TRIEES AVEC TAGS -----
  sortDropdown(array);

  // // SI INPUT VIDE ET TAGS SELECTIONNES, RAFRAICHIT LES DROPDOWNS ET LES RECETTES -----
  // if (inputSearch.value.length < 3 && tagRecettes.length !== 0) {
  //   cardDisplay(tagRecettes);
  //   sortDropdown(tagRecettes);
  //   console.log(tagRecettes);
  // } else if (inputSearch.value.length === 0) {
  //   dropdownItem();
  // }

  // TEXTE SI PAS DE RECETTES -------------------------------------------------------
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
    sortRecipes(inputSearch.value, recettes);
  } else {
    cardDisplay(recipes);
    dropdownItem();
  }
});
