import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/request/division/division-request.service';

@Injectable()
export class GarbageRetentionRankBusiness {
  private _listData: any = [];

  constructor(private _divisionRequest: DivisionRequestService) {}

  async list() {
    let data = await this._divisionRequest.list();
    console.log(data);
  }
}
