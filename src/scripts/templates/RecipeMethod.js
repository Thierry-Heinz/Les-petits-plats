export default class RecipeMethod {
  constructor(initialData, $wrapper) {
    this.initialData = initialData;
    this.tempData;
    this.$wrapper = $wrapper;
  }
  clearRecipes() {
    this.$wrapper.innerHTML = "";
  }
  updateRecipes(newData) {
    console.log(this.isEqual(newData, this.tempData));
    if (!this.isEqual(newData, this.tempData)) {
      this.clearRecipes();
      newData.forEach((data, index) => {
        const $newRecipe = data.createCard(index);
        this.$wrapper.appendChild($newRecipe);
      });
    }
    this.tempData = newData;
  }
  isEqual(newArr, oldArr) {
    if (Array.isArray(oldArr)) {
      if (newArr.length != oldArr.length) {
        return false;
      } else {
        // Comparing each element of array
        for (var i = 0; i < newArr.length; i++)
          if (newArr[i] != oldArr[i]) return false;
        return true;
      }
    } else {
      return false;
    }
  }
}
