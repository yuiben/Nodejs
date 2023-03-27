import { Pagination } from './Pagination';

export class ListBase<T> {
  items: T[] = undefined;
  pagination?: Pagination = undefined;

  constructor(items: T[], pagination?: Pagination) {
    this.items = items;
    this.pagination = pagination;
  }
}
