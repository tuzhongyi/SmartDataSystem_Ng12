import { Division } from "src/app/network/model/division.model";
import { GarbageStation } from "src/app/network/model/garbage-station.model";

export interface EventRecordCardModel {
    id: string;
    name: string;
    time: Date;
    img: string;
    parent: Division;
    station: GarbageStation

}