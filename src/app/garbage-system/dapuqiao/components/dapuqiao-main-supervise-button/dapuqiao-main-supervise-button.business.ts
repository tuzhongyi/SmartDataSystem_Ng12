import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class DapuqiaoMainSuperviseButtonBusiness {
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {}

  async load() {
    if (this.global.defaultDivisionId) {
      let data = await this.getData(this.global.defaultDivisionId);
      if (data.Level3Statistic) {
        let value =
          (data.Level3Statistic.Level3Number ?? 0) -
          (data.Level3Statistic.SupervisedNumber ?? 0);
        return value < 0 ? 0 : value;
      }
    }
    return 0;
  }
  getData(divisionId: string) {
    return this.service.statistic.number.cache.get(divisionId);
  }
}
