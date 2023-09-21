// ------------------------------- TAG MODELE -------------------------------
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

// ------------------------------- ENLEVEMENT DES TAGS -------------------------------
function closeBtn() {
  // DOM ELEMENTS -------------------------------------
  const tagEl = document.querySelectorAll(".tag");
  const closeTag = document.querySelectorAll(".close-tag");
  // --------------------------------------------------

  for (let i = 0; i < closeTag.length; i++) {
    closeTag[i].addEventListener("click", (e) => {
      const elementToDelete = tagEl[i].textContent.trim();
      tagEl[i].remove();

      const position = tagArray.indexOf(elementToDelete);
      tagArray.splice(position, 1);
      // tagArray.splice(i, 1);

      console.log(tagArray);

      // MISE A JOUR DES DROPDOWNS -------------------------------
      // Mis à jour des éléments des dropdowns -----
      sortDropdown(tagRecettes);

      // MISE A JOUR DES RECETTES -------------------------------
      if (tagArray.length == 1) {
        console.log("reste 1 élément présent");
        // sortRecipes(tagArray, recipes);
        sortRecipesMethod(tagArray, recipes);
      } else if (tagArray.length > 1) {
        console.log("reste plusieurs éléments présents");
        // sortRecipes(tagArray, recipes);
        sortRecipesMethod(tagArray, recipes);
      } else {
        // sortRecipes(tagArray, recipes);
        sortRecipesMethod(tagArray, recipes);

      }

      // Tri des recettes si tag enlevé -----
      // tagArray.filter((recette) => sortRecipes(recette, tagArray));

      // Si tagSection qui contient les tags est vide, remets à zéro les dropdowns, les recettes et le tagArray -----
      // if (
      //   (tagSection.lastElementChild === null &&
      //     inputSearch.value.length === 0) ||
      //   (tagArray.length === 0 && inputSearch.value.length === 0)
      // ) {
      //   tagArray = [];
      //   recettes = [];
      //   cardDisplay(recipes);
      //   dropdownIngredientItem.innerHTML = "";
      //   dropdownApplianceItem.innerHTML = "";
      //   dropdownUstensilItem.innerHTML = "";
      //   dropdownItem();
      // }
    });
  }

  // ------------------------------ DEUXIEME METHODE ------------------------------
  // closeTag.forEach((element) => {
  //   // console.log(element);
  //   element.addEventListener("click", (e) => {
  //     let tag = element.parentNode;
  //     tag.remove();
  //     tagArray.splice(element, 1);
  //     console.log(tagArray);
  //     // console.log(tagName);
  //   });
  // });
}
