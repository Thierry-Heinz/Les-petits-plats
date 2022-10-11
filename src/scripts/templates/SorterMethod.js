import SearchApi from "../api/SearchAPI";

/***
 *
 * Sorter
 *
 */

export default class SorterMethod {
  constructor(recipeMethod, $sorterSection, $tagsSection) {
    this.recipeMethod = recipeMethod;
    this.tempTagsList = [];
    this.SearchApi = new SearchApi(this.recipeMethod);
    this.$sorterWrapper = $sorterSection;
    this.$tagsWrapper = $tagsSection;
  }

  // Utility function
  findUnique(arr) {
    const a = [];
    for (let i = 0; i < arr.length; i++) {
      if (a.indexOf(arr[i]) === -1 && arr[i] !== "") {
        a.push(arr[i]);
      }
    }
    return a;
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  createSorterData(type, data) {
    if (!data) {
      data = this.recipeMethod.initialData;
    }
    const tempsArr = [];
    switch (type) {
      case "ingredients":
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].ingredients.length; j++) {
            tempsArr.push(
              this.capitalizeFirstLetter(
                data[i].ingredients[j].ingredient.toLowerCase()
              )
            );
          }
        }
        break;
      case "appliances":
        for (let i = 0; i < data.length; i++) {
          tempsArr.push(
            this.capitalizeFirstLetter(data[i].appliance.toLowerCase())
          );
        }
        break;
      case "ustensils":
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].ustensils.length; j++) {
            tempsArr.push(
              this.capitalizeFirstLetter(data[i].ustensils[j].toLowerCase())
            );
          }
        }
        break;
      default:
        break;
    }
    return this.findUnique(tempsArr);
  }

  //Manage the different cases of search for the sorters and recipes
  // " The Brain "
  updateSortersManager(type, option, that) {
    if (type == undefined) {
      this.updateAllSorters();
      this.recipeMethod.updateRecipes();
    } else {
      const result = this.callSearch(type, option);
      console.log(result);
      this.updateAllSorters(result, option);
      this.recipeMethod.updateRecipes(result);
    }

    if (this.tempTagsList.length == 0) {
      this.$tagsWrapper.classList.remove("show");
    } else {
      this.tempTagsList.forEach((tag) => {
        console.log(tag);
        const result = this.callSearch(tag.label, tag.option);
        console.log(result);
        this.updateAllSorters(result, tag.option, that);
        this.recipeMethod.updateRecipes(result);
      });
    }
  }

  //Update all the sorters
  updateAllSorters(newData, option, that) {
    // console.log(newData, option);
    this.clearSorters();
    if (newData == undefined) {
      this.sortersArray.forEach((sorter) => {
        sorter.updateSorter(this.recipeMethod.initialData, option, that);
      });
    } else {
      this.sortersArray.forEach((sorter) => {
        sorter.updateSorter(newData, option, that);
      });
    }
  }

  //
  updateAllSortersInput(value) {
    this.sortersArray.forEach((sorter) => {
      sorter.updateSorterInput(value);
    });
  }
  clearSorters() {
    this.$sorterWrapper.innerHTML = "";
  }
  callSearch(label, value) {
    return this.SearchApi.search(value, label);
  }
}
