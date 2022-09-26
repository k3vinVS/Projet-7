// DOM ELEMENTS ------------------------------

const form = document.querySelector("form");
const inputForm = document.getElementById("search-input");
const searchButton = document.querySelector(".search");
const result = document.getElementById("result");

// ------------------------------ FETCH ------------------------------
async function fetchMeals() {
  await fetch("./recipes.json")
    .then((res) => res.json())
    .then((data) => (recipes = data.recipes))
    .catch((err) => console.log(err));

  // console.log(recipes);
  recipesDisplay();
}

// INPUT RECIPES SEARCH ------------------------------
function searchMeals(e) {
  // e.preventDefault();
  fetchMeals().then(() => searchTagMeals(e)); // Affiche les recettes triées par les tags
  fetchMeals().then(() => recipesDisplay()); // Affiche en temps réel les recettes

  // if (inputForm.value.length > 2) {
  //   fetchMeals().then(() => recipesDisplay()); // Affiche en temps réel les recettes
  //   // fetchMeals().then(() => searchInputMeals()); // Affiche les recettes triées de l'input
  // } else {
  //   fetchMeals().then(() => searchTagMeals(e)); // Affiche les recettes triées par les tags
  // }
}

// LOAD RECIPES ------------------------------
window.addEventListener("load", fetchMeals);

// INPUT SEARCH ------------------------------
inputForm.addEventListener("input", searchMeals);

// SEARCH FORM ------------------------------
// form.addEventListener('submit', searchMeals);

// INPUT SEARCH BUTTON ------------------------------
// searchButton.addEventListener('click', searchMeals);

// ANOTHER INPUT SEARCH --------------------------
// inputForm.addEventListener("input", (e) => {
//   let searchItem = e.target.value;
//   let resultList = recherchePrincipale(recipes, searchItem);
//   recipes = [...resultList];
//   recipesDisplay(recipes);
// });
