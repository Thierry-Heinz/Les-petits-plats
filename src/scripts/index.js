import { recipes } from "./../assets/data/data";
import RecipeMethod from "./templates/RecipeMethod";
import Recipe from "./models/Recipe";
import SorterMethod from "./templates/SorterMethod";
import SingleSorter from "./models/SingleSorter";
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
  sorterMethod.sortersArray = sortersArray;

  const mainSearch = new InputSearch(sorterMethod, 3);
  mainSearch.createInputSearch();
};

init();
