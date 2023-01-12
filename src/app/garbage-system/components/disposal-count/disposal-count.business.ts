import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { SubscriptionService } from 'src/app/common/interfaces/subscribe.interface';
import {
  DisposalCountConverter,
  NumberStatistic,
} from 'src/app/garbage-system/components/disposal-count/disposal-count.converter';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DisposalCountModel } from 'src/app/garbage-system/components/disposal-count/disposal-count.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';

@Injectable()
export class DisposalCountBusiness
  implements IBusiness<NumberStatistic, DisposalCountModel>
{
  constructor(
    private divisionRequest: DivisionRequestService,
    private stationRequest: GarbageStationRequestService,
    public subscription: SubscriptionService,
    private store: GlobalStorageService
  ) {}
  Converter: IConverter<NumberStatistic, DisposalCountModel> =
    new DisposalCountConverter();

  async load(
    resourceId: string,
    resourceType: UserResourceType
  ): Promise<DisposalCountModel> {
    let data = await this.getData(resourceId, resourceType);
    let result = this.Converter.Convert(data, this.store.defaultDivisionType);
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
