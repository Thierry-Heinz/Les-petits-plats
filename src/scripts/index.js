import { recipes } from "./../assets/data/data";
import RecipeMethod from "./templates/RecipeMethod";
import Recipe from "./models/Recipe";
import SorterMethod from "./templates/SorterMethod";
import SingleSorter from "./models/SingleSorter";
import InputSearch from "./models/InputSearch";

import "../sass/main.scss";

const init = () => {
  const $recipesSection = document.querySelector("#recipes");
  const $tagSection = document.querySelector("#tags");
  const $sortersSection = document.querySelector("#sort");

  const recipesObj = recipes.map((recipe, index) => new Recipe(recipe, index));
  const recipeMethod = new RecipeMethod(recipesObj, $recipesSection);
  recipeMethod.populateRecipes(recipesObj);

  const sorterMethod = new SorterMethod(
    recipeMethod,
    $sortersSection,
    $tagSection
  );

  const ingredientsSorter = new SingleSorter(
    sorterMethod,
    "Ingrédients",
    "ingredients"
  );
  const appliancesSorter = new SingleSorter(
    sorterMethod,
    "Appareils",
    "appliances"
  );
  const ustensilsSorter = new SingleSorter(
    sorterMethod,
    "Ustensiles",
    "ustensils"
  );
  const sortersArray = [ingredientsSorter, appliancesSorter, ustensilsSorter];

  const mainSearch = new InputSearch(recipeMethod, sortersArray, 3);
  mainSearch.createInputSearch();
};

init();
