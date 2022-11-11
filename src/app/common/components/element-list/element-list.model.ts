import { InjectionToken } from '@angular/core';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';

export const ElementListToken = new InjectionToken<
  IElementListBusiness<IModel>
>('ELEMENT LIST');

export interface IElementListBusiness<T> {
  init(...args: any): Promise<ElementListModel<T>> | ElementListModel<T>;

  getCurrent(id: string): Promise<T>;
  listChildren(parentId: string): Promise<PagedList<T>>;
}

export class ElementListModel<T> {
  Id!: string;
  Name!: string;
  Children!: Array<ElementListModel<T>>;
  rawData?: T;
}
