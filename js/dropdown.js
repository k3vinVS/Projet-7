// DOM ELEMENTS ------------------------------
const dropdownBtn = document.querySelectorAll('.sort-button');
const textBtn = document.querySelectorAll('.search-text-button');
const inputSearch = document.querySelector('.input-search');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItem = document.querySelector('.dropdown-item');

function dropdown() {
  // SORT INGREDIENTS ------------------------------
  let ingredients = recipes.ingredients;
  let allIngredients = recipes.reduce((acc, curVal) => acc.concat(curVal.ingredients), []);
  let ingredientInIngredients = allIngredients.reduce((acc, curVal) => acc.concat(curVal.ingredient.toLowerCase()), []);
  let filtreIngredients = ingredientInIngredients.filter((ele, pos) => ingredientInIngredients.indexOf(ele) == pos);
  // let ingredientsArray = [];
  // console.log(allIngredients);
  // console.log(ingredientInIngredients);
  // console.log(filtreIngredients);
  // console.log(recipes);

  // if (ingredients && focus) {
  //   dropdownItem.style.background = 'none';
  //   ingredientsArray.push(`<dd class='col-4 d-inline-flex ingredient-item'>${filtreIngredients}</dd>`);
  // }


  if (ingredients && focus) {
    dropdownItem.style.background = 'none';
    dropdownItem.innerHTML = `<dd class='col-4 d-inline-flex ingredient-item'>${filtreIngredients}</dd>`;
  };

  for (let i = 0; i < dropdownBtn.length; i++) {

    // console.log(i);
  }
}
dropdown();






// DROPDOWN BUTTON------------------------------
function inputFunction() {
  const btn = document.querySelectorAll('.sort-button');
  const textBtn = document.querySelectorAll('.search-text-button');
  const inputSearch = document.querySelectorAll('.input-search');

  // DROPDOWN INGREDIENT BUTTON------------------------------  
  btn[0].onclick = () => {
    textBtn[0].textContent = '';
    inputSearch[0].style.display = 'inline-block';
    inputSearch[0].style.border = 'none';
    // console.log(inputSearch);
    if(inputSearch[0].style.display = 'inline-block'){
      window.onclick = () => {    
        inputSearch[0].style.display = 'none';
        textBtn[0].textContent = 'Ingredients';
        // console.log(textBtn);
      }
      // console.log('test input');
    }
  }

  // DROPDOWN APPLIANCE BUTTON------------------------------  
  btn[1].onclick = () => {
    textBtn[1].textContent = '';
    inputSearch[1].style.display = 'inline-block';
    inputSearch[1].style.border = 'none';
    // console.log(inputSearch);
    if(inputSearch[1].style.display = 'inline-block'){
      window.onclick = () => {    
        inputSearch[1].style.display = 'none';
        textBtn[1].textContent = 'Appareils';
        // console.log(textBtn);
      }
      // console.log('test input');
    }
  }

  // DROPDOWN USTENSILS BUTTON------------------------------  
  btn[2].onclick = () => {
    textBtn[2].textContent = '';
    inputSearch[2].style.display = 'inline-block';
    inputSearch[2].style.border = 'none';
    // console.log(inputSearch);
    if(inputSearch[2].style.display = 'inline-block'){
      window.onclick = () => {    
        inputSearch[2].style.display = 'none';
        textBtn[2].textContent = 'Ustensiles';
        // console.log(textBtn);
      }
      // console.log('test input');
    }
  }

}
inputFunction();

