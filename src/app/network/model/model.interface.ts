import { ClassConstructor } from 'class-transformer';

export interface IModel {}
export class Model implements IModel {
  Id!: string;
  Name!: string;

  equals<T extends Model>(value?: Model, type?: ClassConstructor<T>) {
    if (!value) return false;
    if (type) {
      if (type.name !== value.constructor.name) {
        return false;
      }
    }

    return this.Id === value.Id;
  }
}
