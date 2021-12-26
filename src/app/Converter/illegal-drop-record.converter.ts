/*
 * @Author: pmx
 * @Date: 2021-12-24 11:21:22
 * @Last Modified by: pmx
 * @Last Modified time: 2021-12-26 13:14:24
 *
 *　 ┏┓   　   ┏┓
 *　┏┛┻━━━━━━━━┛┻┓
 *　┃　　　　　　 ┃
 *　┃　　　━　　　┃ ++ + + +
 *  |  ████━████ ┃
 *　┃　　　　　　 ┃ +
 *　┃　　　┻　　　┃
 *　┃　　　　　　 ┃ + +
 *　┗━┓　　　  ┏━┛
 *　　　┃　　　┃
 *　　　┃　　　┃ + + + +
 *　　　┃　　　┃
 *　　　┃　　　┃ +  神兽保佑
 *　　　┃　　　┃    代码无bug
 *　　　┃　　　┃　　+
 *　　　┃　 　　┗━━━┓ + +
 *　　　┃ 　　　　　 ┣━━━━━━━━┓
 *　　　┃ 　　　　　┏┛━━━━━━━━┃
 *　　　┗┓ ┓  ┏ ┳┏┛ + + + +
 *　　　 ┃┫┫　┃┫┫
 *　　　 ┗┻┛　┗┻┛+ + + +
 */
import { Injectable } from '@angular/core';
import { IConverter } from '../common/interfaces/converter.interface';
import { IllegalDropEventRecord } from '../network/model/event-record.model';
import { IllegalDropRecordModel } from '../view-model/illegal-drop-record.model';
import { PicturesUrl } from '../network/url/aiop/Medium/Pictures/pictures.url';
import { mode } from 'crypto-js';
import { DatePipe } from '@angular/common';

type IllegalDropRecordSourceModel = IllegalDropEventRecord;

@Injectable({
  providedIn: 'root',
})
export class IllegalDropRecordConverter
  implements IConverter<IllegalDropRecordSourceModel, IllegalDropRecordModel>
{
  constructor(private _datePipe: DatePipe) {}
  Convert(source: IllegalDropRecordSourceModel) {
    if (source instanceof IllegalDropEventRecord) {
      return this._fromIllegalDropEventRecord(source);
    }
    throw new Error('Error');
  }

  /******private ****************/
  private _fromIllegalDropEventRecord(item: IllegalDropEventRecord) {
    let model = new IllegalDropRecordModel();

    model.EventId = item.EventId;
    model.ImageUrl = item.ImageUrl ? PicturesUrl.jpg(item.ImageUrl) : '';
    model.ResourceName = item.ResourceName ?? '';
    model.StationName = item.Data.StationName;
    model.CommitteeName = item.Data.DivisionName ?? '';
    model.CommitteeId = item.Data.DivisionId ?? '';
    model.EventTime =
      this._datePipe.transform(item.EventTime, 'yyyy-MM-dd HH:mm:ss') ?? '';

    return model;
  }
}
