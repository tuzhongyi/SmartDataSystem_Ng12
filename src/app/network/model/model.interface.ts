import { ClassConstructor } from 'class-transformer';

export interface IModel {}
export interface IIdModel extends IModel {
  Id: string;
}
export interface IObjectModel extends IIdModel {
  Name: string;
}
export class IdNameModel implements IObjectModel {
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
export interface IndexArgs<T = any> {
  index: number;
  model: T;
}
