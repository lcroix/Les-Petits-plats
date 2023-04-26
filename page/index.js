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
    dropdownBehaviour(recipe)
    });
    // displayDropdownAppareils();
    // displayDropdownUstensils();
    // displayData(recipes);
    
}
init();

