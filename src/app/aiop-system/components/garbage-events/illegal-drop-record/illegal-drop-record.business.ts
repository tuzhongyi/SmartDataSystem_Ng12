import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
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
    console.log(res);

    let data: IllegalDropRecordModel[] = res.Data.map((v) =>
      this._converter.Convert(v)
    );

    console.log('data', data);
    let committeeIds = this._getDivisionIds(res.Data);

    console.time();
    let commitees = await this._getGroupDivisions(committeeIds); // 速度: default: 2.337890625 ms
    console.timeEnd();

    commitees.forEach((division) => this._register(division));

    console.log(this._divisionMap);

    let countys = await this._getParentDivisions(commitees);
    console.log(countys);
  }

  private _getDivisionIds(data: IllegalDropEventRecord[]) {
    let divisionIds: string[] = [];
    for (let i = 0; i < data.length; i++) {
      let v = data[i];
      if (v.Data.DivisionId) {
        if (!divisionIds.includes(v.Data.DivisionId))
          divisionIds.push(v.Data.DivisionId);
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
    let res = await this._divisionRequest.cache.list(params);
    console.log('group', res);
    return res.Data;
  }
  /**
   *
   * @param divisionId
   * @returns
   * @description 获取单个 Division 信息
   */
  private async _getDivision(divisionId: string) {
    let division = await this._divisionRequest.cache.get(divisionId);
    return division;
  }
  /**
   *
   * @param division
   * @returns
   * @description 获取父 Division 信息
   */
  private async _getParentDivisions(divisions: Division[]) {
    let ids: string[] = [];
    for (let i = 0; i < divisions.length; i++) {
      let division = divisions[i];
      if (division.ParentId) {
        ids.push(division.ParentId);
      }
    }
    let res = await this._getGroupDivisions(ids);
    return res;
    // if (division.ParentId) {
    //   let parent = await this._getDivision(division.ParentId);
    //   return parent;
    // }
    // return null;
  }
  private _register(division: Division) {
    if (!this._divisionMap.has(division.Id)) {
      this._divisionMap.set(division.Id, division);
    }
  }
}
