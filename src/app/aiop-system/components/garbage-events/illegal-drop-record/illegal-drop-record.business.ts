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
import { IllegalDropRecordModel } from 'src/app/view-model/illegal-drop-record.model';

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
    params.BeginTime = Time.beginTime(new Date());
    params.EndTime = Time.endTime(new Date());

    let res = await this._eventRequestService.record.IllegalDrop.list(params);

    // let model = this._converter.Convert(res.Data[0]);
    // let division = await this.getDivision(res.Data[0].Data.DivisionId!);
    // model.CommitteeName = division.Name;

    // let parentDivison = await this.getParentDivision(division)!;
    // model.CountyName = parentDivison!.Name;

    // console.log('sdfdsf', model);
    let data: any = await res.Data.map(async (v) => {
      let model = this._converter.Convert(v);
      if (v.Data.DivisionId) {
        let division = await this.getDivision(v.Data.DivisionId);
        console.log(division);
      }
      return model;
    });
    console.log('converted', data);

    try {
      console.log('sdfsdf');
      throw new Error();
    } catch (e) {
      console.log('44444');
    }

    console.log(99999);

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
