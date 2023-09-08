async function fetchRecipes() {
  const response = await fetch("data/recipes.json");
  const responseJSON = await response.json();
  return responseJSON.recipes;
}
let tagbtn = [];
let filteredRecipes = [];

async function displayRecipes(recipes) {
  const recipesSection = document.querySelector(".cards");
  recipesSection.innerHTML = "";
  if (recipes.length === 0) {
    const noRecipesResult = noRecipes(recipes);
    recipesSection.appendChild(noRecipesResult);
  }

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

  ingredients.forEach((ingredient) => {
    const tagIsInList = tagbtn.includes(ingredient);

    if (!tagIsInList) {
      const divIngredient = document.createElement("div");
      divIngredient.setAttribute("class", "option");
      divIngredient.setAttribute("id", ingredient);
      divIngredient.textContent = ingredient;
      optionIngredients.appendChild(divIngredient);
    }
  });

  filterIngredients(ingredients, recipes, optionIngredients);
}

function displayAppareil(appliances, recipes) {
  const optionappliances = document.querySelector("#appliancesList");
  optionappliances.innerHTML = "";
  appliances.forEach((appliance) => {
    const tagIsInList = tagbtn.includes(appliance);
    if (!tagIsInList) {
      const divAppliance = document.createElement("div");
      divAppliance.setAttribute("class", "option");
      divAppliance.setAttribute("id", appliance);
      divAppliance.textContent = appliance;
      optionappliances.appendChild(divAppliance);
    }
  });
  filterIngredients(appliances, recipes, optionappliances);
}

function displayUstensil(ustensils, recipes) {
  const optionaustensils = document.querySelector("#ustensilsList");
  optionaustensils.innerHTML = "";
  ustensils.forEach((ustensil) => {
    const tagIsInList = tagbtn.includes(ustensil);
    if (!tagIsInList) {
      const divUstensils = document.createElement("div");
      divUstensils.setAttribute("class", "option");
      divUstensils.setAttribute("id", ustensil);
      divUstensils.textContent = ustensil;
      optionaustensils.appendChild(divUstensils);
    }
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
      if (!tagbtn.includes(tag)) {
        tagbtn.push(tag);
      }
      const existingTags = elementsTag.querySelectorAll(".tag");

      // Vérifie si le tag existe déjà dans la liste
      const tagAlreadyExists = Array.from(existingTags).some(
        (existingTag) => existingTag.innerText.trim() === tag
      );

      // Si le tag existe déjà, ne l'ajoute pas à nouveau
      if (!tagAlreadyExists) {
        elementsTag.innerHTML += `<button type="button" class="tag tag-ingredients-${option.id}">${tag}
          <img src="./assets/tag-close.svg" alt="icone de fermeture du tag" class="tag-close">
        </button>`;
      }

      // Récupère tous les boutons de fermeture
      const closeTags = document.querySelectorAll(".tag-close");

      // Supprime l'élément parent correspondant
      ingredient.remove();


      // Mise à jour des listes d'appareils et d'ustensiles après la suppression du tag

      if (option.id == "ingredientsList") {
        const recipesByIngredients = recipes.filter((recipe) =>
        tagbtn.every((tag) => 
          recipe.ingredients.some((el) => el.ingredient == tag)
        )
      );
        displayIngredients(
          getIngredients(recipesByIngredients),
          recipesByIngredients,
          document.querySelector("#ingredientsDropDown")
        );
        displayAppareil(
          getAppareilles(recipesByIngredients),
          recipesByIngredients,
          document.querySelector("#applianceDropDown")
        );
        displayUstensil(
          getUstensiles(recipesByIngredients),
          recipesByIngredients,
          document.querySelector("#ustensilsDropDown")
        );
        recipeIngredients(recipes, tag, option.id);
        // Autres mises à jour ou actions en fonction de la suppression du tag
      } else if (option.id == "appliancesList") {
        const recipesByAppliances = recipes.filter((recipe) =>
        tagbtn.every((tag)=>recipe.appliance == tag )
    );
        displayIngredients(
          getIngredients(recipesByAppliances),
          recipesByAppliances,
          document.querySelector("#ingredientsDropDown")
        );
        displayAppareil(
          getAppareilles(recipesByAppliances),
          recipesByAppliances,
          document.querySelector("#applianceDropDown")
        );
        displayUstensil(
          getUstensiles(recipesByAppliances),
          recipesByAppliances,
          document.querySelector("#ustensilsDropDown")
        );
        recipeIngredients(recipes, tag, option.id);
        // Autres mises à jour ou actions en fonction de la suppression du tag
      } else {
        const recipesByUstensils = recipes.filter((recipe) =>
        tagbtn.every((tag) => 
          recipe.ustensils.some((el)=> el == tag)
        )
      );
        displayIngredients(
          getIngredients(recipesByUstensils),
          recipesByUstensils,
          document.querySelector("#ingredientsDropDown")
        );
        // Seulement la liste des ustensiles doit être mise à jour ici
        displayAppareil(
          getAppareilles(recipesByUstensils),
          recipesByUstensils,
          document.querySelector("#applianceDropDown")
        );
        displayUstensil(
          getUstensiles(recipesByUstensils),
          recipesByUstensils,
          document.querySelector("#ustensilsDropDown")
        );
        recipeIngredients(recipes, tag, option.id);
        // Autres mises à jour ou actions en fonction de la suppression du tag
      }

      // Ajoute un gestionnaire d'événements "click" à chaque bouton de fermeture
      closeTags.forEach(function (closeTag) {
        closeTag.addEventListener("click", function () {
          // Supprime l'élément parent correspondant
          closeTag.parentNode.remove();
          removeTag(tag);


            // Met à jour les listes d'appareils et d'ustensiles
            const selectedTags = elementsTag.querySelectorAll(".tag");
          const selectedIngredients = Array.from(selectedTags)
          .filter((tag) =>
          tag.className.includes("tag-ingredients-ingredientsList")
          )
          .map((tag) => tag.innerText.trim());

          const selectedAppliances = Array.from(selectedTags)
            .filter((tag) =>
              tag.className.includes("tag-ingredients-appliancesList")
              )
              .map((tag) => tag.innerText.trim());
              
              const selectedUstensils = Array.from(selectedTags)
              .filter((tag) =>
              tag.className.includes("tag-ingredients-ustensilsList")
              )
              .map((tag) => tag.innerText.trim());
              
              const remainingRecipes = recipes.filter((recipe) => {
                const hasIngredient = recipe.ingredients.some((ingredient) =>
                selectedIngredients.includes(ingredient.ingredient)
                );
                const hasAppliance = selectedAppliances.includes(recipe.appliance);
                const hasUstensil = recipe.ustensils.some((ustensil) =>
                selectedUstensils.includes(ustensil)
                );
                return hasIngredient || hasAppliance || hasUstensil
              });
          displayRecipes(remainingRecipes);

          displayIngredients(
            getIngredients(remainingRecipes),
            remainingRecipes,
            document.querySelector("#ingredientsDropDown")
            );
            displayAppareil(
              getAppareilles(remainingRecipes),
              remainingRecipes,
              document.querySelector("#applianceDropDown")
              );
              displayUstensil(
                getUstensiles(remainingRecipes),
                remainingRecipes,
                document.querySelector("#ustensilsDropDown")
                );
                const noTagsSelected = selectedIngredients.length === 0 && selectedAppliances.length === 0 && selectedUstensils.length === 0;
                if (noTagsSelected) {
                    displayRecipes(recipes);
                    displayIngredients(getIngredients(recipes), recipes, document.querySelector("#ingredientsDropDown"));
                    displayAppareil(getAppareilles(recipes), recipes, document.querySelector("#applianceDropDown"));
                    displayUstensil(getUstensiles(recipes), recipes, document.querySelector("#ustensilsDropDown"));
                    return; // pour sortir tôt de la fonction et ne pas exécuter le code de filtrage suivant
                }
              });
            // Vérifier s'il n'y a pas de tag sélectionné

// Si aucun tag n'est sélectionné, affichez toutes les recettes

// Le code de filtrage existant suit ici...

            });
            
            // Ajoute à nouveau l'événement de clic à chaque élément de listIngredients
            if (option.id == "ingredientsList") {
              filterIngredients(
                ingredients.filter((ing) => ing !== tag),
                recipes,
                option
                );
              } else if (option.id == "appliancesList") {
                filterIngredients(
                  getAppareilles(recipes).filter((appl) => appl !== tag),
                  recipes,
                  option
                  );
                } else {
                  filterIngredients(
                    getUstensiles(recipes).filter((ust) => ust !== tag),
                    recipes,
          option
        );
      }
    });
  });
}
function removeTag(tag) {
  const index = tagbtn.indexOf(tag);
  if (index !== -1) {
    tagbtn.splice(index, 1);
  }
}
let i = 0;

function filterTag(recipes, tag, option) {
  if (option == "ingredientsList") {
    const recipesByIngrefients = recipes.filter((filterTag) =>
      filterTag.ingredients.find((el) => el.ingredient == tag)
    );
    displayAppareil(getAppareilles(recipesByIngrefients));
    displayUstensil(getUstensiles(recipesByIngrefients));
    searchForAllParameters(recipesByIngrefients);
  } else if (option == "appliancesList") {
    const recipesByAppliances = recipes.filter(
      (filterTag) => filterTag.appliance == tag
    );
    displayIngredients(getIngredients(recipesByAppliances));
    displayUstensil(getUstensiles(recipesByAppliances));
    searchForAllParameters(recipesByAppliances);
  } else {
    const recipesByUstensils = recipes.filter((filterTag) =>
      filterTag.ustensils.find((el) => el == tag)
    );
    displayIngredients(getIngredients(recipesByUstensils));
    displayAppareil(getAppareilles(recipesByUstensils));
    searchForAllParameters(recipesByUstensils);
  }
}

function recipeIngredients(recipe, tag, type) {
  let filteredRecipes;

  switch (type) {
    case "ingredientsList":
      filteredRecipes = recipe.filter((el) =>
        tagbtn.every((tag) =>
          el.ingredients.some((item) => item.ingredient === tag)
        )
      );
      break;

    case "appliancesList":
      filteredRecipes = recipe.filter((el) =>
        tagbtn.every((tag) => el.appliance === tag)
      );
      break;

    case "ustensilsList":
      filteredRecipes = recipe.filter((el) =>
        tagbtn.every((tag) => el.ustensils.includes(tag))
      );
      break;

    default:
      console.log("Type not recognized");
      return;
  }
  displayRecipes(filteredRecipes);
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
      displayIngredients(getIngredients(filteredArr));
      displayAppareil(getAppareilles(filteredArr));
    } else {
      displayRecipes(recipes);
      displayUstensil(getUstensiles(recipes));
      displayIngredients(getIngredients(recipes));
      displayAppareil(getAppareilles(recipes));
    }
  });
}

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
