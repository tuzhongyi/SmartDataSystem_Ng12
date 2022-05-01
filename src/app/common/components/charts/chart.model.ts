import { ItemModel } from "src/app/view-model/item.model";
import { ImageControlModel } from "../image-control/image-control.model";

export interface ITimeData<T> {
  time: Date;
  value: T;
  index?: number;
}
export interface ImageTimeData<T> extends ITimeData<T> {
  image: ImageControlModel;
}

export interface ITimeDataGroup<T> extends ItemModel {
  datas: ITimeData<T>[]
}
