// DOM ELEMENTS
const form = document.querySelector('form');
const inputForm = document.getElementById('search-input');
const search = document.querySelector('.search');
const result = document.getElementById('result');
const tagSection = document.querySelector('.tag-section');
const tagEl = document.querySelectorAll('.tag');
const inputSearchTag = document.querySelectorAll('.input-search');
const closeTag = document.querySelectorAll('.close-tag');
const cardSection = document.querySelector('.card-section');
let recipes = [];

// console.log(result);

// SORT TAGS HTML
function showSortTag() {
  tagSection.innerHTML += sortTag();
}
showSortTag();

tagSection.addEventListener('click', () => {
  console.log('click');
})

// for (let i = 0; i < closeTag.length; i++) {
//   let newIndex = i;
//   console.log('click');

//   closeTag[newIndex].addEventListener('click', (e) => {
//     // closeTag.style.display = 'none';
//   })

// }



// CARD FACTORY HMTL


// SORT TAGS
function sortTag() {
  let divTagHtml = `
    <div
            class="col-2 tag bg-primary text-center d-inline-flex justify-content-around align-items-center p-2 text-white rounded"
            style="height: 37px; font-size: 14px"
          >
            Coco
            <svg
              class="align-text-top close-tag"
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

// CARD FACTORY
function recipesDisplay() {
  if (recipes === null) {
    result.innerHTML = `<h2 class='text-center'>Aucun résultat</h2>`;
  }

  cardSection.innerHTML = recipes.map((recipe) => {
    let ingredientsArray = [];
    let ingredients = recipe.ingredients;

    for (let i = 0; i < ingredients.length; i++) {
      let ingredient = recipe.ingredients[i].ingredient;
      let quantity = recipe.ingredients[i].quantity;
      let unit = recipe.ingredients[i].unit;

      // console.log(ingredient);
      // if (ingredients) {
      //   ingredientsArray.push(`${ingredient}: ${quantity}${unit}`);
      // }
      // if(!unit){
      //   ingredientsArray.push(`${ingredient}: ${quantity}`);
      // }
      // if(!quantity){
      //   ingredientsArray.push(`${ingredient}`);
      // }
      if (!quantity && !unit) {
        ingredientsArray.push(`<dd>${ingredient}</dd>`);
      } else if (!unit) {
        ingredientsArray.push(`<dd><strong>${ingredient}: </strong>${quantity}</dd>`);
      } else {
        ingredientsArray.push(`<dd><strong>${ingredient}: </strong>${quantity} ${unit}</dd>`);
      }
    }
    // console.log(ingredientsArray);

    return `
    <div class="col-12 col-lg-4">
      <div class="card mb-4 mb-lg-5 border-0 shadow">
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
                <p class="card-text text-break">
                    ${recipe.description}
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
    `
  }
  ).join("");
}

// DROPDOWN
const dropdownList = document.querySelectorAll('.btn');
const btnText = document.querySelectorAll('.search-text-button');

// console.log(btnText);

for (let i = 0; i < dropdownList.length; i++) {
  dropdownList[i].addEventListener('click', (e) => {

    btnText[i].remove();
    inputSearchTag[i].style.display = 'inline-flex';
    inputSearchTag[i].style.border = 'none';

    // console.log(e.target);



    // dropdownList[0].innerHTML = `
    //         <button
    //             type="button"
    //             class="btn btn-primary dropdown-toggle d-inline border-0"
    //             data-toggle="dropdown"
    //             aria-haspopup="true"
    //             aria-expanded="false"
    //             style="height: 69px; font-size: 18px;"
    //           >
    //           <p class="d-inline-flex" style="opacity: 0.5; margin: 0">Rechercher un ingrédient</p>
    //         </button>
    //           <div
    //             class="dropdown-menu bg-primary"
    //           >
    //             <a href="#" class="dropdown-item d-flex"></a>
    //             <a href="#" class="dropdown-item"></a>
    //             <a href="#" class="dropdown-item"></a>
    //           </div>
    //       `;
  })
  window.addEventListener('click', (e) => {
    if (!document.querySelector('.btn-group').contains(e.target)) {
      document.querySelector('.btn').innerHTML = `
      <p class="search-text-button d-inline-flex">Ingredients</p>
      <input
        class="input-search"
        placeholder="Rechercher un ingrédient"
      />
      `;
    } else if (document.querySelector('.btn-group').contains('Rechercher')) {
      console.log(e);
      // btnText[e].remove();
      // inputSearchTag[e].style.display = 'inline-flex';
      // inputSearchTag[e].style.border = 'none';
    }
  })
}


// FETCH
async function fetchMeals() {
  await fetch('./recipes.json')
    .then((res) => res.json())
    .then((data) => (recipes = data.recipes))
    .catch((err) => console.log(err))
  // console.log(recipes);
}

inputForm.addEventListener('input', (e) => {
  fetchMeals(e.target.value).then(() => recipesDisplay());
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchMeals().then(() => recipesDisplay());
})