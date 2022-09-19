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
    recipesDisplay();
  });
});

function dropdown(e) {
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
      const searchIngredient = e.target.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const filteredIng = filteredIngredients.filter((el) =>
        el
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            searchIngredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          )
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
      const searchAppliance = e.target.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const filteredApp = filteredAppliances.filter((el) =>
        el
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            searchAppliance.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          )
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
      const searchUstensils = e.target.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const filteredUst = filteredUstensils.filter((el) =>
        el
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            searchUstensils.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          )
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

  // TAG ARRAY ------------------------------
  filterTag();
}
dropdown();

// ------------------------------ DROPDOWN BUTTON ------------------------------
function inputFunction() {
  const btn = document.querySelectorAll(".sort-button");
  const textBtn = document.querySelectorAll(".search-text-button");
  const inputSearch = document.querySelectorAll(".input-search");

  for (let i = 0; i < btn.length; i++) {
    btn[i].onclick = () => {
      textBtn[i].innerText = "";
      inputSearch[i].style.display = "inline-block";
      inputSearch[i].style.border = "none";
    };

    btn[i].onblur = () => {
      // dropdownMenu[i].style.display = "none";
      inputSearch[i].style.display = "none";
      inputSearch[i].value = "";

      if (btn[i].style.backgroundColor === "") {
        textBtn[i].textContent = "Ingredients";
      } else if (btn[i].style.backgroundColor === "rgb(104, 217, 164)") {
        textBtn[i].textContent = "Appareils";
      } else {
        textBtn[i].textContent = "Ustensiles";
      }
    };
  }
}

// DROPDOWNMENU TO TAG
let tagArray = [];

// PUSH THE TEXT INTO AN ARRAY
function getTag(e) {
  tagArray.push(e.target.textContent);
  console.log(tagArray);
}

// GET THE TEXT ON THE DROPDOWN
function filterTag() {
  const dropdownIngredientItem = document.getElementsByClassName(
    "dropdown-ingredient-item"
  );
  const dropdownApplianceItem = document.getElementsByClassName(
    "dropdown-appliance-item"
  );
  const dropdownUstensilItem = document.getElementsByClassName(
    "dropdown-ustensil-item"
  );
  for (i = 0; i < dropdownIngredientItem.length; i++) {
    dropdownIngredientItem[i].onclick = getTag;
  }
  for (j = 0; j < dropdownApplianceItem.length; j++) {
    dropdownApplianceItem[j].onclick = getTag;
  }
  for (k = 0; k < dropdownUstensilItem.length; k++) {
    dropdownUstensilItem[k].onclick = getTag;
  }
}
// filterTag();

function tagSectionArray(item) {
  item.addEventListener("click", (e) => {
    if (item === dropdownIngredientItem) {
      tagSection.innerHTML += sortTag(e, "#0069d9");
    } else if (item === dropdownApplianceItem) {
      tagSection.innerHTML += sortTag(e, "#68d9a4");
    } else if (item === dropdownUstensilItem) {
      tagSection.innerHTML += sortTag(e, "#ed6454");
    }
    closeBtn();
    searchMeals(e);
  });
}
tagSectionArray(dropdownIngredientItem);
tagSectionArray(dropdownApplianceItem);
tagSectionArray(dropdownUstensilItem);

// REMINDER ----------------------
// function dropdownFilter() {
//   dropdownIngredientItem.addEventListener("click", (e) => {
//     // console.log(e.target.textContent);
//     // searchTag = e.target.innerHTML;
//     tagSection.innerHTML += sortTag(e, "#0069d9");
//     closeBtn();
//     searchMeals(e);
//   });

//   dropdownApplianceItem.addEventListener("click", (e) => {
//     // console.log(e.target.textContent);
//     tagSection.innerHTML += sortTag(e, "#68d9a4");
//     closeBtn();
//     searchMeals(e);
//   });

//   dropdownUstensilItem.addEventListener("click", (e) => {
//     // console.log(e.target.textContent);
//     tagSection.innerHTML += sortTag(e, "#ed6454");
//     console.log(tagSection.innerText);
//     closeBtn();
//     searchMeals(e);
//   });
// }
// dropdownFilter();

// DROPDOWN INGREDIENT BUTTON------------------------------
// btn[0].onclick = (e) => {
//   if (inputSearch[0].style.display === "inline-block") {
//     window.onclick = () => {
//       inputSearch[0].style.display = "none";
//       inputSearch[0].value = "";
//       inputSearch[1].style.display = "none";
//       inputSearch[2].style.display = "none";
//       dropdownIngredientItem.innerHTML = "";
//       dropdownApplianceItem.innerHTML = "";
//       dropdownUstensilItem.innerHTML = "";
//       textBtn[0].textContent = "Ingredients";
//       textBtn[1].textContent = "Appareils";
//       textBtn[2].textContent = "Ustensiles";
//       dropdownMenu[0].style.display = "none";
//       // console.log(textBtn);
//     };
//   }
// };

// DROPDOWN APPLIANCE BUTTON------------------------------
// btn[1].onclick = () => {
//   if (inputSearch[1].style.display === "inline-block") {
//     window.onclick = () => {
//       inputSearch[0].style.display = "none";
//       inputSearch[1].style.display = "none";
//       inputSearch[1].value = "";
//       inputSearch[2].style.display = "none";
//       dropdownIngredientItem.innerHTML = "";
//       dropdownApplianceItem.innerHTML = "";
//       dropdownUstensilItem.innerHTML = "";
//       textBtn[0].textContent = "Ingredients";
//       textBtn[1].textContent = "Appareils";
//       textBtn[2].textContent = "Ustensiles";
//       dropdownMenu[1].style.display = "none";
//       // console.log(textBtn);
//     };
//     // console.log('test input');
//   }
// };

// DROPDOWN USTENSILS BUTTON------------------------------
// btn[2].onclick = () => {
//   if ((inputSearch[2].style.display = "inline-block")) {
//     window.onclick = () => {
//       inputSearch[0].style.display = "none";
//       inputSearch[1].style.display = "none";
//       inputSearch[2].style.display = "none";
//       inputSearch[2].value = "";
//       dropdownIngredientItem.innerHTML = "";
//       dropdownApplianceItem.innerHTML = "";
//       dropdownUstensilItem.innerHTML = "";
//       textBtn[0].textContent = "Ingredients";
//       textBtn[1].textContent = "Appareils";
//       textBtn[2].textContent = "Ustensiles";
//       dropdownMenu[2].style.display = "none";
//       // console.log(textBtn);
//     };
//     // console.log('test input');
//   }
// };
