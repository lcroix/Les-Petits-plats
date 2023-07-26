function recipeFactory(data) {
  const { name, ingredients, time, description } = data;

    
  function getRecipeCardDOM() {



    //html
    const recipe = document.createElement("div");
    const fakeImg = document.createElement("img");
    const infoContainer = document.createElement("div");
    const infoFirstDiv = document.createElement("div");
    const recipeName = document.createElement("p");
    const timer = document.createElement("img");
    const textTime = document.createElement("p");
    const infoSecondDiv = document.createElement("div");
    const ingredientsDiv = document.createElement("div");
    const descriptionText = document.createElement('p');

    //attribute
    recipe.setAttribute('class', 'recipe');
    fakeImg.setAttribute('class', 'fakeImg');
    fakeImg.setAttribute('src','assets/logo_lespetitsplats.png')
    infoContainer.setAttribute('class', 'infoContainer');
    infoFirstDiv.setAttribute('class','infoFirstDiv');
    recipeName.setAttribute('class', 'recipeName');
    timer.setAttribute('src', 'assets/time.svg' );
    timer.setAttribute('class', 'timer' );
    textTime.setAttribute('class','textTime');
    infoSecondDiv.setAttribute('class','infoSecondDiv');
    ingredientsDiv.setAttribute('class','ingredients');
    descriptionText.setAttribute('class', 'descriptionText');
    
    //data
    recipeName.textContent = name;
    textTime.textContent = time + 'min';
    descriptionText.textContent = description;


    

    for (let i = 0; i < ingredients.length; i++) {
      let element = ingredients[i];
      const ingredient = document.createElement("p");
      ingredient.setAttribute("class", "ingredient");
      ingredient.textContent =
        element.ingredient +
        ": " +
        (element.quantity ? element.quantity : "") +
        (element.unit ? element.unit : "");
      ingredientsDiv.appendChild(ingredient);
    }
   // appendChild
   recipe.appendChild(fakeImg);
   recipe.appendChild(infoContainer);
   infoContainer.appendChild(infoFirstDiv);
   infoFirstDiv.appendChild(recipeName);
   infoFirstDiv.appendChild(timer);
   infoFirstDiv.appendChild(textTime);
   infoContainer.appendChild(infoSecondDiv);
   infoSecondDiv.appendChild(ingredientsDiv);
   infoSecondDiv.appendChild(descriptionText);
   
   
   return recipe
   
  }
  
  return {getRecipeCardDOM}
}
function noRecipes() {
  const recipe = document.createElement("div");
  const noRecipe = document.createElement("p");
  recipe.appendChild(noRecipe);
  noRecipe.textContent = 'Aucune recette ne correspond à votre critère…';
  return noRecipe;
}