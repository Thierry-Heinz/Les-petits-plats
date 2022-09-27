import { recipes } from "./../assets/data/data";
import Recipe from "./models/Recipe";
import SorterMethod from "./templates/SorterMethod";
import InputSearch from "./models/InputSearch";

import "../sass/main.scss";
import SingleSorter from "./models/SingleSorter";

const init = () => {
  const recipesSection = document.querySelector("#recipes");

  const recipesObj = recipes.map((recipe, index) => {
    const recipeObj = new Recipe(recipe, index);
    recipesSection.appendChild(recipeObj.createCard(index));
    return recipeObj;
  });

  const sorterMethod = new SorterMethod(recipesObj);
  const ingredientsSorter = new SingleSorter(
    sorterMethod.createIngredientsArray(),
    "Ingrédients",
    "ingredients"
  );
  const appliancesSorter = new SingleSorter(
    sorterMethod.createAppliancesArray(),
    "Appareils",
    "appliances"
  );
  const ustensilsSorter = new SingleSorter(
    sorterMethod.createUstensilsArray(),
    "Ustensiles",
    "ustensils"
  );

  const mainSearch = new InputSearch();
  mainSearch.createInputSearch();
};

init();
