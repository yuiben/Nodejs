import { Filtered } from './Filtered';
import { Sorted } from './Sorted';

export interface RequestPaging {
  pageSize: number;
  sorted: Sorted[];
  page: number;
  filtered: Filtered[];
}
