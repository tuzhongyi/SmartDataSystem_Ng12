// import { EventEmitter } from "@angular/core";
// import { interval } from "rxjs";
// import { ITimeData, TimeData } from "src/app/common/components/charts/chart.model";
// import { IBusiness } from "src/app/common/interfaces/bussiness.interface";
// import { IConverter, IPromiseConverter } from "src/app/common/interfaces/converter.interface";
// import { ISubscription } from "src/app/common/interfaces/subscribe.interface";
// import { EventType } from "src/app/enum/event-type.enum";
// import { TimeUnit } from "src/app/enum/time-unit.enum";
// import { UserResourceType } from "src/app/enum/user-resource-type.enum";
// import { DivisionNumberStatisticV2 } from "src/app/network/model/division-number-statistic-v2.model";
// import { EventNumberStatistic } from "src/app/network/model/event-number-statistic.model";
// import { GarbageStationNumberStatisticV2 } from "src/app/network/model/garbage-station-number-statistic-v2.model";
// import { PagedList } from "src/app/network/model/page_list.model";
// import { GetDivisionStatisticNumbersParamsV2 } from "src/app/network/request/division/division-request.params";
// import { DivisionRequestService } from "src/app/network/request/division/division-request.service";
// import { GetEventRecordsParams } from "src/app/network/request/event/event-request.params";
// import { EventRequestService } from "src/app/network/request/event/event-request.service";
// import { GetGarbageStationStatisticComparisonParams, GetGarbageStationStatisticNumbersParams, GetGarbageStationStatisticNumbersParamsV2, GetGarbageStationVolumesParams } from "src/app/network/request/garbage-station/garbage-station-request.params";
// import { GarbageStationRequestService } from "src/app/network/request/garbage-station/garbage-station-request.service";
// import { IntervalParams } from "src/app/network/request/IParams.interface";
// import { EventRecordComparisonOptions, EventRecordType, NumberStatisticV2 } from "./EventRecordComparison.model";

// export class EventRecordComparisonDayBusiness
//     implements IBusiness<Array<EventRecordType>, ITimeData<number[]>[]>
// {
//     constructor(        
//         private eventService: EventRequestService
//     ) {

//     }
//     Converter: IConverter<EventRecordType[], ITimeData<number[]>[]> = new EventRecordComparisonConverter();
//     subscription?: ISubscription | undefined;
//     loading?: EventEmitter<void> | undefined;
//     async load(opts: EventRecordComparisonOptions): Promise<ITimeData<number[]>[]> {
//         let data = await this.getData(opts.userType, opts.ids, opts.unit, opts.date, opts.eventType)
//         let model = this.Converter.Convert(data)
//         return model;
//     }
//     async getData(type: UserResourceType, ids: string[], unit: TimeUnit, date: Date, eventType: EventType): Promise<EventRecordType[]> {
//         let params = new GetEventRecordsParams();
//         params = IntervalParams.TimeUnit(unit, date);

//         switch (type) {
//             case UserResourceType.Station:
//                 params.StationIds = ids;
//                 break;
//             default:
//                 params.DivisionIds = ids;
//                 break;
//         }
//         let paged: PagedList<EventRecordType>
//         switch (eventType) {
//             case EventType.IllegalDrop:
//                 paged = await this.eventService.record.IllegalDrop.list(params)
//                 break;
//             case EventType.MixedInto:
//                 paged = await this.eventService.record.MixedInto.list(params)
//                 break;
//             case EventType.GarbageFull:
//                 paged = await this.eventService.record.GarbageFull.list(params);
//                 break;
//             case EventType.GarbageDrop:
//             case EventType.GarbageDropHandle:
//             case EventType.GarbageDropTimeout:
//             default:
//                 paged = await this.eventService.record.GarbageDrop.list(params);
//                 break;
//         }

//         return paged.Data;

//     }

// }



// class EventRecordComparisonConverter implements IConverter<EventRecordType[], ITimeData<number[]>[]>{

//     converter = {
//         item: new EventRecordConverter()
//     }

//     Convert(source: EventRecordType[], eventType: EventType): ITimeData<number[]>[] {

//         let array = source.map((x, i) => {
//             return this.converter.item.Convert(x, eventType, i)
//         })

//         let times = array.map(x => x.time);

//         times = Array.from(new Set(times));

//         let result = times.map(time => {
//             let value = array.filter(x => x.time === time)
//             return {
//                 time: time,
//                 value: value.map(x => x.value)
//             }
//         })
//         return result;
//     }
// }

// class EventRecordConverter implements IConverter<EventRecordType, ITimeData<number>>{
//     Convert(source: EventRecordType, eventType: EventType, index = 0): ITimeData<number> {

//         let now = new Date();
//         let time = source.Data
//         let value = 0;
//         if (source.) {
//             let eventNumber = source.EventNumbers.find(x => x.EventType === eventType)
//             if (eventNumber) {
//                 value = eventNumber.DeltaNumber ?? eventNumber.DayNumber
//             }
//         }
//         return {
//             index: index,
//             time: time,
//             value: value
//         }
//     }
// }