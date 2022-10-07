export default function SearchApiVB(recipeMethod) {
  function search(inputSearch) {
    const matchTitle = filter(
      recipeMethod.initialData,
      inputSearch.toLowerCase(),
      "name",
      includeString
    );
    const matchDescription = filter(
      recipeMethod.initialData,
      inputSearch.toLowerCase(),
      "description",
      includeString
    );

    const matchIngredients = [];
    for (let i = 0; i < recipeMethod.initialData.length; i++) {
      var matchIngredient = filter(
        recipeMethod.initialData[i].ingredients,
        inputSearch.toLowerCase(),
        "ingredient",
        includeString
      );
      if (matchIngredient.length) {
        matchIngredients.push(recipeMethod.initialData[i]);
      }
    }

    const matchResult = aggregateResults(
      [].concat(matchTitle, matchDescription, matchIngredients)
    );
    return matchResult;
  }

  function filter(array, value, property, callback) {
    const filteredArray = [];
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i][property], value)) {
        filteredArray.push(array[i]);
      }
    }
    return filteredArray;
  }

  function includeString(string, value) {
    return string.toLowerCase().indexOf(value) !== -1;
  }

  function aggregateResults(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (newArray.indexOf(array[i]) === -1 && array[i] !== "") {
        newArray.push(array[i]);
      }
    }
    return newArray;
  }

  return {
    search,
  };
}
