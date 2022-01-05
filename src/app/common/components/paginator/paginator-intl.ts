import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel: string = '每页:';

  nextPageLabel: string = '下一页';

  previousPageLabel: string = '上一页';

  firstPageLabel: string = '第一页';

  lastPageLabel: string = '最后一页';
  name: string = 'pmx';

  constructor() {
    super();
  }
}
