// ------------------------------------- DOM ELEMENTS -------------------------------------
const dropdownIngredientItem = document.querySelector(
  ".dropdown-ingredient-item"
);
const dropdownApplianceItem = document.querySelector(
  ".dropdown-appliance-item"
);
const dropdownUstensilItem = document.querySelector(".dropdown-ustensil-item");
const inputSearchDropdown = document.querySelectorAll(".input-search-dropdown");
const dropdownMenu = document.querySelectorAll(".dropdown-menu");
const tagSection = document.querySelector(".tag-section");
const dropdownBtn = document.querySelectorAll(".sort-button");
const textBtn = document.querySelectorAll(".btn");

// ------------------------------- AFFICHAGE DES ELEMENTS DU DROPDOWN -------------------------------
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

// ------------------------------- RECHERCHE AVEC LES INPUTS DES DROPDOWNS ------------------------------------------
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
}

// ------------------------------- AFFICHAGE TAGS DE LA BONNE COULEUR EN FONCTION DE L'ELEMENT CHOISI (DROPDOWN) -------------------------------
function tagSectionArray(item) {
  item.addEventListener("click", (e) => {
    if (item === dropdownIngredientItem) {
      tagSection.innerHTML += displayTag(e, "#0069d9");
      inputSearchDropdown[0].value = ""; // Pour remettre à zéro l'input du dropdown -----
    } else if (item === dropdownApplianceItem) {
      tagSection.innerHTML += displayTag(e, "#68d9a4");
      inputSearchDropdown[1].value = "";
    } else if (item === dropdownUstensilItem) {
      tagSection.innerHTML += displayTag(e, "#ed6454");
      inputSearchDropdown[2].value = "";
    }

    tagArray.push(e.target.textContent);
    if (tagArray.length == 1) {
      console.log("1 élément présent dans le tableau");
      sortRecipes(tagArray, recipes);
    } else {
      console.log("plusieurs éléments présents dans le tableau");
      sortRecipes(tagArray, recettes);
    }
    console.log(tagArray);

    // Mets à zéro l'input de recherche si tag similaire -----
    if (
      inputSearch.value.toLowerCase() === e.target.textContent.toLowerCase()
    ) {
      inputSearch.value = "";
    }

    // Ferme le tag sélectionné et refait un tri et affichage des recettes -----
    closeBtn();
  });
}
tagSectionArray(dropdownIngredientItem);
tagSectionArray(dropdownApplianceItem);
tagSectionArray(dropdownUstensilItem);

// ------------------------------- AFFICHAGE DES BOUTONS DE TRI (COULEURS,...) + INPUT DE CHAQUE BOUTONS -------------------------------
function inputDropdown() {
  for (let i = 0; i < dropdownBtn.length; i++) {
    dropdownBtn[i].onclick = () => {
      // Efface le texte des boutons -----
      textBtn[i].firstChild.textContent = "";

      // Affiche l'input des boutons -----
      inputSearchDropdown[i].style.display = "inline-block";

      // Affiche le dropdown -----
      dropdownMenu[i].style.display = "block";

      window.onclick = () => {
        textButton();

        // Disparition du dropdown -----
        dropdownMenu[i].style.display = "none";
      };
    };

    // Enlève les inputs des boutons de tags et remets les titres des boutons -----
    function textButton() {
      inputSearchDropdown[i].style.display = "none";
      // inputSearchDropdown[i].value = ""; // Pour remettre à zéro l'input des dropdowns -----
      if (dropdownBtn[i].style.backgroundColor === "rgb(237, 100, 84)") {
        textBtn[i].firstChild.textContent = "Ustensiles";
      } else if (
        dropdownBtn[i].style.backgroundColor === "rgb(104, 217, 164)"
      ) {
        textBtn[i].firstChild.textContent = "Appareils";
      } else {
        textBtn[i].firstChild.textContent = "Ingrédients";
      }
    }
  }
}

// ------------------------------- TRIE ET AFFICHE LES CARTES EN FONCTION DU TABLEAU DES TAGS ---------------------------
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
      recettes = tabUst;

      cardDisplay(tagRecettes);
      // console.log(tagRecettes);
    }
    // console.log(recettes);

    // TRI ET AFFICHAGE DES ELEMENTS DES DROPDOWNS APRES TRI DES RECETTES ----------
    const newIngredientLIst = filterTabElement(tagArray, tabIng);
    const newApplianceLIst = filterTabElement(tagArray, tabApp);
    const newUstensilLIst = filterTabElement(tagArray, tabUst);

    for (ingredient of newIngredientLIst) {
      // console.log(ingredient);
      dropdownIngredientItem.innerHTML += `<dd class='col sort-item'>${ingredient}</dd>`;
    }

    for (appliance of newApplianceLIst) {
      // console.log(appliance);
      dropdownApplianceItem.innerHTML += `<dd class='col sort-item'>${appliance}</dd>`;
    }
    for (ustensil of newUstensilLIst) {
      // console.log(ustensil);
      dropdownUstensilItem.innerHTML += `<dd class='col sort-item'>${ustensil}</dd>`;
    }
    // console.log(tagRecettes);
  }
}

// ------------------------------- EVITE LES DOUBLONS DES TAGS ---------------------------
function filterTabElement(tagArray, tagElements) {
  let newTagElements = [];
  tagElements.map((element) => {
    if (!tagArray.includes(element)) {
      newTagElements.push(element);
    }
  });
  return newTagElements;
}
