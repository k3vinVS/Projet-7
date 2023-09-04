const inputForm = document.getElementById("input-form");
const title = document.querySelector(".text-center");
const search = document.querySelector(".search");
const noResult = document.getElementById("no-result");


// console.log(search);

// Remets à zéro les cartes de recettes --------------------------------------------
title.addEventListener("click", () => {
  recipeCard(recipes);
});

// Efface l'input et conserve les cartes triées ------------------------------------
search.addEventListener("click", () => {
  inputForm.value = ""; // Remise à zéro de l'input
});

// INPUT RECIPES SEARCH -----------------------------------------------------------
function joinIngredient(array) {
  let ingredientList = [];
  array.filter((item) => ingredientList.push(item.ingredient));
  return ingredientList.join().toLowerCase();
}

// Fonction de tri des recettes de la variable 'recipes' --------------------------
function recherchePrincipale(listOfRecipes, searchItem) {
  let resultRecipe = listOfRecipes.filter(
    (recipe) =>
      recipe.name
        .toLowerCase() // Mets le texte en minuscule
        .normalize("NFD") // Normalise le texte pour le traitement des caractères spéciaux
        .replace(/[\u0300-\u036f]/g, "") // Complète le traitement du texte pour tri des mots en version non accentués
        .includes(
          searchItem // Texte entré dans l'input du formulaire
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        ) ||
      recipe.description
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          searchItem
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        ) ||
      recipe.appliance
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          searchItem
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        ) ||
      recipe.ustensils
        .join()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          searchItem
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        ) ||
      joinIngredient(recipe.ingredients)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          searchItem
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
  );
  // console.log(resultRecipe);
  return resultRecipe;
}

// Fonction de recherche de recettes à partir d'une entrée dans l'input du formulaire
function searchInputMeals() {
  if (inputForm.value.length > 2) {
    let searchItem = inputForm.value;
    let resultList = recherchePrincipale(recipes, searchItem);
    recipesArray = [...resultList];
    recipeCard(recipesArray);
    console.log(recipesArray);
  } else {
    recipeCard(recipes);
  }
}

inputForm.addEventListener("input", searchInputMeals);
// window.addEventListener('load', recipeCard(recipes));

// TAG RECIPES SEARCH
// Recherche des recettes grâce aux tags
function tagFilter(listOfRecipes, searchTag) {
  let resultTag = listOfRecipes.filter(
    (recipe) =>
      joinIngredient(recipe.ingredients).includes(searchTag) ||
      recipe.appliance.toLowerCase().includes(searchTag) ||
      recipe.ustensils.join().toLowerCase().includes(searchTag)
  );
  // console.log(searchTag);
  // console.log(resultTag);
  return resultTag;
}

// Tri les recettes en fonction des tags sélectionnés
function searchTagMeals(e) {
  let searchTag = tagArray;
  let resultTagList = tagFilter(recipes, searchTag);
  recipesArray = [...resultTagList];
  console.log(recipesArray);
  recipeCard(recipesArray);
}
