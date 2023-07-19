import { IModel } from './model.interface';

export class IdModel implements IModel {
  Id!: string;
}
export class IdNameModel extends IdModel {
  Name!: string;
}
