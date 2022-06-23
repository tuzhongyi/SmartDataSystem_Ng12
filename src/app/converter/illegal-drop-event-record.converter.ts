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
import { IllegalDropEventRecord } from '../network/model/garbage-event-record.model';
import { IllegalDropRecordModel } from '../view-model/illegal-drop-record.model';
import { mode } from 'crypto-js';
import { DatePipe } from '@angular/common';
import { Medium } from '../common/tools/medium';

type IllegalDropEventRecordSourceModel = IllegalDropEventRecord;

@Injectable({
  providedIn: 'root',
})
export class IllegalDropEventRecordConverter
  implements IConverter<IllegalDropEventRecordSourceModel, IllegalDropRecordModel>
{
  constructor(private _datePipe: DatePipe) { }
  Convert(source: IllegalDropEventRecordSourceModel) {
    if (source instanceof IllegalDropEventRecord) {
      return this._fromIllegalDropEventRecord(source);
    }
    throw new Error('Error');
  }
  iterateToModel<T extends Array<IllegalDropEventRecordSourceModel>>(data: T) {
    let res: Array<IllegalDropRecordModel> = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = this.Convert(item);
      res.push(model)
    }

    return res;
  }

  /******private ****************/
  private _fromIllegalDropEventRecord(item: IllegalDropEventRecord) {
    let model = new IllegalDropRecordModel();

    model.EventId = item.EventId;
    model.ImageUrl = item.ImageUrl
      ? Medium.jpg(item.ImageUrl)
      : '';
    var image = new Image();
    try {
      image.src = model.ImageUrl;
      image.onerror = function () {
        model.ImageUrl = '/assets/img/timg-pic.jpg';
        return;
      };
    } catch (e) {
      console.log('eee', e);
    }

    model.ResourceName = item.ResourceName ?? '';
    model.StationName = item.Data.StationName;
    model.CommitteeName = item.Data.DivisionName ?? '';
    model.CommitteeId = item.Data.DivisionId ?? '';
    model.CommunityName = item.Data.CommunityName ?? '';
    model.CommunityId = item.Data.CommunityId ?? "";
    model.EventTime =
      this._datePipe.transform(item.EventTime, 'yyyy-MM-dd HH:mm:ss') ?? '';


    return model;
  }
}
