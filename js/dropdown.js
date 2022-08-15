// DOM ELEMENTS ------------------------------
const dropdownBtn = document.querySelectorAll('.sort-button');
const textBtn = document.querySelectorAll('.search-text-button');
const inputSearch = document.querySelectorAll('.input-search');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownIngredientItem = document.querySelector('.dropdown-ingredient-item');
const dropdownApplianceItem = document.querySelector('.dropdown-appliance-item');
const dropdownUstensilItem = document.querySelector('.dropdown-ustensil-item');

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
        dropdownIngredientItem.innerHTML += `<dd class='col sort-item'>${ingredient}</dd>`;
        // console.log(ingredient);
    }


    // SORT APPLIANCE ------------------------------
    let allAppliances = recipes.reduce((acc, curVal) => acc.concat(curVal.appliance.toLowerCase()), []);
    let applianceWithNoDouble = new Set(allAppliances);

    for (let appliance of applianceWithNoDouble) {
        dropdownApplianceItem.innerHTML += `<dd class='col sort-item'>${appliance}</dd>`;
        // console.log(appliance);
    }

    // SORT USTENSILS ------------------------------    
    let allUstensils = recipes.reduce((acc, curVal) => acc.concat(curVal.ustensils), []);
    let lowerCaseUstensils = allUstensils.map((elm) => elm.toLowerCase());

    // console.log(lowerCaseUstensils);
    let ustensilsWithNoDouble = new Set(lowerCaseUstensils);

    for (let ustensil of ustensilsWithNoDouble) {
        dropdownUstensilItem.innerHTML += `<dd class='col sort-item'>${ustensil}</dd>`;
        // console.log(ustensil);
    }


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
                    dropdownIngredientItem.innerHTML = '';
                    dropdownApplianceItem.innerHTML = '';
                    dropdownUstensilItem.innerHTML = '';
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
                    dropdownIngredientItem.innerHTML = '';
                    dropdownApplianceItem.innerHTML = '';
                    dropdownUstensilItem.innerHTML = '';
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
                    dropdownIngredientItem.innerHTML = '';
                    dropdownApplianceItem.innerHTML = '';
                    dropdownUstensilItem.innerHTML = '';
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
    sortInputSearch();
}
dropdown();


// SEARCH IN SORT BUTTON
function sortInputSearch() {
    for (recipe of recipes) {
        let ingredients = recipe.ingredients;
        let appliances = recipe.appliance;
        let ustensils = recipe.ustensils;
        inputSearch[0].addEventListener('input', (e) => {
            // console.log(e.target.value);
            console.log(ingredients);
        })
        inputSearch[1].addEventListener('input', (e) => {
            // console.log(e.target.value);
            // console.log(appliances);
        })
        inputSearch[2].addEventListener('input', (e) => {
            // console.log(e.target.value);
            // console.log(ustensils);
        })
    }
}
sortInputSearch();

// ADD TO TAG
dropdownIngredientItem.addEventListener('click', (e) => {
    // console.log(e.target.textContent);
    tagSection.innerHTML += sortTag(e, '#0069d9');
    closeBtn();
});

dropdownApplianceItem.addEventListener('click', (e) => {
    // console.log(e.target.textContent);
    tagSection.innerHTML += sortTag(e, '#68d9a4');
    // closeTag.style.backgroundColor = '#68d9a4 !important';
    closeBtn();
    changeBgColor();
});

dropdownUstensilItem.addEventListener('click', (e) => {
    // console.log(e.target.textContent);
    tagSection.innerHTML += sortTag(e, '#ed6454');
    closeBtn();
});










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

