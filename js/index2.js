// DOM -----------------------------------------------------------------------------
const inputForm = document.getElementById("input-form");
const title = document.querySelector(".text-center");
const search = document.querySelector(".search");
const noResult = document.getElementById("no-result");


// Remets à zéro les cartes de recettes --------------------------------------------
title.addEventListener("click", () => {
  recipeCard(recipes);
});

// Efface l'input et conserve les cartes triées ------------------------------------
search.addEventListener("click", () => {
  inputForm.value = ""; // Remise à zéro de l'input
});

// // INPUT RECIPES SEARCH ----------------------------------------------------------

// // Fonction de recherche de recettes à partir d'une entrée dans l'input du formulaire

function recherchePrincipale() {
  const arrayOfRecipes = []; // Attention à ne pas mettre la variable dans la boucle pour éviter d'avoir plusieurs tableau (une recette par tableau)
  const searchItem = inputForm.value;
  for (recipe of recipes) {
    // console.log(recipe.name);
    if (
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
    ) {
      // Si la comparaison est vraie (même nom de recette)
      arrayOfRecipes.push(recipe); // Ajoute les recettes triées dans le tableau
      console.log(arrayOfRecipes);
      // recipesArray = [...arrayOfRecipes];
      // console.log(recipesArray);
      recipeCard(arrayOfRecipes); // Affiche les cartes des recettes triées
    }
  }
}

// recherchePrincipale();

// // Ecoute l'input du formulaire et cherche les recettes associées -------------------
// inputForm.addEventListener("input", searchInputMeals);

// Ecoute de l'input ------------------------
inputForm.addEventListener("input", () => {
  // console.log(e.target.value);
  if (inputForm.value.length > 2 && recipesArray !== undefined) {
    // console.log("pas de recette");
    noResult.innerHTML = `<h4 class='text-center text-warning'>Aucune recette ne correspond à votre critère.</br> Vous pouvez
    chercher « tarte aux pommes », « poisson », etc...</h4>`;
    cardSection.innerHTML = "";
  }

  if (inputForm.value.length > 2) {
    // recipeSearch();
    recherchePrincipale();
  } else {
    recipeCard(recipes);
  }
});

// Fonction de tri des éléments présents dans les objets présents dans les tableaux d'ingrédients
function joinIngredient(array) {
  let ingredientList = [];
  array.filter((item) => ingredientList.push(item.ingredient));
  return ingredientList.join().toLowerCase();
}

// Fonction de tri des tableaux d'ustensiles ------------------------------------
function sortUstensil(array) {
  let ustensilList = [];
  array.filter((item) => ustensilList.push(item));
  return ustensilList.join().toLowerCase();
}

// Fonction de tri des recettes et tags en fonction des tags sélectionnés -----------
function recipeTagSearch() {
  for (recipe of recipes) {
    console.log(recipe);
  }
}

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
function getTag(e) {
  tagArray.push(e.target.textContent);
  searchTagMeals(tagArray);
  console.log(tagArray);
}

// function recipeSearch() {
//   const triRecette = []; // Attention à ne pas mettre la variable dans la boucle pour éviter d'avoir plusieurs tableau (une recette par tableau)
//   for (recipe of recipes) {
//     let recette = recipe.name
//       .toLowerCase()
//       .includes(inputForm.value.toLowerCase()); // Compare l'input avec les noms de recettes
//     let ingredientRecette = joinIngredient(recipe.ingredients).includes(
//       inputForm.value.toLowerCase()
//     );
//     let descriptionRecette = recipe.description
//       .toLowerCase()
//       .includes(inputForm.value.toLowerCase());
//     let applianceRecette = recipe.appliance
//       .toLowerCase()
//       .includes(inputForm.value.toLowerCase());
//     let ustensilRecette = sortUstensil(recipe.ustensils).includes(
//       inputForm.value.toLowerCase()
//     );
//     // console.log(ustensilRecette);

//     if (
//       recette ||
//       ingredientRecette ||
//       descriptionRecette ||
//       applianceRecette ||
//       ustensilRecette
//     ) {
//       // Si la comparaison est vraie (même nom de recette)
//       triRecette.push(recipe); // Ajoute les recettes triées dans le tableau
//       console.log(triRecette);
//       recipeCard(triRecette); // Affiche les cartes des recettes triées
//     }
//   }
// }
