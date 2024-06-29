import { PaginatorState } from "primeng/paginator";
import { IPage, IPageRequest } from "../interfaces/page.interface";

export abstract class Pagination<T> {
  page: IPage<T>;
  pageRequest: IPageRequest;

  constructor() {
    this.page = { items: [], total: 0 };

    this.pageRequest = {
      search: "",
      pageSize: 10,
      pageNumber: 0,
      desc: true
    };
  }

  abstract requestPage(): Promise<void>;

  onPageChange(event: PaginatorState) {
    this.pageRequest.pageNumber = (event.first ?? 0) / (event.rows ?? 1);
    this.pageRequest.pageSize = event.rows;
    this.requestPage();
  }
}
