const ingredientSet  = new Set();
const ustensileSet  = new Set();
const appareilSet  = new Set();

const dropdown1 = document.querySelector("#ingredients")
const dropdown2 = document.querySelector("#appareils")
const dropdown3 = document.querySelector("#ustensils")

const optionIngredients = document.querySelector("#options_ingredients")
const optionUstensiles = document.querySelector("#options_ustensile")
const optionAppareil = document.querySelector("#options_appareils")

function getIngredients(data) {
    const  {ingredients} = data;
    ingredients.forEach(element => {
        const {ingredient} = element;
        
        ingredientSet.add(ingredient)
        
    });
}

function getAppliance(data) {
    const  {appliance} = data;
    console.log(data);
    appareilSet.add(appliance);
}

function getUstensils(data) {
    const  {ustensils} = data;

    ustensils.forEach(element => {
    ustensileSet.add(element);
    });
}

dropdown1.onclick = function() {
    dropdown1.classList.toggle("active")
}


dropdown2.onclick = function() {
    dropdown2.classList.toggle("active")
}


dropdown3.onclick = function() {
    dropdown3.classList.toggle("active")
}

 function displayDropdownIngredients() {
    console.log(ingredientSet)
    ingredientSet.forEach(element => {
        const divIngredient = document.createElement("div");
        divIngredient.setAttribute("class", "option_ingredient");
        divIngredient.setAttribute("id", element);
        divIngredient.textContent = element;
        optionIngredients.appendChild(divIngredient);
    })
}

// function displayDropdownUstensils() {
//     ustensileSet.forEach(element => {
//         const divUstensil = document.createElement("div");
//         divUstensil.setAttribute("class", "option_ustensils");
//         divUstensil.textContent = element;
//         optionUstensiles.appendChild(divUstensil);
//     })
// }

// function displayDropdownAppareils() {
//     appareilSet.forEach(element => {
//         const divAppareil = document.createElement("div");
//         divAppareil.setAttribute("class", "option_appareils");
//         divAppareil.textContent = element;
//         optionAppareil.appendChild(divAppareil);
//     })
// }

// const divs = document.querySelectorAll('.option_ingredient');
// divs.forEach(el => el.addEventListener('click', event => {
//     createTag(event.target.getAttribute("id"));
//   }));

function createTag() {
    const divTagAdd = document.createElement("div");
    divTagAdd.setAttribute("class", "")
}