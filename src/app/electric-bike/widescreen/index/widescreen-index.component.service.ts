import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { StoreService } from 'src/app/common/service/store.service';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class ElectricBikeIndexService {
  constructor(
    private store: StoreService,
    private local: LocalStorageService,
    private divisionService: DivisionRequestService
  ) {}

  getDivision(divisionId?: string) {
    if (!divisionId) {
      divisionId = this.local.user.Resources![0].Id;
    }
    return this.divisionService.get(divisionId);
  }

  async getChildren(divisionId?: string) {
    if (!divisionId) {
      divisionId = this.store.divisionId;
    }
    let params = new GetDivisionsParams();
    params.ParentId = divisionId;
    let paged = await this.divisionService.list(params);
    return paged.Data;
  }
}
