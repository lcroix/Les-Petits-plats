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

    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);

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
  return ingredients.sort();
  //.sort pour le tri pas ordre alphabétique
}
function displayIngredients(ingredients) {
  const optionIngredients = document.querySelector("#ingredientsList");
  optionIngredients.innerHTML = ''
  ingredients.forEach((ingredient) => {
    const divIngredient = document.createElement("div");
    divIngredient.setAttribute("class", "option_ingredient");
    divIngredient.setAttribute("id", ingredient);
    divIngredient.textContent = ingredient;
    optionIngredients.appendChild(divIngredient);
  });
 filterIngredients(ingredients)
}

function displayIngredientsDropDown() {
  const arrow = document.querySelector(
    "#ingredientsDropDown .dropdown-arrow"
  );
  const arrowUp = document.querySelector(
    "#ingredientsDropDown .dropdown-arrow_up"
  );
  const arrowDown = document.querySelector(
    "#ingredientsDropDown .dropdown-arrow_down"
  );
  const listTag = document.querySelector(
    "#ingredientsDropDown .accordion-body"
  );

  arrowUp.style.display = "none";
  arrowDown.style.display = "flex";
  listTag.style.display = "none";

  arrow.addEventListener("click", function () {
    displayArrows(arrowUp, arrowDown, listTag);
  });
}
function displayArrows(arrowUp, arrowDown, listTag) {
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
function filterIngredients(ingredients) {
  const listIngredients = document.querySelectorAll(".option_ingredient");
  const elementsTag = document.getElementById("tags-zone");

  listIngredients.forEach(function (ingredient) {
    ingredient.addEventListener("click", function (el) {
      const tag = el.target.innerHTML;
      elementsTag.innerHTML += `<button type="button" class="tag tag-ingredients">${tag}
        <img src="./assets/tag-close.svg" alt="icone de fermeture du tag" class="tag-close">
      </button>`;
      // getIngredients(recipe,tag)
      // Récupère tous les boutons de fermeture
      const closeTags = document.querySelectorAll(".tag-close");
       ingredient.remove()
      const ingredientsFiltered = ingredients.filter( el =>   el !== tag)
      console.log(tag);
      displayIngredients(ingredientsFiltered)

      // Ajoute un gestionnaire d'événements "click" à chaque bouton de fermeture
      closeTags.forEach(function (closeTag) {
        closeTag.addEventListener("click", function () {
          // Supprime l'élément parent correspondant
          closeTag.parentNode.remove();
         console.log(closeTag.parentElement.innerText);
         ingredientsFiltered.push(closeTag.parentNode.innerText)
         displayIngredients(ingredientsFiltered.sort())
        });
      });
    });
  });
  const availableIngredientKeywords = document.getElementById('ingredient-input')
  
    availableIngredientKeywords.addEventListener('input', function (event) {
      const listTag = document.querySelector(
        "#ingredientsDropDown .accordion-body"
      );
      const arrowUp = document.querySelector(
        "#ingredientsDropDown .dropdown-arrow_up"
      );
      const arrowDown = document.querySelector(
        "#ingredientsDropDown .dropdown-arrow_down"
      );
      listTag.style.display = "block";
      arrowUp.style.display = "flex";
      arrowDown.style.display = "none";
      const ingredientSearchText = event.target.value.toLowerCase();
      console.log(ingredientSearchText);
      displayIngredients(ingredients)
      const filteredIngredients = ingredients.filter(function(ingredient) {
        return ingredient.toLowerCase().includes(ingredientSearchText);
      });
      displayIngredients(filteredIngredients);
    
    });
    

  }

async function init() {
  const recipes = await fetchRecipes();
  displayRecipes(recipes);
  const ingredients = getIngredients(recipes);
  displayIngredients(ingredients);
  displayIngredientsDropDown();

  // filterIngredients(ingredients);
}
init();
