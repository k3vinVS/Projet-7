// ------------------------------------- DOM ELEMENTS -------------------------------------
const title = document.querySelector(".text-center");
const searching = document.querySelector(".search");
const inputSearch = document.getElementById("input-form");
let tagArray = [];
let recettes;
let tagRecettes;

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
function sortRecipes() {
  recettes = [];
  tagRecettes = [];

  // TRI DES RECETTES -------------------------------------
  for (let i = 0; i < recipes.length; i++) {
    const searchValue = inputSearch.value
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
      name.includes(searchValue) ||
      description.includes(searchValue) ||
      appliance.includes(searchValue) ||
      ustensil.includes(searchValue)
    ) {
      recettes.push(recipes[i]);
      // console.log(recettes);
    } else {
      // TRI DES INGREDIENTS DE CHAQUE RECETTE ------------------------------
      for (let j = 0; j < ingredient.length; j++) {
        if (
          ingredient[j].ingredient
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(searchValue)
        ) {
          recettes.push(recipes[i]);
          // console.log(recettes);
        }
      }
    }

    // TRIE LES RECETTES EN FONCTION DES TAGS SELECTIONNES ------------------------
    for (tagArrayItem of tagArray) {
      tagArrayItem = tagArrayItem
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (
        name.includes(tagArrayItem) ||
        description.includes(tagArrayItem) ||
        appliance.includes(tagArrayItem) ||
        ustensil.includes(tagArrayItem)
      ) {
        tagRecettes.push(recipes[i]);
      } else {
        //   // TRI DES INGREDIENTS DE CHAQUE RECETTE ------------------------------
        for (let j = 0; j < ingredient.length; j++) {
          if (
            ingredient[j].ingredient
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(tagArrayItem)
          ) {
            tagRecettes.push(recipes[i]);
          }
        }
      }
    }
  }

  // RECHERCHE DES RECETTES A PARTIR DE 3 CARACTERES OU SI SELECTION D'UN TAG -----
  if (inputSearch.value.length < 3) {
    cardDisplay(recipes);
    // dropdownItem();
  } else if (inputSearch.value.length > 2) {
    cardDisplay(recettes);

    // TRIE DES ELEMENTS DES DROPDOWNS + AFFICHAGE DES CARTES TRIEES AVEC TAGS -----
    sortDropdown(recettes);
  }

  // SI INPUT VIDE, RAFRAICHIT LES DROPDOWNS -----
  if (inputSearch.value.length === 0) {
    cardDisplay(tagRecettes);
    dropdownItem();
  }

  // TEXTE SI PAS DE RECETTES -------------------------------------------------------
  if (recettes.length === 0) {
    // console.log("pas de recettes");
    noResult.innerHTML = `<h4 class='text-center text-warning'>Aucune recette ne correspond à votre critère.</br> Vous pouvez
    chercher « tarte aux pommes », « poisson », etc...</h4>`;
    cardSection.innerHTML = "";
  }

  console.log(recettes);
  console.log(tagRecettes);
}

inputSearch.addEventListener("input", sortRecipes); // Recherche des recettes à l'entrée d'un élément dans l'input ---

// const inputForm = document.getElementById("input-form");
// const title = document.querySelector(".text-center");
// const search = document.querySelector(".search");
// const noResult = document.getElementById("no-result");

// // console.log(search);

// // Remets à zéro les cartes de recettes --------------------------------------------
// title.addEventListener("click", () => {
//   recipeCard(recipes);
// });

// // Efface l'input et conserve les cartes triées ------------------------------------
// search.addEventListener("click", () => {
//   inputForm.value = ""; // Remise à zéro de l'input
// });

// // INPUT RECIPES SEARCH -----------------------------------------------------------
// function joinIngredient(array) {
//   let ingredientList = [];
//   array.filter((item) => ingredientList.push(item.ingredient));
//   return ingredientList.join().toLowerCase();
// }

// // Fonction de tri des recettes de la variable 'recipes' --------------------------
// function recherchePrincipale(listOfRecipes, searchItem) {
//   let resultRecipe = listOfRecipes.filter(
//     (recipe) =>
//       recipe.name
//         .toLowerCase() // Mets le texte en minuscule
//         .normalize("NFD") // Normalise le texte pour le traitement des caractères spéciaux
//         .replace(/[\u0300-\u036f]/g, "") // Complète le traitement du texte pour tri des mots en version non accentués
//         .includes(
//           searchItem // Texte entré dans l'input du formulaire
//             .toLowerCase()
//             .normalize("NFD")
//             .replace(/[\u0300-\u036f]/g, "")
//         ) ||
//       recipe.description
//         .toLowerCase()
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "")
//         .includes(
//           searchItem
//             .toLowerCase()
//             .normalize("NFD")
//             .replace(/[\u0300-\u036f]/g, "")
//         ) ||
//       recipe.appliance
//         .toLowerCase()
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "")
//         .includes(
//           searchItem
//             .toLowerCase()
//             .normalize("NFD")
//             .replace(/[\u0300-\u036f]/g, "")
//         ) ||
//       recipe.ustensils
//         .join()
//         .toLowerCase()
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "")
//         .includes(
//           searchItem
//             .toLowerCase()
//             .normalize("NFD")
//             .replace(/[\u0300-\u036f]/g, "")
//         ) ||
//       joinIngredient(recipe.ingredients)
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "")
//         .includes(
//           searchItem
//             .toLowerCase()
//             .normalize("NFD")
//             .replace(/[\u0300-\u036f]/g, "")
//         )
//   );
//   // console.log(resultRecipe);
//   return resultRecipe;
// }

// // Fonction de recherche de recettes à partir d'une entrée dans l'input du formulaire
// function searchInputMeals() {
//   if (inputForm.value.length > 2) {
//     let searchItem = inputForm.value;
//     let resultList = recherchePrincipale(recipes, searchItem);
//     recipesArray = [...resultList];
//     recipeCard(recipesArray);
//     console.log(recipesArray);
//   } else {
//     recipeCard(recipes);
//   }
// }

// inputForm.addEventListener("input", searchInputMeals);
// // window.addEventListener('load', recipeCard(recipes));

// // TAG RECIPES SEARCH
// // Recherche des recettes grâce aux tags
// function tagFilter(listOfRecipes, searchTag) {
//   let resultTag = listOfRecipes.filter(
//     (recipe) =>
//       joinIngredient(recipe.ingredients).includes(searchTag) ||
//       recipe.appliance.toLowerCase().includes(searchTag) ||
//       recipe.ustensils.join().toLowerCase().includes(searchTag)
//   );
//   // console.log(searchTag);
//   // console.log(resultTag);
//   return resultTag;
// }

// // Tri les recettes en fonction des tags sélectionnés
// function searchTagMeals(e) {
//   let searchTag = tagArray;
//   let resultTagList = tagFilter(recipes, searchTag);
//   recipesArray = [...resultTagList];
//   console.log(recipesArray);
//   recipeCard(recipesArray);
// }
