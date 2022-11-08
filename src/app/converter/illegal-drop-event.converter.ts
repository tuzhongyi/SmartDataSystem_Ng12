import { Injectable } from '@angular/core';
import { IConverter } from '../common/interfaces/converter.interface';
import { IllegalDropEventRecord } from '../network/model/garbage-event-record.model';
import { IllegalDropRecordModel } from '../view-model/illegal-drop-record.model';
import { mode } from 'crypto-js';
import { DatePipe } from '@angular/common';
import { Medium } from '../common/tools/medium';
import {
  AbstractCommonModelConverter,
  AbstractCommonModelPromiseConverter,
} from './common-model.converter';
import { IllegalDropEventModel } from '../view-model/illegal-drop-event.model';
import { DivisionRequestService } from '../network/request/division/division-request.service';
import { Division } from '../network/model/division.model';
import { DivisionType } from '../enum/division-type.enum';

type IllegalDropEventdSource = IllegalDropEventRecord;

@Injectable({
  providedIn: 'root',
})
export class IllegalDropEventConverter extends AbstractCommonModelPromiseConverter<IllegalDropEventModel> {
  constructor(private _datePipe: DatePipe) {
    super();
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
    model.ImageUrl = await Medium.img(item.ImageUrl);

    // 居委会信息
    model.CommitteeId = item.Data.DivisionId || null;
    model.CommitteeName = item.Data.DivisionName ?? '';

    // 厢房信息
    model.StationId = item.Data.StationId;
    model.StationName = item.Data.StationName;

    // 社区信息
    model.CommunityId = item.Data.CommunityId ?? null;
    model.CommunityName = item.Data.CommunityName ?? '';

    // 街道信息
    model.CountyId = null;
    model.CountyName = '';

    model.EventTime =
      this._datePipe.transform(item.EventTime, 'yyyy-MM-dd HH:mm:ss') ?? '';

    return model;
  }
}
