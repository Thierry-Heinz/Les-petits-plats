export default class SearchApiVA {
  constructor(recipeMethod, sortersArray) {
    this.recipeMethod = recipeMethod;
    this.sortersArray = sortersArray;
  }
  search(inputSearch) {
    if (typeof inputSearch == "string") {
      // Check if inputSearch is in title
      const matchTitle = this.recipeMethod.initialData.filter((data) => {
        return data.name.toLowerCase().includes(inputSearch.toLowerCase());
      });
      const matchDescription = this.recipeMethod.initialData.filter((data) => {
        return data.description
          .toLowerCase()
          .includes(inputSearch.toLowerCase());
      });
      const matchIngredients = this.recipeMethod.initialData.filter((data) => {
        return data.ingredients.find((ingredient) => {
          return ingredient.ingredient
            .toLowerCase()
            .includes(inputSearch.toLowerCase());
        });
      });

      var result = [
        ...new Set([...matchTitle, ...matchDescription, ...matchIngredients]),
      ];
    }
    return result;
  }
}
