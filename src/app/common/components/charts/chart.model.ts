import { ImageControlModel } from "../image-control/image-control.model";

export interface TimeData<T> {
    time: Date;
    value: T;
    index?: number;    
  }
  
  export interface ImageTimeData<T> extends TimeData<T> {
    image: ImageControlModel;
  }
  