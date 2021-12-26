import { SafeHtml } from '@angular/platform-browser';

export class TableModel {
  constructor(
    public columnDef: string = '',
    public header: string,
    public cell: (element: any) => string,
    public style?: Partial<CSSStyleDeclaration>,
    public cls?: Array<string>
  ) {}
}
