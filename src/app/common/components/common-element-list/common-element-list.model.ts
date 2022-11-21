import { InjectionToken } from '@angular/core';
import { PagedList } from 'src/app/network/model/page_list.model';

export const COMMON_ELEMENT_LIST_TOKEN =
  new InjectionToken<ICommonElementListBusiness>('COMMON_ELEMENT_LIST');

export interface ICommonElementListBusiness<T = any> {
  init(
    ...args: any
  ): Promise<CommonElementListModel<T>> | CommonElementListModel<T>;
}

export class CommonElementListModel<T = any> {
  Id!: string;
  Name!: string;
  Children!: Array<CommonElementListModel<T>>;
  RawData?: T;
}
