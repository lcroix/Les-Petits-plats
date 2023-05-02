async function fetchRecipes() {
  const response = await fetch("data/recipes.json");
  const responseJSON = await response.json();
  return responseJSON.recipes;
}

async function displayRecipes(recipes) {
  const recipesSection = document.querySelector(".cards");
  console.log(recipes);
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    // const tagModel = mediaFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
    // const recipeTagDOM = tagModel.getRecipeCartDOM();
    // recipesSection.appendChild(recipeTagDOM);
  });
}
function getIngredients(recipes) {
  const ingredients = [];
  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      const ingredientAlReadyExisted = ingredients.find(
        (item) => item == ingredient.ingredient
      );
      if (!ingredientAlReadyExisted) {
        ingredients.push(ingredient.ingredient);
      }
    }
  }
  return ingredients;
}
function displayIngredients(ingredients) {
  const optionIngredients = document.querySelector("#ingredientsList");
  ingredients.forEach((ingredient) => {
    const divIngredient = document.createElement("div");
    divIngredient.setAttribute("class", "option_ingredient");
    divIngredient.setAttribute("id", ingredient);
    divIngredient.textContent = ingredient;
    optionIngredients.appendChild(divIngredient);
  });
  filter(ingredients);
}
const arrow = document.querySelector(".dropdown-arrow");
const arrowUp = document.querySelector(".dropdown-arrow_up");
const arrowDown = document.querySelector(".dropdown-arrow_down");
const listTag = document.querySelector(".accordion-body");

arrowUp.style.display = "none";
arrowDown.style.display = "flex";
listTag.style.display = "none";

arrow.addEventListener("click", function () {
  displayArrows();
});
function displayArrows() {
  if (arrowUp.style.display === "none") {
    arrowUp.style.display = "flex";
    arrowDown.style.display = "none";
    listTag.style.display = "block";
  } else {
    arrowUp.style.display = "none";
    arrowDown.style.display = "flex";
    listTag.style.display = "none";
  }
}
function filter() {
  const listIngredients = document.querySelectorAll(".option_ingredient");
  const elementsTag = document.getElementById("tags-zone");

  listIngredients.forEach(function (ingredient) {
    ingredient.addEventListener("click", function (el) {
      const tag = el.target.innerHTML;
      elementsTag.innerHTML += `<button type="button" class="tag tag-ingredients">${tag}
        <img src="./assets/tag-close.svg" alt="icone de fermeture du tag" class="tag-close">
      </button>`;
      
      // Récupère tous les boutons de fermeture
      const closeTags = document.querySelectorAll(".tag-close");
      
      // Ajoute un gestionnaire d'événements "click" à chaque bouton de fermeture
      closeTags.forEach(function (closeTag) {
        closeTag.addEventListener("click", function () {
          // Supprime l'élément parent correspondant
          closeTag.parentNode.remove();
        });
      });
    });
  });
}

async function init() {
  const recipes = await fetchRecipes();
  // console.log(recipes);
  displayRecipes(recipes);
  const ingredients = getIngredients(recipes);
  displayIngredients(ingredients);
  // recipes.forEach((recipe) => {
  //   dropdownBehaviour(recipe);

  // });
  // displayDropdownAppareils();
  // displayDropdownUstensils();
  // displayData(recipes);
}
init();
