import { recipes } from "./../assets/data/data";
import RecipeMethod from "./templates/RecipeMethod";
import Recipe from "./models/Recipe";
import SorterMethod from "./templates/SorterMethod";
import SingleSorter from "./models/SingleSorter";
import InputSearch from "./models/InputSearch";

import "../sass/main.scss";

const init = () => {
  const $recipesSection = document.querySelector("#recipes");

  const recipesObj = recipes.map((recipe, index) => {
    const recipeObj = new Recipe(recipe, index);
    $recipesSection.appendChild(recipeObj.createCard(index));
    return recipeObj;
  });

  const recipeMethod = new RecipeMethod(recipesObj, $recipesSection);

  const sorterMethod = new SorterMethod(recipeMethod);

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
