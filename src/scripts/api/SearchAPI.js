export default class SearchApi {
  constructor(recipeMethod) {
    this.recipeMethod = recipeMethod;
  }
  search(inputSearch, type) {
    if (typeof inputSearch == "string") {
      inputSearch = inputSearch.toLowerCase();

      // Check if call is from "Main search" or by tag click
      if (type == "main") {
        //Main search always made on initial data set
        var data = this.recipeMethod.initialData;
        const matchTitle = this.findByTitle(data, inputSearch);
        const matchDescription = this.findByDescription(data, inputSearch);
        const matchIngredients = this.findByIngredients(data, inputSearch);
        var result = [
          ...new Set([...matchTitle, ...matchDescription, ...matchIngredients]),
        ];
      } else {
        //tag search made on the result of "Main search"
        var data = this.recipeMethod.tempData;
        if (type == "ingredients") {
          var result = this.findByIngredients(data, inputSearch);
        }
        if (type == "appliances") {
          var result = this.findByAppliances(data, inputSearch);
        }
        if (type == "ustensils") {
          var result = this.findByUstensils(data, inputSearch);
        }
      }
    }
    return result;
  }

  /***
   *
   * Private method for seach API by type
   *
   */
  findByTitle(data, value) {
    return data.filter((data) => {
      return data.name.toLowerCase().includes(value);
    });
  }
  findByDescription(data, value) {
    return data.filter((data) => {
      return data.description.toLowerCase().includes(value);
    });
  }
  findByIngredients(data, value) {
    return data.filter((data) => {
      return data.ingredients.find((ingredient) => {
        return this.isExactMatch(ingredient.ingredient.toLowerCase(), value);
      });
    });
  }
  findByAppliances(data, value) {
    return data.filter((data) => {
      return data.appliance.toLowerCase().includes(value);
    });
  }
  findByUstensils(data, value) {
    return data.filter((data) => {
      return data.ustensils.find((ustensil) => {
        return ustensil.toLowerCase().includes(value);
      });
    });
  }
  escapeRegExpMatch(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  isExactMatch(str, match) {
    return new RegExp(`\\b${this.escapeRegExpMatch(match)}\\b`).test(str);
  }
}
