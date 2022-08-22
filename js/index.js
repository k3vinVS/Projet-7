// DOM ELEMENTS ------------------------------

const form = document.querySelector('form');
const inputForm = document.getElementById('search-input');
const searchButton = document.querySelector('.search');
const result = document.getElementById('result');


// ------------------------------ FETCH ------------------------------
async function fetchMeals() {
  await fetch('./recipes.json')
    .then((res) => res.json())
    .then((data) => (recipes = data.recipes))
    .catch((err) => console.log(err))

  // console.log(recipes);
  recipesDisplay();
}

// INPUT RECIPES SEARCH ------------------------------
function searchMeals(e) {
  e.preventDefault();
  if (inputForm.value.length >= 3) {
    fetchMeals(e.target.value).then(() => recipesDisplay()); // Affiche en temps reel les recettes
    
  } else if (inputForm.value.length === 0) {
    fetchMeals();
  }
}

// LOAD RECIPES ------------------------------
window.addEventListener('load', fetchMeals);

// INPUT SEARCH ------------------------------
inputForm.addEventListener('input', searchMeals);

// SEARCH FORM ------------------------------
// form.addEventListener('submit', searchMeals);

// INPUT SEARCH BUTTON ------------------------------
// searchButton.addEventListener('click', searchMeals);

