// DOM ELEMENTS ------------------------------
const dropdownBtn = document.querySelectorAll(".sort-button");
const textBtn = document.querySelectorAll(".search-text-button");
const inputSearch = document.querySelectorAll(".input-search");
const dropdownMenu = document.querySelectorAll(".dropdown-menu");
const dropdownIngredientItem = document.querySelector(
  ".dropdown-ingredient-item"
);
const dropdownApplianceItem = document.querySelector(
  ".dropdown-appliance-item"
);
const dropdownUstensilItem = document.querySelector(".dropdown-ustensil-item");

// SORT BUTTONS CHOICE ------------------------------
dropdownBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    fetchMeals().then(() => dropdown());
  });
});

function dropdown() {
  // SORT INGREDIENTS ------------------------------
  let allIngredients = recipes.reduce(
    (acc, curVal) => acc.concat(curVal.ingredients),
    []
  );
  let ingredientInIngredients = allIngredients.reduce(
    (acc, curVal) => acc.concat(curVal.ingredient.toLowerCase()),
    []
  );
  let ingredientsWithNoDouble = new Set(ingredientInIngredients);

  dropdownIngredientItem.innerHTML = "";

  for (let ingredient of ingredientsWithNoDouble) {
    dropdownIngredientItem.innerHTML += `<dd class='col sort-item'>${ingredient}</dd>`;
  }

  inputSearch[0].onfocus = () => {
    dropdownMenu[0].style.display = "block";
    inputSearch[0].addEventListener("input", (e) => {
      const filteredIngredients = ingredientInIngredients.filter((ele, pos) => {
        return ingredientInIngredients.indexOf(ele) === pos;
      });
      const searchIngredient = e.target.value.toLowerCase().replace(/\s/g, " ");
      const filteredIng = filteredIngredients.filter((el) =>
        el.toLowerCase().includes(searchIngredient)
      );
      dropdownIngredientItem.innerHTML = "";

      for (ingredient of filteredIng) {
        dropdownIngredientItem.innerHTML += `<dd class='col-3 sort-item'>${ingredient}</dd>`;
        // console.log(ingredient);
      }
    });
  };

  // SORT APPLIANCE ------------------------------
  let allAppliances = recipes.reduce(
    (acc, curVal) => acc.concat(curVal.appliance.toLowerCase()),
    []
  );
  let applianceWithNoDouble = new Set(allAppliances);

  dropdownApplianceItem.innerHTML = "";

  for (let appliance of applianceWithNoDouble) {
    dropdownApplianceItem.innerHTML += `<dd class='col sort-item'>${appliance}</dd>`;
    // console.log(appliance);
  }

  inputSearch[1].onfocus = () => {
    dropdownMenu[1].style.display = "block";
    inputSearch[1].addEventListener("input", (e) => {
      const filteredAppliances = allAppliances.filter((ele, pos) => {
        return allAppliances.indexOf(ele) === pos;
      });
      const searchAppliance = e.target.value.toLowerCase().replace(/\s/g, "");
      const filteredApp = filteredAppliances.filter((el) =>
        el.toLowerCase().includes(searchAppliance)
      );
      // console.log(filteredApp);
      dropdownApplianceItem.innerHTML = "";

      for (appliance of filteredApp) {
        dropdownApplianceItem.innerHTML += `<dd class='col-3 sort-item'>${appliance}</dd>`;
        // console.log(ingredient);
      }
    });
  };

  // console.log(applianceWithNoDouble);

  // SORT USTENSILS ------------------------------
  let allUstensils = recipes.reduce(
    (acc, curVal) => acc.concat(curVal.ustensils),
    []
  );
  let lowerCaseUstensils = allUstensils.map((elm) => elm.toLowerCase());
  let ustensilsWithNoDouble = new Set(lowerCaseUstensils);

  dropdownUstensilItem.innerHTML = "";

  for (let ustensil of ustensilsWithNoDouble) {
    dropdownUstensilItem.innerHTML += `<dd class='col sort-item'>${ustensil}</dd>`;
    // console.log(ustensil);
  }

  inputSearch[2].onfocus = () => {
    dropdownMenu[2].style.display = "block";
    inputSearch[2].addEventListener("input", (e) => {
      const filteredUstensils = lowerCaseUstensils.filter((ele, pos) => {
        return lowerCaseUstensils.indexOf(ele) === pos;
      });
      const searchUstensils = e.target.value.toLowerCase().replace(/\s/g, "");
      const filteredUst = filteredUstensils.filter((el) =>
        el.toLowerCase().includes(searchUstensils)
      );
      // console.log(filteredApp);
      dropdownUstensilItem.innerHTML = "";

      for (ustensil of filteredUst) {
        dropdownUstensilItem.innerHTML += `<dd class='col-3 sort-item'>${ustensil}</dd>`;
        // console.log(ustensil);
      }
    });
  };

  // console.log(ustensilsWithNoDouble);

  //  DROPDOWN BUTTON ------------------------------
  inputFunction();
  // filterByIngredients(recipes, ingredient, appliance, ustensil);
}
dropdown();

// ------------------------------ DROPDOWN BUTTON ------------------------------
function inputFunction() {
  const btn = document.querySelectorAll(".sort-button");
  const textBtn = document.querySelectorAll(".search-text-button");
  const inputSearch = document.querySelectorAll(".input-search");

  // DROPDOWN INGREDIENT BUTTON------------------------------
  btn[0].onclick = () => {
    textBtn[0].textContent = "";
    inputSearch[0].style.display = "inline-block";
    inputSearch[0].style.border = "none";
    // console.log(inputSearch);
    if (inputSearch[0].style.display === "inline-block") {
      window.onclick = () => {
        inputSearch[0].style.display = "none";
        inputSearch[0].value = "";
        inputSearch[1].style.display = "none";
        inputSearch[2].style.display = "none";
        dropdownIngredientItem.innerHTML = "";
        dropdownApplianceItem.innerHTML = "";
        dropdownUstensilItem.innerHTML = "";
        textBtn[0].textContent = "Ingredients";
        textBtn[1].textContent = "Appareils";
        textBtn[2].textContent = "Ustensiles";
        dropdownMenu[0].style.display = "none";
        // console.log(textBtn);
      };
    }
  };

  // DROPDOWN APPLIANCE BUTTON------------------------------
  btn[1].onclick = () => {
    textBtn[1].textContent = "";
    inputSearch[1].style.display = "inline-block";
    inputSearch[1].style.border = "none";
    // console.log(inputSearch);
    if (inputSearch[1].style.display === "inline-block") {
      window.onclick = () => {
        inputSearch[0].style.display = "none";
        inputSearch[1].style.display = "none";
        inputSearch[1].value = "";
        inputSearch[2].style.display = "none";
        dropdownIngredientItem.innerHTML = "";
        dropdownApplianceItem.innerHTML = "";
        dropdownUstensilItem.innerHTML = "";
        textBtn[0].textContent = "Ingredients";
        textBtn[1].textContent = "Appareils";
        textBtn[2].textContent = "Ustensiles";
        dropdownMenu[1].style.display = "none";
        // console.log(textBtn);
      };
      // console.log('test input');
    }
  };

  // DROPDOWN USTENSILS BUTTON------------------------------
  btn[2].onclick = () => {
    textBtn[2].textContent = "";
    inputSearch[2].style.display === "inline-block";
    inputSearch[2].style.border = "none";
    // console.log(inputSearch);
    if ((inputSearch[2].style.display = "inline-block")) {
      window.onclick = () => {
        inputSearch[0].style.display = "none";
        inputSearch[1].style.display = "none";
        inputSearch[2].style.display = "none";
        inputSearch[2].value = "";
        dropdownIngredientItem.innerHTML = "";
        dropdownApplianceItem.innerHTML = "";
        dropdownUstensilItem.innerHTML = "";
        textBtn[0].textContent = "Ingredients";
        textBtn[1].textContent = "Appareils";
        textBtn[2].textContent = "Ustensiles";
        dropdownMenu[2].style.display = "none";
        // console.log(textBtn);
      };
      // console.log('test input');
    }
  };
}

// ADD TO TAG
function dropdownFilter(e, searchTag) {
  dropdownIngredientItem.addEventListener("click", (e) => {
    // console.log(e.target.textContent);
    // searchTag = e.target.innerHTML;
    tagSection.innerHTML += sortTag(e, "#0069d9");
    closeBtn();
    searchTagMeals(e);
    searchMeals(e);
    recipesDisplay(e);
    // tagFilter(e);
    // tagIngredientFilter(e);
  });

  dropdownApplianceItem.addEventListener("click", (e) => {
    // console.log(e.target.textContent);
    tagSection.innerHTML += sortTag(e, "#68d9a4");
    closeBtn();
    searchTagMeals(e);
    searchMeals(e);
    // tagFilter(e);
    // tagIngredientFilter(e);
  });

  dropdownUstensilItem.addEventListener("click", (e) => {
    // console.log(e.target.textContent);
    tagSection.innerHTML += sortTag(e, "#ed6454");
    closeBtn();
    searchTagMeals(e);
    searchMeals(e);
    // tagFilter(e);
    // tagIngredientFilter(e);
  });
}
dropdownFilter();

// function tagFilter(e) {
//   let searchTag = e.target.innerText;
//   let resultTag = recipes.filter(
//     (recipe) =>
//       joinIngredient(recipe.ingredients).includes(searchTag.toLowerCase()) ||
//       recipe.appliance.toLowerCase().includes(searchTag.toLowerCase()) ||
//       recipe.ustensils.join().toLowerCase().includes(searchTag.toLowerCase())
//   );
//   // console.log(searchTag);
//   console.log(resultTag);
//   // recipes = [...resultTag];
//   return resultTag;
// }
// tagFilter();

// dropdownIngredientItem.addEventListener("click", (e) => {
//   // console.log(e.target.innerText);
//   if(e.target.innerText === recipe.ingredients){
//     console.log('test tag ingredient');
//   }
// });
