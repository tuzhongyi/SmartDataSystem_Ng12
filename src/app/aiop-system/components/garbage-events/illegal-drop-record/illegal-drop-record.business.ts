import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { IllegalDropRecordConverter } from 'src/app/converter/illegal-drop-record.converter';
import { Time } from 'src/app/global/tool/time';
import { Division } from 'src/app/network/model/division.model';
import { IllegalDropEventRecord } from 'src/app/network/model/event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';

@Injectable()
export class IllegalDropRecordBusiness {
  constructor(
    private _eventRequestService: EventRequestService,
    private _divisionRequest: DivisionRequestService,
    private _converter: IllegalDropRecordConverter
  ) {}
  async loadData(pageIndex: number, pageSize?: number) {
    let params = new GetEventRecordsParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize ?? 9;
    let beginTime = Time.beginTime(new Date());
    let endTime = Time.endTime(new Date());
    params.BeginTime = beginTime;
    params.EndTime = endTime;

    let res = await this._eventRequestService.record.IllegalDrop.list(params);
    console.log(res);

    this._converter.Convert(res.Data);

    // let division = await this.getDivision(res.Data[0].Data.DivisionId!);
    // console.log(division);
    // console.log(await this.getParentDivision(division));
  }

  async getDivision(divisionId: string) {
    return await this._divisionRequest.cache.get(divisionId);
  }
  async getParentDivision(division: Division) {
    if (division.ParentId) {
      let parent = await this.getDivision(division.ParentId);
      return parent;
    }

    return null;
  }
}
