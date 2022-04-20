import { EventType } from "src/app/enum/event-type.enum";
import { TimeUnit } from "src/app/enum/time-unit.enum";
import { UserResourceType } from "src/app/enum/user-resource-type.enum";
import { DivisionNumberStatisticV2 } from "src/app/network/model/division-number-statistic-v2.model";
import { EventNumberStatistic } from "src/app/network/model/event-number-statistic.model";
import { GarbageDropEventRecord, GarbageFullEventRecord, IllegalDropEventRecord, MixedIntoEventRecord } from "src/app/network/model/event-record.model";
import { GarbageStationNumberStatisticV2 } from "src/app/network/model/garbage-station-number-statistic-v2.model";

export interface EventRecordComparisonOptions {
    userType: UserResourceType,
    eventType: EventType,
    ids: string[],
    unit: TimeUnit,
    date:Date
}

export type EventRecordType = IllegalDropEventRecord | MixedIntoEventRecord | GarbageFullEventRecord 

export type NumberStatisticV2 = GarbageStationNumberStatisticV2|DivisionNumberStatisticV2


export class EventNumberStatisticArray{
    Id:string = ""
    Name:string = ""
    datas:EventNumberStatistic[] = []
}