export default class RecipeMethod {
  constructor(initialData, $wrapper) {
    this.initialData = initialData;
    this.tempData = initialData;
    this.$wrapper = $wrapper;
    this.$sectionInfo = document.querySelector("#infos");
    this.$textHolder = document.createElement("h3");
    this.populateRecipes(this.initialData);
  }
  clearRecipes() {
    this.$wrapper.innerHTML = "";
  }
  clearInfos() {
    this.$textHolder.remove();
  }
  updateRecipes(newData) {
    // If the newData parameter is not set
    if (newData == undefined) {
      this.clearRecipes();
      this.clearInfos();
      this.initialData.forEach((data, index) => {
        const $newRecipe = data.createCard(index);
        this.$wrapper.appendChild($newRecipe);
      });
      this.tempData = this.initialData;
    } else {
      // or Check if newData parameter is an Array
      if (Array.isArray(newData)) {
        // Then if the result from search is empty
        if (newData.length == 0) {
          this.clearRecipes();
          this.$textHolder.textContent =
            "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
          this.$sectionInfo.appendChild(this.$textHolder);
        } else {
          this.clearRecipes();
          this.clearInfos();
          this.populateRecipes(newData);
        }
        this.tempData = newData;
      }
    }
  }

  populateRecipes(recipes) {
    recipes.forEach((data, index) => {
      const $newRecipe = data.createCard(index);
      this.$wrapper.appendChild($newRecipe);
    });
  }
}
