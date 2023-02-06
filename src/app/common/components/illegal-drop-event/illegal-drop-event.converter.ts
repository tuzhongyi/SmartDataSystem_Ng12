import { Injectable } from '@angular/core';
import { IConverter } from '../../interfaces/converter.interface';
import { IllegalDropEventRecord } from '../../../network/model/garbage-event-record.model';
import { IllegalDropRecordModel } from '../../../view-model/illegal-drop-record.model';
import { mode } from 'crypto-js';
import { DatePipe } from '@angular/common';
import { Medium } from '../../tools/medium';
import {
  AbstractCommonModelConverter,
  AbstractCommonModelPromiseConverter,
} from '../../../converter/common-model.converter';
import { IllegalDropEventModel } from './illegal-drop-event.model';
import { DivisionRequestService } from '../../../network/request/division/division-request.service';
import { Division } from '../../../network/model/division.model';
import { DivisionType } from '../../../enum/division-type.enum';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';

type IllegalDropEventdSource = IllegalDropEventRecord;

@Injectable()
export class IllegalDropEventConverter extends AbstractCommonModelPromiseConverter<IllegalDropEventModel> {
  private _divisionMap: Map<string, Division> = new Map();

  constructor(private _divisionRequest: DivisionRequestService) {
    super();
  }
  // 街道数量少，一次性得到所有街道信息，减少街道请求次数
  async getAllCounty() {
    let params = new GetDivisionsParams();
    params.DivisionType = DivisionType.County;
    let { Data } = await this._divisionRequest.list(params);
    Data.forEach((division) => {
      this._divisionMap.set(division.Id, division);
    });
  }
  Convert(source: IllegalDropEventdSource) {
    if (source instanceof IllegalDropEventRecord) {
      return this._fromIllegalDropEventRecord(source);
    }
    throw new Error('Error');
  }

  /******private ****************/
  private async _fromIllegalDropEventRecord(item: IllegalDropEventRecord) {
    let model = new IllegalDropEventModel();
    model.Id = item.EventId;
    model.ResourceName = item.ResourceName ?? '';
    model.ImageUrl = Medium.img(item.ImageUrl);
    // 居委会信息
    model.CommitteeName = item.Data.DivisionName ?? '';
    // 厢房信息
    model.StationName = item.Data.StationName;
    // 社区信息
    model.CommunityName = item.Data.CommunityName ?? '';
    // 街道信息
    model.CountyName = item.Data.DivisionId
      ? await this._getDivisionName(item.Data.DivisionId)
      : '-';

    model.EventTime = item.EventTime;

    model.RawData = item;

    return model;
  }
  private async _getDivisionName(id: string) {
    let division: Division;

    if (this._divisionMap.has(id)) {
      division = this._divisionMap.get(id)!;
    } else {
      // 需要当前区划的上级区划信息
      division = await this._divisionRequest.get(id);
      this._divisionMap.set(division.Id, division);
    }
    let parentId = division.ParentId;
    if (parentId) {
      let parentDivision: Division;
      if (this._divisionMap.has(parentId)) {
        parentDivision = this._divisionMap.get(parentId)!;
        return parentDivision.Name;
      } else {
        return '-';
      }
    }

    return '-';
  }
}
