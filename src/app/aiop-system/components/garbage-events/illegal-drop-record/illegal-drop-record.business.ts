import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { reduce } from 'rxjs/operators';
import { IllegalDropRecordConverter } from 'src/app/converter/illegal-drop-record.converter';
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

  public _dataStream = new Subject<PagedList<IllegalDropRecordModel>>();

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

    let records = await this._eventRequestService.record.IllegalDrop.list(
      params
    );
    // console.log('records', records);

    // 缺少 街道信息
    let data: IllegalDropRecordModel[] = records.Data.map((v) =>
      this._converter.Convert(v)
    );

    // console.log('data', data);
    await this._getDivisionInfo(records.Data);

    // console.log(this._divisionMap);

    data.forEach((v) => {
      let committee = this._divisionMap.get(v.CommitteeId);
      if (committee) {
        if (committee.ParentId) {
          let county = this._divisionMap.get(committee.ParentId);
          if (county) {
            v.CountyName = county.Name;
          }
        }
      }
    });

    let res: PagedList<IllegalDropRecordModel> = {
      Page: records.Page,
      Data: data,
    };

    this._dataStream.next(res);
    return res;
  }

  private async _getDivisionInfo(data: IllegalDropEventRecord[]) {
    let committeeIds = this._extractDivisionIds(data);
    console.time('居委会用时');
    let commitees = await this._getGroupDivisions(committeeIds);
    console.timeEnd('居委会用时');
    // console.log('居委会', commitees);

    commitees.forEach((division) => this._register(division));

    let countyIds = this._extractDivisionIds(commitees, true);
    console.time('街道用时');
    let counties = await this._getGroupDivisions(countyIds);
    console.timeEnd('街道用时');
    // console.log('街道', counties);

    counties.forEach((division) => this._register(division));
  }

  private _extractDivisionIds(
    data: IllegalDropEventRecord[] | Division[],
    fromParent: boolean = false
  ) {
    let divisionIds: string[] = [];

    for (let i = 0; i < data.length; i++) {
      let v = data[i];
      let id: string = '';

      if (v instanceof IllegalDropEventRecord) {
        if (v.Data.DivisionId) {
          id = v.Data.DivisionId;
        }
      } else if (v instanceof Division) {
        if (fromParent) {
          if (v.ParentId) {
            id = v.ParentId;
          }
        } else {
          id = v.Id;
        }
        // id = (!fromParent && v.Id) || (fromParent && v.ParentId) || '';
      }
      if (id && !divisionIds.includes(id)) {
        divisionIds.push(id);
      }
    }
    return divisionIds;
  }
  /**
   *
   * @param divisionIds
   * @description 拉取一组 Division信息
   */
  private async _getGroupDivisions(divisionIds: string[]) {
    let params = new GetDivisionsParams();
    params.Ids = divisionIds;
    // console.time();
    let res = await this._divisionRequest.cache.list(params);
    // console.timeEnd();
    return res.Data;
  }

  // 本地缓存
  private _register(division: Division) {
    if (!this._divisionMap.has(division.Id)) {
      this._divisionMap.set(division.Id, division);
    }
  }
}
