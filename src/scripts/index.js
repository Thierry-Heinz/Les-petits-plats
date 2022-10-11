import { recipes } from "./../assets/data/data";
import RecipeMethod from "./templates/RecipeMethod";
import Recipe from "./models/Recipe";
import SorterMethod from "./templates/SorterMethod";
import SingleSorter from "./models/SingleSorter";
import InputSearch from "./models/InputSearch";

import "../sass/main.scss";

const init = () => {
  //Ref. to DOM elements.
  const $recipesSection = document.querySelector("#recipes");
  const $tagsSection = document.querySelector("#tags");
  const $sortersSection = document.querySelector("#sort");

  //creating all the recipes obj.
  const recipesObj = recipes.map((recipe, index) => new Recipe(recipe, index));
  // creating data set of recipes for processing.
  const recipeMethod = new RecipeMethod(recipesObj, $recipesSection);

  //Instantiate the common methods for the different sorters.
  const sorterMethod = new SorterMethod(
    recipeMethod,
    $sortersSection,
    $tagsSection
  );

  //Instantiate each sorters.
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

  //Create a "state" list of sorters and pass it to the common sorter method for future update.
  const sortersArray = [ingredientsSorter, appliancesSorter, ustensilsSorter];
  sorterMethod.sortersArray = sortersArray;

  //Instantiate the main search, and ref. to the common sorter methods.
  const mainSearch = new InputSearch(sorterMethod, 3);
  mainSearch.createInputSearch();
};

init();
