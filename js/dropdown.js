// DOM ELEMENTS ------------------------------
const dropdownBtn = document.querySelectorAll('.sort-button');
const textBtn = document.querySelectorAll('.search-text-button');
const inputSearch = document.querySelectorAll('.input-search');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItem = document.querySelector('.dropdown-item');

dropdownBtn[0].addEventListener('click', (e) => {
    e.preventDefault();
    fetchMeals().then(() => dropdown());
})


function dropdown() {
    // SORT INGREDIENTS ------------------------------
    // let ingredients = recipes.ingredients;
    let allIngredients = recipes.reduce((acc, curVal) => acc.concat(curVal.ingredients), []);
    let ingredientInIngredients = allIngredients.reduce((acc, curVal) => acc.concat(curVal.ingredient.toLowerCase()), []);
    // let filtreIngredients = ingredientInIngredients.filter((ele, pos) => ingredientInIngredients.indexOf(ele) == pos).join(' ');
    let IngredientsWithNoDouble = new Set (ingredientInIngredients);
    // let ingredientsArray = [];
    // console.log(allIngredients);
    // console.log(ingredientInIngredients);
    // console.log(filtreIngredients);
    // console.log(IngredientsWithNoDouble);
    for(let element of IngredientsWithNoDouble){
        let ingredients = [element];
        console.log(ingredients);
        // ingredients.push(`<dd class='col d-flex ingredient-item'>${element}</dd>`);
        dropdownItem.innerHTML += `<dd class='col-4 ingredient-item'>${ingredients}</dd>`;
    }

    
    // dropdownMenu.innerHTML = `<dd class='col d-flex ingredient-item'>${filtreIngredients}</dd>`;

    // if (ingredients && focus) {
    //     dropdownItem.style.background = 'none';
    //     ingredientsArray.push(`<dd class='d-flex ingredient-item'>${filtreIngredients}</dd>`);
    // };

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
            if (inputSearch[0].style.display === 'inline-block') {
                window.onclick = () => {
                    inputSearch[0].style.display = 'none';
                    inputSearch[1].style.display = 'none';
                    inputSearch[2].style.display = 'none';
                    textBtn[0].textContent = 'Ingredients';
                    textBtn[1].textContent = 'Appareils';
                    textBtn[2].textContent = 'Ustensiles';
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
            if (inputSearch[1].style.display === 'inline-block') {
                window.onclick = () => {
                    inputSearch[0].style.display = 'none';
                    inputSearch[1].style.display = 'none';
                    inputSearch[2].style.display = 'none';
                    textBtn[0].textContent = 'Ingredients';
                    textBtn[1].textContent = 'Appareils';
                    textBtn[2].textContent = 'Ustensiles';
                    // console.log(textBtn);
                }
                // console.log('test input');
            }
        }

        // DROPDOWN USTENSILS BUTTON------------------------------  
        btn[2].onclick = () => {
            textBtn[2].textContent = '';
            inputSearch[2].style.display === 'inline-block';
            inputSearch[2].style.border = 'none';
            // console.log(inputSearch);
            if (inputSearch[2].style.display = 'inline-block') {
                window.onclick = () => {
                    inputSearch[0].style.display = 'none';
                    inputSearch[1].style.display = 'none';
                    inputSearch[2].style.display = 'none';
                    textBtn[0].textContent = 'Ingredients';
                    textBtn[1].textContent = 'Appareils';
                    textBtn[2].textContent = 'Ustensiles';
                    // console.log(textBtn);
                }
                // console.log('test input');
            }
        }

    }
    inputFunction();
}
dropdown();

