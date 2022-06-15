import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { reduce } from 'rxjs/operators';
import { IllegalDropEventRecordConverter } from 'src/app/converter/illegal-drop-event-record.converter';
import { Time } from 'src/app/global/tool/time';
import { Division } from 'src/app/network/model/division.model';
import { IllegalDropEventRecord } from 'src/app/network/model/event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { IllegalDropRecordModel } from 'src/app/view-model/illegal-drop-record.model';

@Injectable()
export class IllegalDropRecordBusiness {
  private _divisionMap = new Map<string, Division>();
  private _date = new Date();
  public _dataStream = new Subject<PagedList<IllegalDropRecordModel>>();

  constructor(
    private _eventRequestService: EventRequestService,
    private _divisionRequest: DivisionRequestService,
    private _converter: IllegalDropEventRecordConverter
  ) { }
  async loadData(pageIndex: number, endTime: Date, pageSize: number = 9) {
    let params = new GetEventRecordsParams();
    params.PageIndex = Math.max(1, pageIndex);
    params.PageSize = Math.max(1, pageSize);// pageSize不会小于1
    params.BeginTime = Time.beginTime(new Date());
    params.EndTime = endTime;

    let records = await this._eventRequestService.record.IllegalDrop.list(
      params
    );
    // console.log(records)

    let models = this._converter.iterateToModel(records.Data);

    // 由于缺少街道信息，需要通过居委会 parentId 查找
    for (let i = 0; i < models.length; i++) {
      let model = models[i];
      let division = await this._getDivision(model.CommitteeId);
      this._register(division);
      // console.log(division)

      if (division.ParentId) {
        if (this._divisionMap.has(division.ParentId)) {
          let parentDivision = this._divisionMap.get(division.ParentId)!;
          model.CountyId = parentDivision.Id;
          model.CountyName = parentDivision.Name;
        } else {
          let parentDivision = await this._getDivision(division.ParentId);
          model.CountyId = parentDivision.Id;
          model.CountyName = parentDivision.Name;
          this._register(parentDivision)
        }
      }
    }
    let res: PagedList<IllegalDropRecordModel> = {
      Page: records.Page,
      Data: models,
    };

    // console.log(models);
    // this._dataStream.next(res);
    return res;
  }

  private async _getDivision(id: string) {
    return this._divisionRequest.get(id)
  }

  private _register(division: Division) {
    this._divisionMap.set(division.Id, division);
  }
}
