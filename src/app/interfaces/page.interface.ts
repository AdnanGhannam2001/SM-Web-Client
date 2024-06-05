export interface IPage<T> {
  items: Array<T>;
  total: number;
}

export interface IPageRequest {
  pageNumber?: number,
  pageSize  ?: number,
  search    ?: string,
  desc      ?: boolean
};
