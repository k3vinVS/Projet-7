// --------------------------------- DOM ----------------------------------
const inputSearch = document.getElementById("input-form");
const title = document.querySelector(".text-center");
const searching = document.querySelector(".search");
const tagSection = document.querySelector(".tag-section");
const noResult = document.getElementById("no-result");
const cardSection = document.querySelector(".card-section");
const dropdownBtn = document.querySelectorAll(".sort-button");
const textBtn = document.querySelectorAll(".search-text-button");
const inputSearchDropdown = document.querySelectorAll(".input-search-dropdown");
const dropdownMenu = document.querySelectorAll(".dropdown-menu");
const dropdownIngredientItem = document.querySelector(
  ".dropdown-ingredient-item"
);
const dropdownApplianceItem = document.querySelector(
  ".dropdown-appliance-item"
);
const dropdownUstensilItem = document.querySelector(".dropdown-ustensil-item");
let tagArray = [];
let recettes;
let tagRecettes;

// Remets à zéro les cartes de recettes en cliquant sur le logo du site --------------------------------------------
title.addEventListener("click", () => {
  location.reload();
});

// En cliquant sur la loupe de l'input, efface l'input et conserve les cartes triées ------------------------------------
searching.addEventListener("click", (e) => {
  if (inputSearch.value.length < 3) {
    alert("Indiquer au moins 3 lettres pour trouver une recette");
    cardDisplay(recipes);
  } else {
    inputSearch.value = ""; // Remise à zéro de l'input
    cardDisplay(recettes);
  }
});

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

// --------------- AFFICHAGE DE TOUTES LES CARTES DE RECETTES --------------
cardDisplay(recipes);
dropdownItem();

// ---------------- TRI DES RECETTES EN FONCTION DE L'INPUT -----------------
function sortRecipes() {
  recettes = [];
  tagRecettes = [];

  // TRI DES RECETTES -------------------------------------
  for (let i = 0; i < recipes.length; i++) {
    const searchValue = inputSearch.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const name = recipes[i].name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const description = recipes[i].description
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const appliance = recipes[i].appliance
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const ustensil = recipes[i].ustensils
      .join()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const ingredient = recipes[i].ingredients;

    // console.log(ustensil);

    if (
      name.includes(searchValue) ||
      description.includes(searchValue) ||
      appliance.includes(searchValue) ||
      ustensil.includes(searchValue)
    ) {
      recettes.push(recipes[i]);
      // console.log(recettes);
    } else {
      // TRI DES INGREDIENTS DE CHAQUE RECETTE ------------------------------
      for (let j = 0; j < ingredient.length; j++) {
        if (
          ingredient[j].ingredient
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(searchValue)
        ) {
          recettes.push(recipes[i]);
          // console.log(recettes);
        }
      }
    }

    // TRIE LES RECETTES EN FONCTION DES TAGS SELECTIONNES ------------------------
    for (tagArrayItem of tagArray) {
      tagArrayItem = tagArrayItem
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (
        name.includes(tagArrayItem) ||
        description.includes(tagArrayItem) ||
        appliance.includes(tagArrayItem) ||
        ustensil.includes(tagArrayItem)
      ) {
        tagRecettes.push(recipes[i]);
      } else {
        //   // TRI DES INGREDIENTS DE CHAQUE RECETTE ------------------------------
        for (let j = 0; j < ingredient.length; j++) {
          if (
            ingredient[j].ingredient
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(tagArrayItem)
          ) {
            tagRecettes.push(recipes[i]);
          }
        }
      }
    }
  }

  
  // RECHERCHE DES RECETTES A PARTIR DE 3 CARACTERES OU SI SELECTION D'UN TAG -----
  if (inputSearch.value.length < 3) {
    cardDisplay(recipes);
  } else if (inputSearch.value.length > 2) {
    cardDisplay(recettes);
    
    // TRIE DES ELEMENTS DES DROPDOWNS + AFFICHAGE DES CARTES TRIEES AVEC TAGS -------
    sortDropdown(recettes);
  }
  
  // TEXTE SI PAS DE RECETTES -------------------------------------------------------
  if (recettes.length === 0) {
    console.log("pas de recettes");
    noResult.innerHTML = `<h4 class='text-center text-warning'>Aucune recette ne correspond à votre critère.</br> Vous pouvez
    chercher « tarte aux pommes », « poisson », etc...</h4>`;
    cardSection.innerHTML = "";
  }

  console.log(recettes);
  console.log(tagRecettes);
}

inputSearch.addEventListener("input", sortRecipes);

// ---------------- TRI DES RECETTES AVEC METHODE "FILTER" -----------------
function sortRecipesMethod() {
  recettes = [];
  tagRecettes = [];

  recipes.filter((recipe) => {
    const searchValue = inputSearch.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const name = recipe.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const description = recipe.description
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const appliance = recipe.appliance
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const ustensil = recipe.ustensils
      .join()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const ingredient = recipe.ingredients;

    // console.log(ingredient);

    if (
      name.includes(searchValue) ||
      description.includes(searchValue) ||
      appliance.includes(searchValue) ||
      ustensil.includes(searchValue)
    ) {
      recettes.push(recipe);
      // console.log(recettes);
    } else {
      // TRI DES INGREDIENTS DE CHAQUE RECETTE ------------------------------
      ingredient.filter((ing) => {
        if (
          ing.ingredient
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(searchValue)
        ) {
          recettes.push(recipe);
          // console.log(recettes);
        }
      });
    }

    // TRIE LES RECETTES EN FONCTION DES TAGS SELECTIONNES ------------------------
    tagArray.filter((tag) => {
      tag = tag
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      if (
        name.includes(tag) ||
        description.includes(tag) ||
        appliance.includes(tag) ||
        ustensil.includes(tag)
      ) {
        tagRecettes.push(recipe);
        // console.log(tagRecettes);
      } else {
        //   // TRI DES INGREDIENTS DE CHAQUE RECETTE ------------------------------
        ingredient.filter((ing) => {
          if (
            ing.ingredient
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(tag)
          ) {
            tagRecettes.push(recipe);
            // console.log(tagRecettes);
          }
        });
      }
    });
  });

  // RECHERCHE DES RECETTES A PARTIR DE 3 CARACTERES OU SI SELECTION D'UN TAG -----
  if (inputSearch.value.length < 3) {
    cardDisplay(recipes);
  } else if (inputSearch.value.length > 2) {
    cardDisplay(recettes);
  }

  // TEXTE SI PAS DE RECETTES -----------------------------------------------------
  if (recettes.length === 0) {
    // console.log("pas de recettes");
    noResult.innerHTML = `<h4 class='text-center text-warning'>Aucune recette ne correspond à votre critère.</br> Vous pouvez
    chercher « tarte aux pommes », « poisson », etc...</h4>`;
    cardSection.innerHTML = "";
  }

  // TRIE DES ELEMENTS DES DROPDOWNS + AFFICHAGE DES CARTES TRIEES AVEC TAGS ------
  sortDropdown(recettes);

  console.log(recettes);
  console.log(tagRecettes);
}
// inputSearch.addEventListener("input", sortRecipesMethod);

// ------------------------------- TAGS MODEL -------------------------------
function displayTag(e, bgParent) {
  let divTagHtml = `
        <div
                class="tag text-center d-inline-flex justify-content-around align-items-center p-2 rounded"
                style="background-color: ${bgParent}"
              >
                ${e.target.textContent}
                <svg
                  class="align-middle close-tag"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                    fill="white"
                  />
                </svg>
              </div>
        `;
  return divTagHtml;
}

function closeBtn() {
  const tagEl = document.querySelectorAll(".tag");
  const closeTag = document.querySelectorAll(".close-tag");

  for (let i = 0; i < closeTag.length; i++) {
    closeTag[i].addEventListener("click", (e) => {
      // console.log(i);
      tagEl[i].remove();
      tagArray.splice(tagEl[i], 1);
      // tagArray.splice(i, 1);
      console.log(tagArray);

      // Mettre a jour la liste des recettes -------------------------------
      sortRecipes();
      sortDropdown(tagRecettes);

      if (tagArray.length === 0) {
        cardDisplay(recipes);
        dropdownItem();
      }
    });
  }
}

// AFFICHAGE DES ELEMENTS DU DROPDOWN (TAGS) -------------------------------
function dropdownItem() {
  // ------------------------------ SORT INGREDIENTS ------------------------------
  let allIngredients = recipes.reduce(
    (acc, curVal) => acc.concat(curVal.ingredients),
    []
  );
  let ingredientInIngredients = allIngredients.reduce(
    (acc, curVal) => acc.concat(curVal.ingredient.toLowerCase()),
    []
  );

  let ingredientsWithNoDouble = [...new Set(ingredientInIngredients)];

  for (let ingredient of ingredientsWithNoDouble) {
    dropdownIngredientItem.innerHTML += `<dd class='col sort-item'>${ingredient}</dd>`;

    // if (ingredientsWithNoDouble.includes(tagArray)) {
    //   console.log("test");
    // }

    // if (tagArray == ingredient) {
    //   console.log("test sortRecipe");
    //   sortRecipes();
    //   // sortRecipesMethod();
    // }
  }

  // ------------------------------ SORT APPLIANCE ------------------------------
  let allAppliances = recipes.reduce(
    (acc, curVal) => acc.concat(curVal.appliance.toLowerCase()),
    []
  );
  let appliancesWithNoDouble = [...new Set(allAppliances)];

  for (let appliance of appliancesWithNoDouble) {
    dropdownApplianceItem.innerHTML += `<dd class='col sort-item'>${appliance}</dd>`;
    // console.log(appliance);
  }

  // ------------------------------ SORT USTENSILS ------------------------------
  let allUstensils = recipes.reduce(
    (acc, curVal) => acc.concat(curVal.ustensils),
    []
  );

  let lowerCaseUstensils = allUstensils.map((elm) => elm.toLowerCase());

  let ustensilsWithNoDouble = [...new Set(lowerCaseUstensils)];

  for (let ustensil of ustensilsWithNoDouble) {
    dropdownUstensilItem.innerHTML += `<dd class='col sort-item'>${ustensil}</dd>`;
    // console.log(ustensil);
  }
  inputDropdown();
  dropdownSearch(
    ingredientsWithNoDouble,
    appliancesWithNoDouble,
    ustensilsWithNoDouble
  );
}

// RECHERCHE AVEC LES INPUTS DES DROPDOWNS ------------------------------------------
function dropdownSearch(
  ingredientsWithNoDouble,
  appliancesWithNoDouble,
  ustensilsWithNoDouble
) {
  // --------------------------- DROPDOWN INGREDIENTS -----------------------------
  inputSearchDropdown[0].onfocus = () => {
    dropdownMenu[0].style.display = "block";
    inputSearchDropdown[0].addEventListener("input", (e) => {
      if (inputSearchDropdown[0].value.length > 2) {
        const filteredIng = ingredientsWithNoDouble.filter((el) =>
          el
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              e.target.value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        );
        // FILTRE LES INGREDIENTS EN FONCTION DE L'ENTREE DE L'INPUT -----------------
        dropdownIngredientItem.innerHTML = "";
        // if (filteredIng) {
        //   console.log(filteredIng);
        // }

        // AFFICHE LES INGREDIENTS TRIES CORRESPONDANTS A L'ENTREE DANS L'INPUT -----
        for (ingredient of filteredIng) {
          dropdownIngredientItem.innerHTML += `<dd class='col-3 sort-item'>${ingredient}</dd>`;
          // console.log(filteredIng);
        }
      } else {
        dropdownIngredientItem.innerHTML = "";
        dropdownItem();
      }
    });
  };
  // inputSearchDropdown[0].onblur = () => {
  //   dropdownIngredientItem.innerHTML = "";
  //   dropdownIngredientItem.innerHTML += `<dd class='col-3 sort-item'>${tagArray.ingredient}</dd>`;

  //   // dropdownItem();
  // };

  // --------------------------- DROPDOWN APPLIANCES -----------------------------

  inputSearchDropdown[1].onfocus = () => {
    dropdownMenu[1].style.display = "block";
    inputSearchDropdown[1].addEventListener("input", (e) => {
      if (inputSearchDropdown[1].value.length > 2) {
        const filteredApp = appliancesWithNoDouble.filter((el) =>
          el
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              e.target.value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        );

        // FILTRE LES APPAREILS EN FONCTION DE L'ENTREE DE L'INPUT -----------------
        dropdownApplianceItem.innerHTML = "";
        // if (filteredApp) {
        // }

        // AFFICHE LES APPAREILS TRIES CORRESPONDANTS A L'ENTREE DANS L'INPUT -----
        for (appliance of filteredApp) {
          dropdownApplianceItem.innerHTML += `<dd class='col-3 sort-item'>${appliance}</dd>`;
          // console.log(filteredApp);
        }
      } else {
        dropdownApplianceItem.innerHTML = "";
        dropdownItem();
      }
    });
  };
  // inputSearchDropdown[1].onblur = () => {
  //   dropdownItem();
  // };

  // --------------------------- DROPDOWN USTENSILS -----------------------------

  inputSearchDropdown[2].onfocus = () => {
    dropdownMenu[2].style.display = "block";
    inputSearchDropdown[2].addEventListener("input", (e) => {
      if (inputSearchDropdown[2].value.length > 2) {
        const filteredUst = ustensilsWithNoDouble.filter((el) =>
          el
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              e.target.value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        );

        // FILTRE LES USTENSILES EN FONCTION DE L'ENTREE DE L'INPUT -----------------
        dropdownUstensilItem.innerHTML = "";
        // if (filteredUst) {
        // }

        // AFFICHE LES USTENSILES TRIES CORRESPONDANTS A L'ENTREE DANS L'INPUT -----
        for (ustensil of filteredUst) {
          dropdownUstensilItem.innerHTML += `<dd class='col-3 sort-item'>${ustensil}</dd>`;
          // console.log(filteredUst);
        }
      } else {
        dropdownUstensilItem.innerHTML = "";
        dropdownItem();
      }
    });
  };
  // inputSearchDropdown[2].onblur = () => {
  //   dropdownItem();
  // };
}

// AFFICHAGE DES BOUTONS DE TRI (COULEURS,...) + INPUTs DE CHAQUE BOUTONS -----------
function inputDropdown() {
  // const btn = document.querySelectorAll(".sort-button");
  // const textBtn = document.querySelectorAll(".search-text-button");
  // const inputSearch = document.querySelectorAll(".input-search-dropdown");

  for (let i = 0; i < dropdownBtn.length; i++) {
    dropdownBtn[i].onclick = () => {
      textBtn[i].innerText = "";
      inputSearchDropdown[i].style.display = "inline-block";
      inputSearchDropdown[i].style.border = "none";
      dropdownMenu[i].style.display = "block";
      window.onclick = () => {
        textButton();
        dropdownMenu[i].style.display = "none";
        // console.log("test dropdown");
      };
    };

    // A CHAQUE CLIQUE DISPARISTION DE L'INPUT DE RECHERCHE DES TAGS ----------
    dropdownMenu[i].onclick = () => {
      textButton();
    };

    // REMOVE INPUT SEARCH OF DROPDOWN BUTTONS ---------------------------------
    function textButton() {
      inputSearchDropdown[i].style.display = "none";
      inputSearchDropdown[i].value = "";
      if (dropdownBtn[i].style.backgroundColor === "rgb(237, 100, 84)") {
        textBtn[i].textContent = "Ustensiles";
      } else if (
        dropdownBtn[i].style.backgroundColor === "rgb(104, 217, 164)"
      ) {
        textBtn[i].textContent = "Appareils";
      } else {
        textBtn[i].textContent = "Ingredients";
      }
    }
  }
}

// AFFICHAGE TAGS DE LA BONNE COULEUR EN FONCTION DE L'ELEMENT CHOISI (DROPDOWN) ----
function tagSectionArray(item) {
  item.addEventListener("click", (e) => {
    if (item === dropdownIngredientItem) {
      tagSection.innerHTML += displayTag(e, "#0069d9");
      tagArray.push(e.target.textContent);
    } else if (item === dropdownApplianceItem) {
      tagSection.innerHTML += displayTag(e, "#68d9a4");
      tagArray.push(e.target.textContent);
    } else if (item === dropdownUstensilItem) {
      tagSection.innerHTML += displayTag(e, "#ed6454");
      tagArray.push(e.target.textContent);
    }
    sortRecipes();
    // sortRecipesMethod(); // DEUXIEME METHODE DE TRI -------
    sortDropdown(tagRecettes);
    closeBtn();
    // console.log(tagArray);

    // FONCTION POUR SAVOIR S'IL Y A DES DOUBLONS -----------------------------------
    // function hasDuplicates(arr) {
    //   return arr.some((x) => arr.indexOf(x) !== arr.lastIndexOf(x));
    // }

    // if (hasDuplicates(tagArray)) {
    //   console.log("doublon");
    //   console.log(tagArray);
    //   // tagArray.splice();
    // } else {
    //   console.log("pas de doublon");
    // }
    if (tagSection.innerText.includes(tagArray)) {
      console.log("pas de doublon");
    } else {
      console.log('doublon');
    }

    // let newTagArray = [...new Set(tagArray)];
    // tagArray = newTagArray;
    // console.log(tagArray);
  });
}
tagSectionArray(dropdownIngredientItem);
tagSectionArray(dropdownApplianceItem);
tagSectionArray(dropdownUstensilItem);

// AFFICHE LES CARTES EN FONCTION DU TABLEAU DES TAGS ---------------------------
function sortDropdown(tagRecettes, recettes) {
  if (tagRecettes || recettes) {
    dropdownIngredientItem.innerHTML = "";
    dropdownApplianceItem.innerHTML = "";
    dropdownUstensilItem.innerHTML = "";
    let tabIng = [];
    let tabApp = [];
    let tabUst = [];

    for (i = 0; i < tagRecettes.length; i++) {
      // console.log([tagRecettes[i]]);

      // MISE A JOUR DROPDOWN "INGREDIENTS" -----------------------------------------
      for (j = 0; j < tagRecettes[i].ingredients.length; j++) {
        let ingredients =
          tagRecettes[i].ingredients[j].ingredient.toLowerCase();
        tabIng.push(ingredients);
        let setIng = new Set(tabIng);
        let newTabIng = [...setIng];
        tabIng = newTabIng;
      }
      recettes = tabIng;
      // console.log(tabIng);

      // MISE A JOUR DROPDOWN "APPLIANCES" -----------------------------------------
      let appliances = tagRecettes[i].appliance.toLowerCase();
      tabApp.push(appliances);
      let setApp = new Set(tabApp);
      let newTabApp = [...setApp];
      tabApp = newTabApp;

      recettes = tabApp;
      // console.log(recettes);

      // MISE A JOUR DROPDOWN "USTENSILS" -----------------------------------------
      for (k = 0; k < tagRecettes[i].ustensils.length; k++) {
        let ustensils = tagRecettes[i].ustensils[k].toLowerCase();
        tabUst.push(ustensils);
        let setUst = new Set(tabUst);
        let newTabUst = [...setUst];
        tabUst = newTabUst;
      }
      // recettes = [...tabIng, ...tabApp, ...tabUst];
      recettes = tabUst;
      // tabUst = recettes;
      cardDisplay(tagRecettes);
    }
    // console.log(recettes);

    // TRI ET AFFICHAGE DES ELEMENTS DES DROPDOWNS APRES TRI DES RECETTES ----------
    for (ingredient of tabIng) {
      // console.log(ingredient);
      dropdownIngredientItem.innerHTML += `<dd class='col sort-item'>${ingredient}</dd>`;
    }
    // for (ingredient of recettes) {
    //   // console.log(ingredient);
    //   dropdownIngredientItem.innerHTML += `<dd class='col sort-item'>${ingredient}</dd>`;
    // }
    for (appliance of tabApp) {
      // console.log(appliance);
      dropdownApplianceItem.innerHTML += `<dd class='col sort-item'>${appliance}</dd>`;
    }
    for (ustensil of tabUst) {
      // console.log(ustensil);
      dropdownUstensilItem.innerHTML += `<dd class='col sort-item'>${ustensil}</dd>`;
    }

    // EVITER LE CLIC SUR UN ELEMENT DEJA CLIQUE ------------------------------------

    // console.log(tabIng);
    // console.log(tagArray);
    // console.log(tabIng[0] === tagArray[0]);
    // console.log(tabIng.includes(tagArray));
  }
}

// dropdownItem();

// dropdownSearch();
