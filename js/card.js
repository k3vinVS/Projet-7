// DOM ELEMENTS
const cardSection = document.querySelector(".card-section");
// const tag = document.querySelector(".tag");
let recipes = [];

// ------------------------------ FUNCTIONS ------------------------------

// --------------------- SORT INPUT ---------------------

// Rassemble les ingredients d'une recette dans une string
function joinIngredient(array) {
  let ingredientList = [];
  array.map((item) => ingredientList.push(item.ingredient));
  return ingredientList.join().toLowerCase();
}

// Compare la liste des ingredients avec la recherche de l'input
function recherchePrincipale(listOfRecipes, searchItem) {
  let result = listOfRecipes.filter(
    (recipe) =>
      recipe.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          searchItem
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
  return result;
}

// Recherche des recettes grâce à l'input
function searchInputMeals() {
  let searchItem = inputForm.value;
  let resultList = recherchePrincipale(recipes, searchItem);
  recipes = [...resultList];
  // console.log(recipes);
  // recipesDisplay();
}

// --------------------- SORT TAG ---------------------

// Recherche des recettes grâce aux tags
function tagFilter(e, listOfRecipes, searchTag) {
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
  // console.log(searchTag);
  let resultTagList = tagFilter(e, recipes, searchTag);
  recipes = [...resultTagList];
  console.log(recipes);
  // recipesDisplay();
}

// ------------------------------ CARD FACTORY ------------------------------

// Affiche le resultat des recherches de recettes ou tag
function recipesDisplay(e) {
  if (inputForm.value.length > 2) {
    searchInputMeals();
    searchTagMeals();
  } else {
    searchTagMeals();
  }
  // console.log(recipes);

  // SEARCH RECIPES ---------------
  if (recipes !== undefined) {
    if (recipes.length == 0) {
      result.innerHTML = `<h4 class='text-center text-warning'>Aucune recette ne correspond à votre critère.</br> Vous pouvez
      chercher « tarte aux pommes », « poisson », etc...</h4>`;
      cardSection.innerHTML = "";
    } else if (recipes.length > 0) {
      cardSection.innerHTML = recipes
        .map((recipe) => {
          let ingredientsArray = [];
          let ingredients = recipe.ingredients;
          let appliances = recipe.appliance;
          let ustensils = recipe.ustensils;

          for (let i = 0; i < ingredients.length; i++) {
            let ingredient = recipe.ingredients[i].ingredient;
            let quantity = recipe.ingredients[i].quantity;
            let unit = recipe.ingredients[i].unit;

            if (!quantity && !unit) {
              ingredientsArray.push(`<dd><strong>${ingredient}</strong></dd>`);
            } else if (!unit) {
              ingredientsArray.push(
                `<dd><strong>${ingredient}: </strong>${quantity}</dd>`
              );
            } else {
              ingredientsArray.push(
                `<dd><strong>${ingredient}: </strong>${quantity}${unit}</dd>`
              );
            }
          }

          // console.log(ingredientsArray);

          return `
        <div class="col-12 col-lg-4">
          <div class="card mb-4 mb-lg-5 mr-0 border-0 shadow">
              <div class="card-img"></div>
              <div class="card-body rounded-bottom">
                <div class="card-top">
                  <div class="row mb-1">
                    <div class="col-8">
                      <h6 class="card-title">${recipe.name}</h6>
                    </div>
                    <div class="col-4 d-flex justify-content-end">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z"
                          fill="black"
                        />
                      </svg>
                      <p class="mb-2 ml-1">${recipe.time} min</p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 pr-0">
                    <ul class='text-ingredients pl-0'>${ingredientsArray.join(
                      ""
                    )}</ul>
                  </div>
                  <div class="col-6 pl-0 text-description">
                    <p class="card-text">
                        ${recipe.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        `;
        })
        .join("");
      result.innerHTML = "";
    }
  }
}
