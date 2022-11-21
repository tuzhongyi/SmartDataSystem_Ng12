import { InjectionToken } from '@angular/core';
import { PagedList } from 'src/app/network/model/page_list.model';

export const ELEMENT_LIST_TOKEN = new InjectionToken<IElementListBusiness>(
  'ELEMENT_LIST'
);

export interface IElementListBusiness<T = any> {
  init(...args: any): Promise<ElementListModel<T>> | ElementListModel<T>;

  getCurrent(id: string): Promise<T>;
  listChildren(parentId: string): Promise<PagedList<T>>;
}

export class ElementListModel<T = any> {
  Id!: string;
  Name!: string;
  Children!: Array<ElementListModel<T>>;
  RawData?: T;
}
