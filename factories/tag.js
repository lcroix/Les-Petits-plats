function dropdownBehaviour(data) {
  const ingredientSet = new Set();
  const ustensileSet = new Set();
  const appareilSet = new Set();

//   const optionUstensiles = document.querySelector("#options_ustensile");
//   const optionAppareil = document.querySelector("#options_appareils");
  const { ingredients } = data;
  ingredients.forEach((element) => {
    const { ingredient } = element;

    ingredientSet.add(ingredient);
  });

  const { appliance } = data;

  appareilSet.add(appliance);

  const { ustensils } = data;

  ustensils.forEach((element) => {
    ustensileSet.add(element);
  });

  ingredientSet.forEach((element) => {
    const optionIngredients = document.querySelector("#ingredientsList");
    const divIngredient = document.createElement("div");
    divIngredient.setAttribute("class", "option_ingredient");
    divIngredient.setAttribute("id", element);
    divIngredient.textContent = element;
    optionIngredients.appendChild(divIngredient);
  });
  const cheveroUp = document.querySelectorAll(".dropdown-arrow_up");
  const cheveroDown = document.querySelectorAll(".dropdown-arrow_down");
  cheveroUp.addEventListener("click", function () {
    console.log("test up");
    specific.classList.add("display-none");
    swapChevron();
  });
  cheveroDown.addEventListener("click", function () {
    specific.classList.remove("display-none");
    swapChevron();
  });

  function swapChevron() {
    if (!cheveroDown.classList.contains("display-none")) {
      cheveroDown.classList.add("display-none");
      cheveroUp.classList.remove("display-none");
    } else {
      cheveroUp.classList.add("display-none");
      cheveroDown.classList.remove("display-none");
    }
  };


  const divTagAdd = document.createElement("div");
  divTagAdd.setAttribute("class", "");
}
