export default class SearchApi {
  constructor(recipeMethod) {
    this.recipeMethod = recipeMethod;
  }
  search(inputSearch, type) {
    if (typeof inputSearch == "string") {
      inputSearch = inputSearch.toLowerCase();
      if (type == "main") {
        var data = this.recipeMethod.initialData;
        console.log(inputSearch, data);
        const matchTitle = this.findByTitle(data, inputSearch);
        const matchDescription = this.findByDescription(data, inputSearch);
        const matchIngredients = this.findByIngredients(data, inputSearch);
        var result = [
          ...new Set([...matchTitle, ...matchDescription, ...matchIngredients]),
        ];
      } else {
        var data = this.recipeMethod.tempData;
        console.log(inputSearch, data);
        if (type == "ingredients") {
          console.log("search by ingredients tags");
          var result = this.findByIngredients(data, inputSearch);
        }
        if (type == "appliances") {
          console.log("search by appliances tags");
          var result = this.findByAppliances(data, inputSearch);
        }
        if (type == "ustensils") {
          console.log("search by ustensils tags");
          var result = this.findByUstensils(data, inputSearch);
        }
      }
    }
    console.log(result);
    return result;
  }

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
