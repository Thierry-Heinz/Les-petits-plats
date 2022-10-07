export default class SingleSorter {
  constructor(sorterMethod, title, label) {
    this.sorterMethod = sorterMethod;
    this.title = title;
    this.label = label;
    this.sorterData = this.sorterMethod.createSorterData(this.label);
    this.$sorter = this.sorterMethod.createSorter(
      this.title,
      this.label,
      this.sorterData
    );
  }
  updateSorterList(value, newData) {
    this.clearSorter();
    const newSorterData = this.sorterMethod.createSorterData(
      this.label,
      newData
    );
    const newSorter = this.sorterMethod.createSorter(
      this.title,
      this.label,
      newSorterData
    );
    this.sorterMethod.$sorterWrapper.appendChild(newSorter);
    this.$sorter = newSorter;
    value ? this.updateSorterInput(value) : "";
  }
  clearSorter() {
    this.$sorter.remove();
  }
  updateSorterInput(value) {
    this.$sorter
      .querySelector(".sorter-input")
      .setAttribute("placeholder", `${value}`);
  }
  callSearch(value) {
    return this.SearchApi.search(value);
  }
}
