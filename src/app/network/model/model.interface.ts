import { ClassConstructor } from 'class-transformer';
import { Page } from './page_list.model';

export interface IModel {}
export interface IIdModel extends IModel {
  Id: string;
}
export interface IIdNameModel extends IIdModel {
  Name: string;
}
export class IdNameModel implements IIdNameModel {
  Id!: string;
  Name!: string;

  equals<T extends IdNameModel>(
    value?: IdNameModel,
    type?: ClassConstructor<T>
  ) {
    if (!value) return false;
    if (type) {
      if (type.name !== value.constructor.name) {
        return false;
      }
    }

    return this.Id === value.Id;
  }
}
export interface PagedArgs<T = any> {
  data: T;
  page: Page;
}
