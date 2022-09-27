import SorterMethod from "../templates/SorterMethod";

export default class SingleSorter extends SorterMethod {
  constructor(sorterData, title, label) {
    super();
    this.title = title;
    this.label = label;
    this.sorterData = sorterData;
    this.$sorter = this.createSorter(title, label, sorterData);
  }
}
