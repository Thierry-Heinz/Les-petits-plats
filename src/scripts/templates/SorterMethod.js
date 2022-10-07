/***
 *
 * Sorter
 *
 */

export default class SorterMethod {
  constructor(recipeMethod) {
    this.recipeMethod = recipeMethod;
    this.$sorterWrapper = document.querySelector("#sort");
    this.$tagsWrapper = document.querySelector("#tags");
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

  /**
   * Sorter creation functions
   *
   **/
  //create the wrapper for the dropdown
  createDropdown(title, label) {
    const $dropdown = document.createElement("div");
    $dropdown.classList.add("dropdown", label.toLowerCase());
    $dropdown.id = `sorter-select-${label.toLowerCase()}`;
    $dropdown.setAttribute("aria-label", `Filtre des ${title}`);
    $dropdown.setAttribute("tabindex", "1");
    $dropdown.setAttribute("aria-haspopup", "listbox");
    return $dropdown;
  }

  //create the button that toggle the dropdown
  createdropdownToggle(title, label) {
    const $dropdownToggle = document.createElement("button");
    $dropdownToggle.classList.add(
      "dropdown-toggle",
      label.toLowerCase(),
      "dropdown-el"
    );
    $dropdownToggle.setAttribute("data-value", label);

    const $textHolder = document.createElement("span");
    $textHolder.classList.add("text-holder");
    $textHolder.textContent = title;

    $dropdownToggle.appendChild($textHolder);
    //$dropdownToggle.innerHTML += $icon;

    return $dropdownToggle;
  }
  //create list item
  createDropdownItem($menu, label, options) {
    options.forEach((option, index) => {
      const $li = document.createElement("li");
      $li.classList.add("dropdown-item");
      $li.setAttribute("data-value", option.toLowerCase());
      $li.setAttribute("tabindex", "1");
      $li.id = `option-${index}-${label}`;

      const $textHolder = document.createElement("span");
      $textHolder.classList.add("text-holder");
      $textHolder.textContent = option;

      $li.appendChild($textHolder);

      const $icon = `
          <svg role="img" class="dropdown-arrow-icon down" aria-labelledby="dropdown-arrow-title-${index}">
            <title id="dropdown-arrow-title-${index}">Fermer le menu de tri</title>
            <use xlink:href="#dropdown-arrow" ></use>
          </svg>     
    `;
      $menu.appendChild($li);
      this.handleClickMenu(label, $li, option);
    });
  }

  //create the list element that contain the sorter options
  createDropdownMenu(label, options) {
    const $dropdownMenu = document.createElement("ul");
    $dropdownMenu.classList.add(
      "sorter-select",
      "dropdown-menu",
      label.toLowerCase()
    );
    $dropdownMenu.setAttribute("role", "listbox");
    $dropdownMenu.setAttribute("tabindex", "-1");
    $dropdownMenu.setAttribute("aria-activedescendant", `option-0-${label}`);
    $dropdownMenu.setAttribute("aria-owns", `option-0-${label}`);
    $dropdownMenu.setAttribute("aria-roledescription", `Trier les ${label}`);
    $dropdownMenu.setAttribute("aria-labelledBy", `listbox-label-${label}`);

    this.createDropdownItem($dropdownMenu, label, options);

    return $dropdownMenu;
  }
  //create the input
  createdropdownInput(title, label) {
    this.$tagsWrapper.style.display = "none";
    const id = `input-${label.toLowerCase()}`;
    const $label = document.createElement("label");
    $label.classList.add("sorter-label-input");
    $label.setAttribute("for", id);
    const $input = document.createElement("input");
    $input.id = id;
    $input.classList.add("sorter-input", "dropdown-el");
    $input.placeholder = title;

    $label.appendChild($input);
    return $label;
  }
  //create svg icon
  createSvgIcon(label, text, href) {
    const id = `${href}-${label.toLowerCase()}`;
    const $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const $use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    const $title = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "title"
    );

    $svg.setAttribute("role", "img");
    $svg.setAttribute("aria-labelledby", id);
    $svg.classList.add(`${href}-icon`);

    $title.id = id;
    $title.innerText = `${text} ${label}`;

    $use.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      `#${href}`
    );

    $svg.append($title, $use);
    return $svg;
  }
  // create the sorter
  createSorter(title, label, options) {
    const $listLabel = document.createElement("h3");
    $listLabel.classList.add("screen-reader");
    $listLabel.innerText = title;
    $listLabel.id = `listbox-label-${label}`;

    const $dropdownWrapper = this.createDropdown(title, label);
    const $dropdownInput = this.createdropdownInput(title, label);
    const $dropdownMenu = this.createDropdownMenu(label, options);

    const $relativeWrapper = document.createElement("div");
    $relativeWrapper.classList.add("dropdown-wrapper", label.toLowerCase());
    $relativeWrapper.setAttribute("role", "listbox");

    const $icon = this.createSvgIcon(label, "Ouvrir le menu", "angle-down");

    $dropdownWrapper.append($dropdownInput, $icon);
    $relativeWrapper.append($listLabel, $dropdownWrapper, $dropdownMenu);
    this.$sorterWrapper.appendChild($relativeWrapper);
    this.toggleDropdown(
      $dropdownWrapper,
      $dropdownInput,
      $dropdownMenu,
      $icon,
      title
    );
    return $relativeWrapper;
  }
  createTag(label, option) {
    const $tag = document.createElement("div");
    $tag.classList.add("tag", label);
    $tag.setAttribute("data-option", option.toLowerCase());
    const $textHolder = document.createElement("span");
    $textHolder.innerText = option;
    const $icon = this.createSvgIcon(option, "Supprimer le tag", "close");
    $tag.append($textHolder, $icon);
    this.$tagsWrapper.appendChild($tag);
    this.handleRemoveTag($tag, $icon);
  }

  // click listener on the toggle button for the dropdown
  toggleDropdown(
    $dropdownWrapper,
    $dropdownInput,
    $dropdownMenu,
    $icon,
    title
  ) {
    const that = this;

    $icon.addEventListener("click", function (e) {
      const $dropdowns = document.querySelectorAll(".dropdown");
      const expanded = $dropdownWrapper.getAttribute("aria-expanded");
      if (expanded == "true") {
        $dropdownWrapper.setAttribute("aria-expanded", "false");
        $dropdownMenu.classList.toggle("show");
        $dropdownWrapper.style.width = "100%";
        $dropdownInput
          .querySelector(".sorter-input")
          .setAttribute("placeholder", title);
        this.classList.remove("down");
      } else {
        $dropdowns.forEach(($dropdown) => {
          $dropdown.style.width = "100%";
          $dropdown.nextElementSibling.classList.remove("show");
        });
        $dropdownWrapper.setAttribute("aria-expanded", "true");
        $dropdownMenu.classList.toggle("show");
        $dropdownWrapper.style.width = `${$dropdownMenu.offsetWidth}px`;
        $dropdownMenu.firstChild.focus();
        $dropdownInput
          .querySelector(".sorter-input")
          .setAttribute("placeholder", `Rechercher un ${title}`);
        this.classList.add("down");
      }
    });
  }

  // Tags Handle
  handleClickMenu(label, $dropdownItem, option) {
    const that = this;
    $dropdownItem.addEventListener("click", (e) => {
      this.$tagsWrapper.style.display = "flex";
      this.createTag(label, option);
      console.log(that.recipeMethod.tempData);
    });
  }
  handleRemoveTag($tag, $icon) {
    $icon.addEventListener("click", function () {
      $tag.remove();
      const $tagsContainer = document.querySelector("#tags");
      if (!$tagsContainer.hasChildNodes()) {
        $tagsContainer.style.display = "none";
      }
    });
  }
}
