async function fetchrecipes() {
  const response = await fetch("data/recipes.json");
  const responseJSON = await response.json();

  return responseJSON;
}
async function getElements() {
  let element = await fetchrecipes();
  let recipes = element.recipes;
  // console.log(recipes);
  return { recipes: [...recipes] };
}

async function displayData(recipes) {
  const recipesSection = document.querySelector(".card");
  console.log(recipes);
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    // const tagModel = mediaFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCartDOM();
    recipesSection.appendChild(recipeCardDOM);
    // const recipeTagDOM = tagModel.getRecipeCartDOM();
    // recipesSection.appendChild(recipeTagDOM);
  });
}
async function init() {
  const recipes = await getElements();
  // console.log(recipes);
  displayData(recipes.recipes);
  recipes.recipes.forEach((recipe) => {
    getIngredients(recipe);
    getAppliance(recipe);
    getUstensils(recipe);
    });
    displayDropdownIngredients();
    // displayDropdownAppareils();
    // displayDropdownUstensils();
    // displayData(recipes);
    
}
init();

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
//   ustensileSet.forEach(element => {
//       const divUstensil = document.createElement("div");
//       divUstensil.setAttribute("class", "option_ustensils");
//       divUstensil.textContent = element;
//       optionUstensiles.appendChild(divUstensil);
//   })
// }

// function displayDropdownAppareils() {
//   appareilSet.forEach(element => {
//       const divAppareil = document.createElement("div");
//       divAppareil.setAttribute("class", "option_appareils");
//       divAppareil.textContent = element;
//       optionAppareil.appendChild(divAppareil);
//   })
// }

const divs = document.querySelectorAll('.option_ingredient');
divs.forEach(el => el.addEventListener('click', event => {
  console.log('click fais');
  createTag(event.target.getAttribute("id"));
}));

// function createTag() {
//   const divTagAdd = document.createElement("div");
//   divTagAdd.setAttribute("class", "")
// }
