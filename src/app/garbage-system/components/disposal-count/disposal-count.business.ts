import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import {
  ISubscription,
  SubscriptionService,
} from 'src/app/common/interfaces/subscribe.interface';
import {
  DisposalArrayCountConverter,
  DisposalCountConverter,
  NumberStatistic,
} from 'src/app/converter/disposal-count.converter';

import { DisposalCountType } from 'src/app/enum/disposal-count.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Language } from 'src/app/global/tool/language';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParams,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParams,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DisposalCountModel } from 'src/app/view-model/disposal-count.model';

@Injectable()
export class DisposalCountBusiness
  implements IBusiness<NumberStatistic, DisposalCountModel>
{
  constructor(
    private divisionRequest: DivisionRequestService,
    private stationRequest: GarbageStationRequestService,
    public subscription: SubscriptionService
  ) {}
  Converter: IConverter<NumberStatistic, DisposalCountModel> =
    new DisposalCountConverter();

  async load(
    resourceId: string,
    resourceType: UserResourceType
  ): Promise<DisposalCountModel> {
    let data = await this.getData(resourceId, resourceType);
    let result = this.Converter.Convert(data);
    return result;
  }
  getData(
    resourceId: string,
    resourceType: UserResourceType
  ): Promise<NumberStatistic> {
    switch (resourceType) {
      case UserResourceType.Station:
        return this.getGarbageStationNumberStatistic(resourceId);
      default:
        return this.getDivisionNumberStatistic(resourceId);
    }
  }

  getDivisionNumberStatistic(divisionId: string) {
    return this.divisionRequest.statistic.number.cache.get(divisionId);
  }
  async getGarbageStationNumberStatistic(stationId: string) {
    return this.stationRequest.statistic.number.cache.get(stationId);
  }
}
