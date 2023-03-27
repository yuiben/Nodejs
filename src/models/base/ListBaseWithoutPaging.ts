export class ListBaseWithoutPaging<T> {
  items: T[] = undefined;

  constructor(items: T[]) {
    this.items = items;
  }
}
