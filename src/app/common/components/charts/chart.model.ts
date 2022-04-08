import { ImageControlModel } from "../image-control/image-control.model";

export interface ITimeData<T> {
    time: Date;
    value: T;
    index?: number;    
  }
  export interface ImageTimeData<T> extends ITimeData<T> {
    image: ImageControlModel;
  }
  