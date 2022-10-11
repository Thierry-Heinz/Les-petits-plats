/***
 *
 * Common Methods for Recipes
 *
 */

export default class RecipeMethod {
  constructor(initialData, $wrapper) {
    // The list of Recipes at Init.
    this.initialData = initialData;
    // Copy of the initial Data set for update
    this.tempData = initialData;
    this.$wrapper = $wrapper;
    this.$sectionInfo = document.querySelector("#infos");
    this.$textHolder = document.createElement("h3");
    // Init. Recipes at first display
    this.populateRecipes(this.initialData);
  }
  // remove all recipes
  clearRecipes() {
    this.$wrapper.innerHTML = "";
  }
  // Clear the "not found" message
  clearInfos() {
    this.$textHolder.remove();
  }
  // Update the recipes, by recreating it with a new set of data
  updateRecipes(newData) {
    // If the newData parameter is not set
    if (newData == undefined) {
      this.clearRecipes();
      this.clearInfos();
      this.initialData.forEach((data, index) => {
        const $newRecipe = data.createCard(index);
        this.$wrapper.appendChild($newRecipe);
      });
      //reset tempData to initial state
      this.tempData = this.initialData;
    } else {
      //Check if newData parameter is an Array
      if (Array.isArray(newData)) {
        if (newData.length == 0) {
          // Then if the result from search is empty display "not found" message
          this.clearRecipes();
          this.$textHolder.textContent =
            "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
          this.$sectionInfo.appendChild(this.$textHolder);
        } else {
          // If data is provided recreate the UI
          this.clearRecipes();
          this.clearInfos();
          this.populateRecipes(newData);
        }
        //replace the tempData with new data set (for tag search)
        this.tempData = newData;
      }
    }
  }

  //Create the recipes based on recipes data provided
  populateRecipes(recipes) {
    recipes.forEach((data, index) => {
      const $newRecipe = data.createCard(index);
      this.$wrapper.appendChild($newRecipe);
    });
  }
}
