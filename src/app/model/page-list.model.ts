interface PagedList<T> {
  Page: Page;
  Data: T[];
}

interface Page {
  PageIndex: number;
  PageSize: number;
  PageCount: number;
  RecordCount: number;
  TotalRecordCount: number;
}

export { PagedList, Page };
