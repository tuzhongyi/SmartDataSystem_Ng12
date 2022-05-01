import { IModel } from "../network/model/model.interface";

export interface IItemModel extends IModel {
    Id: string,
    Name: string
}
export class ItemModel implements IItemModel {
    Id: string = "";
    Name: string = "";
}