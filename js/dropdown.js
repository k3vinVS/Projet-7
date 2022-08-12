// DOM ELEMENTS ------------------------------
const dropdownBtn = document.querySelectorAll('.sort-button');
const textBtn = document.querySelectorAll('.search-text-button');
const inputSearch = document.querySelectorAll('.input-search');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItem = document.querySelectorAll('.dropdown-item');

// SORT BUTTONS CHOICE ------------------------------
dropdownBtn.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        fetchMeals().then(() => dropdown());
    })
})


function dropdown() {
    // SORT INGREDIENTS ------------------------------
    let allIngredients = recipes.reduce((acc, curVal) => acc.concat(curVal.ingredients), []);
    let ingredientInIngredients = allIngredients.reduce((acc, curVal) => acc.concat(curVal.ingredient.toLowerCase()), []);
    let IngredientsWithNoDouble = new Set(ingredientInIngredients);

    // console.log(ingredientInIngredients);
    for (let ingredient of IngredientsWithNoDouble) {
        dropdownItem[0].innerHTML += `<dd class='col ingredient-item'>${ingredient}</dd>`;
        // console.log(ingredient);
    }


    // SORT APPLIANCE ------------------------------
    let allAppliances = recipes.reduce((acc, curVal) => acc.concat(curVal.appliance.toLowerCase()), []);
    let applianceWithNoDouble = new Set(allAppliances);

    for (let appliance of applianceWithNoDouble) {
        dropdownItem[1].innerHTML += `<dd class='col ingredient-item'>${appliance}</dd>`;
        // console.log(appliance);
    }

    // SORT USTENSILS ------------------------------    
    let allUstensils = recipes.reduce((acc, curVal) => acc.concat(curVal.ustensils), []);
    let lowerCaseUstensils = allUstensils.map((elm) => elm.toLowerCase());

    // console.log(lowerCaseUstensils);
    let ustensilsWithNoDouble = new Set(lowerCaseUstensils);

    for (let ustensil of ustensilsWithNoDouble) {
        dropdownItem[2].innerHTML += `<dd class='col ingredient-item'>${ustensil}</dd>`;
        console.log(ustensil);
    }


    // let ustensilsWithNoDouble = new Set(ustensilToLowerCase);

    // for (let ustensil of ustensilsWithNoDouble) {
    //     dropdownItem[2].innerHTML += `<dd class='col ingredient-item'>${ustensil}</dd>`;
    //     // console.log(ustensil);
    // }


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
                    dropdownItem[0].innerHTML = '';
                    dropdownItem[1].innerHTML = '';
                    dropdownItem[2].innerHTML = '';
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
                    dropdownItem[0].innerHTML = '';
                    dropdownItem[1].innerHTML = '';
                    dropdownItem[2].innerHTML = '';
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
                    dropdownItem[0].innerHTML = '';
                    dropdownItem[1].innerHTML = '';
                    dropdownItem[2].innerHTML = '';
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






// let filtreIngredients = ingredientInIngredients.filter((ele, pos) => ingredientInIngredients.indexOf(ele) == pos).join(' ');

// let ingredientsArray = [];
// console.log(allIngredients);
// console.log(ingredientInIngredients);
// console.log(filtreIngredients);
// console.log(IngredientsWithNoDouble);

// dropdownMenu.innerHTML = `<dd class='col d-flex ingredient-item'>${filtreIngredients}</dd>`;

// if (ingredients && focus) {
//     dropdownItem.style.background = 'none';
//     ingredientsArray.push(`<dd class='d-flex ingredient-item'>${filtreIngredients}</dd>`);
// };


// ingredients.push(`<dd class='col d-flex ingredient-item'>${element}</dd>`);

