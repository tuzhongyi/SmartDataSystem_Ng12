import { EventEmitter, Injectable } from "@angular/core";
import { ITimeData } from "src/app/common/components/charts/chart.model";
import { IBusiness } from "src/app/common/interfaces/bussiness.interface";
import { IConverter } from "src/app/common/interfaces/converter.interface";
import { ISubscription } from "src/app/common/interfaces/subscribe.interface";
import { StatisticToTimeDataConverter } from "src/app/Converter/statistic-to-timedata.converter";
import { EventType } from "src/app/enum/event-type.enum";
import { TimeUnit } from "src/app/enum/time-unit.enum";
import { UserResourceType } from "src/app/enum/user-resource-type.enum";
import { EventNumberStatistic } from "src/app/network/model/event-number-statistic.model";
import { GetDivisionEventNumbersParams } from "src/app/network/request/division/division-request.params";
import { DivisionRequestService } from "src/app/network/request/division/division-request.service";
import { GetGarbageStationEventNumbersParams } from "src/app/network/request/garbage-station/garbage-station-request.params";
import { GarbageStationRequestService } from "src/app/network/request/garbage-station/garbage-station-request.service";
import { IntervalParams } from "src/app/network/request/IParams.interface";
import { EventRecordComparisonOptions } from "./EventRecordComparison.model";

@Injectable()
export class EventRecordComparisonBusiness
    implements IBusiness<Array<EventNumberStatistic[]>, ITimeData<number>[][]>
{
    constructor(
        private stationService: GarbageStationRequestService,
        private divisionService: DivisionRequestService
    ) {

    }
    Converter: IConverter<Array<EventNumberStatistic[]>, ITimeData<number>[][]> = new EventRecordComparisonConverter();
    subscription?: ISubscription | undefined;
    loading?: EventEmitter<void> | undefined;
    async load(opts: EventRecordComparisonOptions): Promise<ITimeData<number>[][]> {

        let interval = IntervalParams.TimeUnit(opts.unit, opts.date);
        let unit = TimeUnit.Day;
        if (opts.unit == TimeUnit.Day || opts.unit === TimeUnit.Hour) {
            unit = TimeUnit.Hour;
        }
        let data = await this.getData(opts.userType, opts.ids, unit, interval, opts.eventType)
        let model = this.Converter.Convert(data)
        return model;
    }
    async getData(type: UserResourceType, ids: string[], unit: TimeUnit, interval: IntervalParams, eventType: EventType) {
        if (type === UserResourceType.Station) {
            return this.getDataByStation(ids, unit, interval)
        }
        else {
            return this.getDataByDivision(ids, unit, interval)
        }
    }

    async getDataByStation(ids: string[], unit: TimeUnit, interval: IntervalParams) {
        let params = new GetGarbageStationEventNumbersParams();
        params.BeginTime = interval.BeginTime;
        params.EndTime = interval.EndTime;
        params.TimeUnit = unit;
        let result = new Array<EventNumberStatistic[]>();
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            let paged = await this.stationService.eventNumber.history.list(id, params)
            result.push(paged.Data)
        }
        return result;

    }
    async getDataByDivision(ids: string[], unit: TimeUnit, interval: IntervalParams) {
        let params = new GetDivisionEventNumbersParams();
        params.BeginTime = interval.BeginTime;
        params.EndTime = interval.EndTime;
        params.TimeUnit = unit;
        let result = new Array<EventNumberStatistic[]>()
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            let paged = await this.divisionService.eventNumber.history.list(id, params)
            result.push(paged.Data);
        }
        return result;
    }
}



class EventRecordComparisonConverter
    implements IConverter<Array<EventNumberStatistic[]>, ITimeData<number>[][]>{

    converter = {
        item: new StatisticToTimeDataConverter()
    }

    Convert(source: Array<EventNumberStatistic[]>, eventType: EventType)
        : ITimeData<number>[][] {
        let array = source.map(x => {
            return this.converter.item.Convert(x, eventType)
        })
        return array;
    }
}
