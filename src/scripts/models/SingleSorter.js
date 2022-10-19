/**
 *
 * Single Sorter
 *
 */

export default class SingleSorter {
  constructor(sorterMethod, title, label) {
    //Access to common methods for the sorters
    this.sorterMethod = sorterMethod;
    this.title = title;
    this.label = label;

    // Init. data for each of the sorter menu
    this.initialSorterData = this.sorterMethod.createSorterData(this.label);
    // Make a copy that will be updated
    this.tempSorterData = this.initialSorterData;

    this.$input = document.createElement("input");
    this.$relativeWrapper = document.createElement("div");
    this.$icon = this.createSvgIcon(label, "Ouvrir le menu", "angle-down");
    this.$dropdownWrapper = this.createDropdown(this.title, this.label);
    this.$dropdownMenu = this.createDropdownMenu(label, this.initialSorterData);

    //Init. and display the sorter at first display
    this.$sorter = this.createSorter(
      this.title,
      this.label,
      this.initialSorterData
    );
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
    return $dropdownToggle;
  }

  //create each list item based on the options
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
    if (options == undefined) {
      var options = this.initialSorterData;
    }
    this.createDropdownItem($dropdownMenu, label, options);
    return $dropdownMenu;
  }

  //create the input for the dropdown
  createDropdownInput(title, label) {
    const id = `input-${label.toLowerCase()}`;
    const $label = document.createElement("label");
    $label.classList.add("sorter-label-input");
    $label.setAttribute("for", id);
    this.$input.id = id;
    this.$input.classList.add("sorter-input", "dropdown-el");
    this.$input.placeholder = title;

    $label.appendChild(this.$input);
    this.handleSorterInput();
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
  // Create the sorter
  createSorter(title, label, options) {
    const $listLabel = document.createElement("h3");
    $listLabel.classList.add("screen-reader");
    $listLabel.innerText = title;
    $listLabel.id = `listbox-label-${label}`;
    const $dropdownInput = this.createDropdownInput(title, label);
    this.$relativeWrapper.classList.add(
      "dropdown-wrapper",
      label.toLowerCase()
    );
    this.$relativeWrapper.setAttribute("role", "listbox");
    // if data provided
    if (options.length > 0) {
      this.$dropdownWrapper.append($dropdownInput, this.$icon);
      this.$relativeWrapper.append(
        $listLabel,
        this.$dropdownWrapper,
        this.$dropdownMenu
      );
      this.handleClickDropdown();
    } else {
      this.$dropdownWrapper.append($dropdownInput);
      this.$relativeWrapper.append($listLabel, this.$dropdownWrapper);
    }

    this.sorterMethod.$sorterWrapper.appendChild(this.$relativeWrapper);
    return this.$relativeWrapper;
  }
  // Create the tag (based on the click of the sorter menu)
  createTag(label, option) {
    const $tag = document.createElement("div");
    $tag.classList.add("tag", label);
    $tag.setAttribute("data-option", option.toLowerCase());
    const $textHolder = document.createElement("span");
    $textHolder.innerText = option;
    const $icon = this.createSvgIcon(option, "Supprimer le tag", "close");
    $tag.append($textHolder, $icon);
    this.sorterMethod.$tagsWrapper.appendChild($tag);
    this.handleRemoveTag(option, $tag, $icon);
  }
  /**
   *
   * Handle the dropdown interaction
   *
   */
  // click listener on the toggle button for the dropdown, check if already opened
  handleClickDropdown() {
    const that = this;
    this.$icon.addEventListener("click", function (e) {
      const expanded = that.$dropdownWrapper.getAttribute("aria-expanded");
      if (expanded == "true") {
        that.closeDropdown();
      } else {
        that.sorterMethod.closeAllSortersDropdown();
        that.openDropdown("focus");
      }
    });
  }

  // update UI close corresponding dropdown
  closeDropdown() {
    this.$dropdownWrapper.setAttribute("aria-expanded", "false");
    this.$dropdownMenu.classList.remove("show");
    this.$dropdownWrapper.style.width = "100%";
    this.$icon.classList.remove("down");
  }
  // update UI open corresponding dropdown, set focus if trigger by user
  openDropdown(option) {
    this.$dropdownWrapper.setAttribute("aria-expanded", "true");
    this.$dropdownMenu.classList.add("show");
    this.$dropdownWrapper.style.width = `${this.$dropdownMenu.offsetWidth}px`;

    if (option !== "focus") {
      this.updateSorterInput(option);
    } else {
      this.$dropdownMenu.firstChild.focus();
      this.updateSorterInput(`Rechercher parmi les ${this.title}`);
    }
    this.$icon.classList.add("down");
  }

  /**
   *
   * Sorter handle
   *
   */
  // Recreate each sorter with new Data
  updateSorter(newData, option, that) {
    console.log(newData);
    this.tempSorterData = this.sorterMethod.createSorterData(
      this.label,
      newData
    );

    console.log(option);
    // if a search value or a tag is provided
    if (option) {
      const filteredData = this.sorterMethod.filterSorterData(
        option,
        this.tempSorterData
      );
      if (filteredData.length > 0) {
        that = this;
      }
      this.updateDropdownMenu(this.tempSorterData, option, that);
    } else {
      this.updateDropdownMenu(this.tempSorterData);
    }
  }

  // Update the input in the dropdown of corresponding sorter
  updateSorterInput(value) {
    if (value) {
      this.$input.placeholder = value;
    }
  }

  /**
   *
   * Tags Handle
   *
   **/
  // When user click on a list item in the sorter
  handleClickMenu(label, $dropdownItem, option) {
    const that = this;
    $dropdownItem.addEventListener("click", (e) => {
      that.sorterMethod.$tagsWrapper.classList.add("show");
      that.sorterMethod.tempTagsList.push({ label: label, option: option });
      that.createTag(label, option);
      that.sorterMethod.updateSortersManager(label, option, that);
    });
  }

  // When click on delete icon in a tag
  handleRemoveTag(option, $tag, $icon) {
    const that = this;
    $icon.addEventListener("click", function () {
      $tag.remove();
      // remove this tag from tempTagList "state"
      that.sorterMethod.tempTagsList = that.sorterMethod.tempTagsList.filter(
        (tag) => tag.option !== option
      );
      // check if main search is populated, update the sorters by making a "cycle of search"
      const searchInputText = document.querySelector("#searchInput").value;
      console.log(searchInputText);
      if (searchInputText) {
        that.sorterMethod.updateSortersManager("main", searchInputText);
      } else {
        that.sorterMethod.updateSortersManager();
      }
    });
  }

  /**
   *
   * Sorter input handle
   *
   */
  // handle user input in sorter dropdown, if = 0 close the dropdown
  handleSorterInput() {
    const that = this;
    this.$input.addEventListener("input", function (e) {
      if (e.target.value.length > 0) {
        const filteredData = that.sorterMethod.filterSorterData(
          e.target.value,
          that.tempSorterData
        );
        that.updateDropdownMenu(filteredData);
        that.openDropdown();
      } else {
        that.updateDropdownMenu(that.initialSorterData);
        that.closeDropdown();
      }
    });
  }

  // Update the dropdown menu (list) with new Data, open or close depending of user action
  updateDropdownMenu(data, option, that) {
    this.$dropdownMenu.style.display = "none";
    if (data.length > 0) {
      this.$dropdownMenu.innerHTML = "";
      this.$dropdownMenu = this.createDropdownMenu(this.label, data);
      this.$relativeWrapper.appendChild(this.$dropdownMenu);

      console.log(option);

      // If a value is provided from search or tag
      if (option) {
        if (this == that) {
          this.recreateDropDownIcon();
          this.openDropdown(option);
        } else {
          this.recreateDropDownIcon();
          this.closeDropdown();
        }
      } else {
        this.closeDropdown();
        this.updateSorterInput(this.title);
        this.recreateDropDownIcon();
      }
    } else {
      // if no sorter data for the search remove the menu list and dropdown icon
      this.$dropdownMenu.innerHTML = "";
      this.$icon.remove();
      this.closeDropdown();

      this.updateSorterInput(this.title);
    }
  }

  // recreate the toggle icon for reference
  recreateDropDownIcon() {
    this.$icon.remove();
    this.$icon = this.createSvgIcon(this.label, "Ouvrir le menu", "angle-down");
    this.$dropdownWrapper.appendChild(this.$icon);
    this.handleClickDropdown();
  }
}
