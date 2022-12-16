export interface IModel {}
export class Model implements IModel {
  Id!: string;
  Name!: string;

  equals(value?: Model) {
    if (value) {
      return this.Id === value.Id;
    }
    return false;
  }
}
