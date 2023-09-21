// ----------------------- VISUEL DES CARTES DE RECETTES -------------------
function cardDisplay(recipes) {
  cardSection.innerHTML = recipes
    .map((recipe) => {
      const names = recipe.name;
      const time = recipe.time;
      const ingredients = recipe.ingredients;
      const description = recipe.description;
      //   const appliances = recipe.appliance;
      //   const ustensils = recipe.ustensils;
      let ingredientsArray = [];

      // console.log(description);

      for (let i = 0; i < ingredients.length; i++) {
        let ingredient = recipe.ingredients[i].ingredient;
        let quantity = recipe.ingredients[i].quantity;
        let unit = recipe.ingredients[i].unit;
        // console.log(unit);

        if (!quantity && !unit) {
          ingredientsArray.push(`<dd><strong>${ingredient}</strong></dd>`);
        } else if (!unit) {
          ingredientsArray.push(
            `<dd><strong>${ingredient}: </strong>${quantity}</dd>`
          );
        } else if (unit == "grammes") {
          let modifyUnit = (unit.textContent = "g");
          ingredientsArray.push(
            `<dd><strong>${ingredient}: </strong>${quantity}${modifyUnit}</dd>`
          );
        } else {
          ingredientsArray.push(
            `<dd><strong>${ingredient}: </strong>${quantity}${unit}</dd>`
          );
        }
      }

      return `
      <div class="col-12 col-lg-4">
            <div class="card mb-4 mb-lg-5 mr-0 border-0 shadow">
                <div class="card-img"></div>
                <div class="card-body rounded-bottom">
                  <div class="card-top">
                    <div class="row mb-1">
                      <div class="col-7">
                        <h6 class="card-title">${names}</h6>
                      </div>
                      <div class="col-5  d-flex justify-content-end">
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
                        <p class="mb-2 ml-1">${time} min</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 pr-0">
                      <ul class='text-ingredients pl-0'>${ingredientsArray.join(
                        ""
                      )}</ul>
                    </div>
                    <div class="col-6 text-description">
                      <p class="card-text">
                          ${description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      `;
    })
    .join("");
  noResult.innerHTML = "";
}

// --------------- AFFICHAGE DE TOUTES LES CARTES DE RECETTES + AFFICHAGE DES ELEMENTS DES DROPDOWNS --------------
cardDisplay(recipes);
dropdownItem();
