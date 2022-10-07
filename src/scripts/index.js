import { recipes } from "./../assets/data/data";
import RecipeMethod from "./templates/RecipeMethod";
import Recipe from "./models/Recipe";
import SorterMethod from "./templates/SorterMethod";
import InputSearch from "./models/InputSearch";

import "../sass/main.scss";

const init = () => {
  const $recipesSection = document.querySelector("#recipes");
  const $tagsSection = document.querySelector("#tags");
  const $sortersSection = document.querySelector("#sort");

  const recipesObj = recipes.map((recipe, index) => new Recipe(recipe, index));
  const recipeMethod = new RecipeMethod(recipesObj, $recipesSection);

  const sorterMethod = new SorterMethod(
    recipeMethod,
    $sortersSection,
    $tagsSection
  );

  const mainSearch = new InputSearch(recipeMethod, sorterMethod, 3);
  mainSearch.createInputSearch();
};

init();
