export default function SearchApiVB(recipeMethod, sortersArray) {
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
      for (let j = 0; j < recipeMethod.initialData[i].ingredients.length; j++) {
        if (
          includeString(
            recipeMethod.initialData[i].ingredients[j].ingredient,
            inputSearch.toLowerCase()
          )
        ) {
          var matchIngredient =
            recipeMethod.initialData[i].ingredients[j].ingredient;
        }
        if (
          matchIngredient ==
          recipeMethod.initialData[i].ingredients[j].ingredient
        ) {
          matchIngredients.push(recipeMethod.initialData[i]);
        }
      }
    }
    console.log(matchTitle);
    console.log(matchDescription);
    console.log(matchIngredients);

    const matchResult = aggregateResults(
      [].concat(matchTitle, matchDescription, matchIngredients)
    );
    console.log(matchResult);
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
    if (string.toLowerCase().indexOf(value) !== -1) {
      return true;
    } else {
      return false;
    }
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
