async function fetchRecipes() {
  const response = await fetch("data/recipes.json");
  const responseJSON = await response.json();
  return responseJSON.recipes;
}

async function displayRecipes(recipes) {
  const recipesSection = document.querySelector(".cards");
  recipesSection.innerHTML = "";
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
      const ingredientAlreadyExists = ingredients.find(
        (item) => item === ingredient.ingredient
      );
      if (!ingredientAlreadyExists) {
        ingredients.push(ingredient.ingredient);
      }
    }
  }
  return ingredients.sort();
}

function getAppareilles(recipes) {
  const appliances = [];
  for (const recipe of recipes) {
    const applianceAlreadyExists = appliances.find(
      (item) => item === recipe.appliance
    );
    if (!applianceAlreadyExists) {
      appliances.push(recipe.appliance);
    }
  }
  return appliances.sort();
}
function getUstensiles(recipes) {
  const ustensils = [];
  for (const recipe of recipes) {
    for (const ustensil of recipe.ustensils) {
      const ustensilAlreadyExists = ustensils.find((item) => item == ustensil);
      if (!ustensilAlreadyExists) {
        ustensils.push(ustensil);
      }
    }
  }
  return ustensils.sort();
}

function displayIngredients(ingredients, recipes) {
  const optionIngredients = document.querySelector("#ingredientsList");
  optionIngredients.innerHTML = "";
  console.log(optionIngredients);
  ingredients.forEach((ingredient) => {
    const divIngredient = document.createElement("div");
    divIngredient.setAttribute("class", "option");
    divIngredient.setAttribute("id", ingredient);
    divIngredient.textContent = ingredient;
    optionIngredients.appendChild(divIngredient);
  });
  filterIngredients(ingredients, recipes, optionIngredients);
}

function displayAppareil(appliances, recipes) {
  const optionappliances = document.querySelector("#appliancesList");
  optionappliances.innerHTML = "";
  appliances.forEach((appliance) => {
    const divAppliance = document.createElement("div");
    divAppliance.setAttribute("class", "option");
    divAppliance.setAttribute("id", appliance);
    divAppliance.textContent = appliance;
    optionappliances.appendChild(divAppliance);
  });
  filterIngredients(appliances, recipes, optionappliances);
}

function displayUstensil(ustensils, recipes) {
  const optionaustensils = document.querySelector("#ustensilsList");
  optionaustensils.innerHTML = "";
  ustensils.forEach((ustensils) => {
    const divUstensils = document.createElement("div");
    divUstensils.setAttribute("class", "option");
    divUstensils.setAttribute("id", ustensils);
    divUstensils.textContent = ustensils;
    optionaustensils.appendChild(divUstensils);
  });
  filterIngredients(ustensils, recipes, optionaustensils);
}

function displayDropDown(elements, dropdown, callback, recipes) {
  const arrow = dropdown.querySelector(".dropdown-arrow");
  const arrowUp = dropdown.querySelector(".dropdown-arrow_up");
  const arrowDown = dropdown.querySelector(".dropdown-arrow_down");
  const listTag = dropdown.querySelector(".accordion-body");

  arrowUp.style.display = "none";
  arrowDown.style.display = "flex";
  listTag.style.display = "none";

  arrow.addEventListener("click", function () {
    displayArrows(arrowUp, arrowDown, listTag);
  });

  const keyWordsSearch = dropdown.querySelectorAll("input");
  keyWordsSearch[0].addEventListener("input", function (event) {
    const listTag = dropdown.querySelector(".accordion-body");
    const arrowUp = dropdown.querySelector(".dropdown-arrow_up");
    const arrowDown = dropdown.querySelector(".dropdown-arrow_down");
    listTag.style.display = "block";
    arrowUp.style.display = "flex";
    arrowDown.style.display = "none";
    const keyWordsSearchText = event.target.value.toLowerCase();

    const actualTagsHTML = dropdown.querySelectorAll(".tag-ingredients");
    const actualTagsHTMLArray = Array.from(actualTagsHTML);
    const keyWordsWithoutTags = elements.filter(
      (element) =>
        !actualTagsHTMLArray.find(
          (actualTagHTML) => actualTagHTML.textContent.trim() == element
        )
    );
    const filteredElements = keyWordsWithoutTags.filter(function (element) {
      return element.toLowerCase().includes(keyWordsSearchText);
    });
    callback(filteredElements, recipes);
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
function filterIngredients(ingredients, recipes, option) {
  const listIngredients = option.querySelectorAll(".option");
  const elementsTag = document.getElementById("tags-zone");
  listIngredients.forEach(function (ingredient) {
    ingredient.addEventListener("click", function (el) {
      const tag = el.target.innerHTML;
      tagbtn.push(tag);
      console.log(tag);
      elementsTag.innerHTML += `<button type="button" class="tag tag-ingredients-${option.id}">${tag}
        <img src="./assets/tag-close.svg" alt="icone de fermeture du tag" class="tag-close">
        </button>`;
      // Récupère tous les boutons de fermeture
      const closeTags = document.querySelectorAll(".tag-close");
      ingredient.remove();
      const ingredientsFiltered = ingredients.filter((el) => el !== tag);
      const appliancesFiltered = ingredients.filter((el) => el !== tag);
      const ustensilFiltered = ingredients.filter((el) => el !== tag);
      if (option.id == "ingredientsList") {
        displayIngredients(ingredientsFiltered, recipes, option);
        console.log(recipes);
        recipeIngredients(recipes, tag, option.id);
        // filterTag(recipes, tag, option.id);
      } else if (option.id == "appliancesList") {
        displayUstensil(appliancesFiltered, recipes);
        recipeIngredients(recipes, tag, option.id);
        // filterTag(recipes, tag, option.id);
      } else {
        displayAppareil(ustensilFiltered, recipes);
        recipeIngredients(recipes, tag, option.id);
        // filterTag(recipes, tag, option.id);
      }
      // Ajoute un gestionnaire d'événements "click" à chaque bouton de fermeture
      closeTags.forEach(function (closeTag) {
        closeTag.addEventListener("click", function () {
          removeTag(tag);
          // Supprime l'élément parent correspondant
          displayRecipes(recipes);
          closeTag.parentNode.remove();
          if (
            closeTag.parentElement.className ===
            "tag tag-ingredients-ingredientsList"
            ) {
              ingredientsFiltered.push(closeTag.parentNode.innerText.trim());
            displayIngredients(ingredientsFiltered.sort(), recipes);
          } else if (
            closeTag.parentElement.className ===
            "tag tag-ingredients-appliancesList"
          ) {
            appliancesFiltered.push(closeTag.parentNode.innerText.trim());
            displayAppareil(appliancesFiltered.sort(), recipes);
          } else {
            ustensilFiltered.push(closeTag.parentNode.innerText.trim());
            displayUstensil(ustensilFiltered.sort(), recipes);
          }
        });
      });

      // Ajoute à nouveau l'événement de clic à chaque élément de listIngredients
      if (option.id == "ingredientsList") {
        filterIngredients(ingredientsFiltered, recipes, option);
      } else if (option.id == "appliancesList") {
        filterIngredients(appliancesFiltered, recipes, option);
      } else {
        filterIngredients(ustensilFiltered, recipes, option);
      }
    });
  });
}
function removeTag(tag) {
  const index = tagbtn.indexOf(tag);
  if (index !== -1) {
    tagbtn.splice(index, 1);
    console.log(tagbtn);
  }
}
function filterTag(recipes, tag, option) {
  if (option == "ingredientsList") {
    const recipesByIngrefients = recipes.filter((filterTag) =>
      filterTag.ingredients.find((el) => el.ingredient == tag)
    );
    displayAppareil(getAppareilles(recipesByIngrefients), recipes);
    displayUstensil(getUstensiles(recipesByIngrefients), recipes)
    displayIngredients(getIngredients(recipesByIngrefients), recipes);
    searchForAllParameters(recipesByIngrefients)
  } else if (option == "appliancesList") {
    const recipesByAppliances = recipes.filter(
      (filterTag) => filterTag.appliance == tag
    );
    displayIngredients(getIngredients(recipesByAppliances), recipes);
    displayAppareil(getAppareilles(recipesByAppliances), recipes);
    displayUstensil(getUstensiles(recipesByAppliances), recipes);
    searchForAllParameters(recipesByAppliances)
  } else {
    const recipesByUstensils = recipes.filter((filterTag) =>
      filterTag.ustensils.find((el) => el == tag)
    );
    displayIngredients(getIngredients(recipesByUstensils), recipes);
    displayAppareil(getAppareilles(recipesByUstensils), recipes);
    displayUstensil(getUstensiles(recipesByUstensils), recipes);
    searchForAllParameters(recipesByUstensils)
  }
}

function recipeIngredients(recipes, tag, type) {
  if (type == "ingredientsList") {
    const filterIngredient = recipes.filter((el) =>
      el.ingredients.find((item) => item.ingredient == tag)
    );
   console.log( tagbtn.includes(tag))
    displayRecipes(filterIngredient);
  } else if (type == "appliancesList") {
    const filterAppliances = recipes.filter((el) => el.appliance == tag);
    displayRecipes(filterAppliances);
  } else {
    const filterUstensiles = recipes.filter((el) =>
      el.ustensils.find((item) => item == tag)
    );
    displayRecipes(filterUstensiles);
  }
  filterTag(recipes, tag, type);
  searchForAllParameters(recipes)


}

//algo de recherche

function searchForAllParameters(recipes) {
  const searchInput = document.querySelector(".form-control");
  searchInput.addEventListener("input", function (el) {
    if (el.target.value.length > 2) {
      searchInput.textContent = "";

      const searchedString = el.target.value;
      const filteredArr = [];
      
      const regex = new RegExp(searchedString, "i");

      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const lowerCaseName = recipe.name;
        const lowerCaseDescription = recipe.description;
        
        let ingredientMatches = false;
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j].ingredient;
          if (regex.test(ingredient)) {
            ingredientMatches = true;
            break;
          }
        }
        
        let ustensilMatches = false;
        for (let k = 0; k < recipe.ustensils.length; k++) {
          const ustensil = recipe.ustensils[k];
          if (regex.test(ustensil)) {
            ustensilMatches = true;
            break;
          }
        }
        
        if (
          lowerCaseName.includes(searchedString) ||
          lowerCaseDescription.includes(searchedString) ||
          ingredientMatches ||
          recipe.appliance.toLowerCase().includes(searchedString) ||
          ustensilMatches
        ) {
          filteredArr.push(recipe);
        }
      }
      
      displayRecipes(filteredArr);
      displayUstensil(getUstensiles(filteredArr));
      displayIngredients(getIngredients(filteredArr), recipes);
      displayAppareil(getAppareilles(filteredArr));
    } else {
      displayRecipes(recipes);
      displayUstensil(getUstensiles(recipes));
      displayIngredients(getIngredients(recipes),recipes);
      displayAppareil(getAppareilles(recipes));
    }
  });
}
let tagbtn = []


async function init() {
  const ingredientsDropDown = document.querySelector("#ingredientsDropDown");
  const applianceDropDown = document.querySelector("#applianceDropDown");
  const ustensilsDropDown = document.querySelector("#ustensilsDropDown");
  const recipes = await fetchRecipes();
  displayRecipes(recipes);
  const ingredients = getIngredients(recipes);
  displayIngredients(ingredients, recipes);
  displayDropDown(
    ingredients,
    ingredientsDropDown,
    displayIngredients,
    recipes
  );
  const appreils = getAppareilles(recipes);
  displayAppareil(appreils, recipes);
  displayDropDown(appreils, applianceDropDown, displayAppareil, recipes);
  const ustensils = getUstensiles(recipes);
  displayUstensil(ustensils, recipes);
  displayDropDown(ustensils, ustensilsDropDown, displayUstensil, recipes);
   searchForAllParameters(recipes);
 
}
init();
