
import { ImageControlModel } from "./image-control.model";
import { GarbageStationModel } from "./garbage-station.model";
import { EventRecord } from "../network/model/event-record.model";

export class EventRecordViewModel extends EventRecord {
    /** */
    GarbageStation?: GarbageStationModel;
  
    DateFormatter: string = '';
  
    images: ImageControlModel[] = [];
  }