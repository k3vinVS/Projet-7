// DOM ELEMENTS
const cardSection = document.querySelector('.card-section');
let recipes = [];


// ------------------------------ CARD FACTORY ------------------------------
function recipesDisplay() {
  let filterResults = recipes.filter((recipe) => recipe.name.toLowerCase().includes(inputForm.value.toLowerCase()));
  recipes = [...filterResults];
  console.log(recipes);

  if (recipes.length == 0) {
    result.innerHTML = `<h4 class='text-center text-warning'>Aucune recette ne correspond à votre critère.</br> Vous pouvez
    chercher « tarte aux pommes », « poisson », etc...</h4>`;
    cardSection.innerHTML = '';
  } else if (recipes.length > 0) {
    cardSection.innerHTML = filterResults.map((recipe) => {
      let ingredientsArray = [];
      let ingredients = recipe.ingredients;

      for (let i = 0; i < ingredients.length; i++) {
        let ingredient = recipe.ingredients[i].ingredient;
        let quantity = recipe.ingredients[i].quantity;
        let unit = recipe.ingredients[i].unit;

        if (!quantity && !unit) {
          ingredientsArray.push(`<dd><strong>${ingredient}</strong></dd>`);
        } else if (!unit) {
          ingredientsArray.push(`<dd><strong>${ingredient}: </strong>${quantity}</dd>`);
        } else {
          ingredientsArray.push(`<dd><strong>${ingredient}: </strong>${quantity}${unit}</dd>`);
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
                  <ul class='text-ingredients pl-0'>${ingredientsArray.join('')}</ul>
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
      `
    })
      .join("");
    result.innerHTML = '';
  }

};

