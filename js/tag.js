// DOM ELEMENTS ------------------------------
const tagSection = document.querySelector('.tag-section');
const tagEl = document.querySelectorAll('.tag');
const closeTag = document.querySelectorAll('.close-tag');
const sortItem = document.querySelectorAll('.sort-item');

// ------------------------------ CLOSE SORT TAGS ------------------------------

function closeBtn() {
  const tagEl = document.querySelectorAll('.tag');
  const closeTag = document.querySelectorAll('.close-tag');

  for (let i = 0; i < closeTag.length; i++) {
    closeTag[i].addEventListener('click', (e) => {
      // console.log(i);
      tagEl[i].remove();
    })
  }
}


// ------------------------------ SORT TAGS ------------------------------
function sortTag(e, bgParent) {
  // console.log(e.target);
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
};


function tagIngredientFilter(e) {
  // console.log(e.target.textContent);

  for (recipe of recipes) {
    // SEARCH INGREDIENTS ---------------
    const ingredients = recipe.ingredients;
    for (i = 0; i < ingredients.length; i++) {
      if (e.target.textContent.toLowerCase() === recipe.ingredients[i].ingredient.toLowerCase()) {
        console.log(e.target.textContent);
      }
    }

    // SEARCH USTENSILS ---------------
    const ustensils = recipe.ustensils;
    for (j = 0; j < ustensils.length; j++) {
      if (e.target.textContent.toLowerCase() === recipe.ustensils[j].toLowerCase()) {
        console.log(e.target.textContent);
      }
    }

  }

  // SEARCH APPLIANCES ---------------
  let filterAppliance = recipes.filter((recipe) => recipe.appliance.toLowerCase().includes(e.target.textContent.toLowerCase()));
  console.log(filterAppliance);


  // if(e.target.textContent === recipe.ingredients){
  //   console.log('test ingredient tag');
  // }
}