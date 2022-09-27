export default class InputSearch {
  constructor() {
    this.id = "searchInput";
    this.$wrapper = document.createElement("input");
  }

  //Input creation function
  //create svg icon
  createSvgIcon() {
    const $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const $use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    const $title = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "title"
    );

    $svg.setAttribute("role", "img");
    $svg.setAttribute("aria-labelledby", "glass-title");
    $svg.classList.add("glass-icon");

    $title.id = "glass-title";
    $title.innerText = "Rechercher une recette";

    $use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#glass");

    $svg.append($title, $use);
    return $svg;
  }
  createInputSearch() {
    const $searchSection = document.querySelector("#search");

    const $label = document.createElement("label");
    $label.setAttribute("for", this.id);

    const $icon = this.createSvgIcon();
    this.$wrapper.setAttribute("placeholder", "Rechercher une recette");
    this.$wrapper.id = this.id;
    this.$wrapper.classList.add("main-search");

    $label.append($icon, this.$wrapper);
    $searchSection.append($label);
  }
}
