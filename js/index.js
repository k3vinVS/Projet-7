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
}

// INPUT SEARCH ------------------------------
inputForm.addEventListener('input', (e) => {
  fetchMeals(e.target.value).then(() => recipesDisplay()); // Affiche en temps reel les recettes

  // if (e.target.selectionStart >= 3) {
  //   recipes.filter((recipe) => console.log(recipe.name.toLowerCase().includes(searchInput.value.toLowerCase())));
  //   console.log(e.target.value);
  // }
})

// SEARCH FORM ------------------------------
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchMeals().then(() => recipesDisplay());
})

// INPUT SEARCH BUTTON ------------------------------
searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  fetchMeals().then(() => recipesDisplay());
})
