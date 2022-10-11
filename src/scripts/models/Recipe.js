/**
 *
 * Recipe Model
 *
 */

export default class Recipe {
  constructor(data, index) {
    this.id = data.id;
    this.index = index;
    this.name = data.name;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    this.time = data.time;
    this.description = data.description;
    this.appliance = data.appliance;
    this.ustensils = data.ustensils;
  }

  /**
   *
   * Creating the Recipe
   *
   */
  createIngredientsList() {
    const $list = document.createElement("ul");
    for (let i = 0; i < this.ingredients.length; i++) {
      var $listItem = document.createElement("li");
      var $b = document.createElement("b");
      var $span = document.createElement("span");
      $b.innerText = `${this.ingredients[i].ingredient}`;
      if (this.ingredients[i].quantity) {
        $b.innerText += ": ";
        $span.innerText = this.ingredients[i].quantity;
        if (this.ingredients[i].unit) {
          $span.innerText += ` ${this.ingredients[i].unit}`;
        }
      }
      $listItem.append($b, $span);
      $list.appendChild($listItem);
    }

    return $list;
  }

  createTimeEl(index) {
    const $time = document.createElement("span");
    $time.classList.add("time");

    const $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const $use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    const $title = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "title"
    );

    $svg.setAttribute("role", "img");
    $svg.setAttribute("aria-labelledby", `clock-title-${index}`);
    $svg.classList.add("clock-icon");

    $title.id = `clock-title-${index}`;
    $title.innerText = "Temps de la recette";

    $use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#clock`);

    $svg.append($title, $use);

    const $span = document.createElement("span");
    $span.innerText = `${this.time} min`;

    $time.append($svg, $span);

    return $time;
  }

  // Recipe creation function
  createCard(index) {
    const $card = document.createElement("article");
    $card.classList.add("card");

    const $header = document.createElement("header");
    $header.classList.add("thumb");

    const $footer = document.createElement("footer");
    $footer.classList.add("infos");

    const $title = document.createElement("h2");
    $title.innerText = this.name;

    const $time = this.createTimeEl(index);

    const $ingredientsList = this.createIngredientsList();
    $ingredientsList.classList.add("ingredients");

    const $description = document.createElement("p");
    $description.classList.add("description");
    $description.innerText = this.description;

    const $row1 = document.createElement("div");
    $row1.classList.add("row", "row1");
    const $row2 = document.createElement("div");
    $row2.classList.add("row", "row2");

    $row1.append($title, $time);
    $row2.append($ingredientsList, $description);

    $footer.append($row1, $row2);

    $card.append($header, $footer);

    return $card;
  }
}
