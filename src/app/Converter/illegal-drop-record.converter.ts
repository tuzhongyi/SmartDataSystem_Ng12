/*
 * @Author: pmx
 * @Date: 2021-12-24 11:21:22
 * @Last Modified by: pmx
 * @Last Modified time: 2021-12-24 16:22:02
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
import { Subject } from 'rxjs';

type IllegalDropRecordSourceModel = IllegalDropEventRecord;

@Injectable({
  providedIn: 'root',
})
export class IllegalDropRecordConverter
  implements IConverter<IllegalDropRecordSourceModel, IllegalDropRecordModel>
{
  constructor() {}
  Convert(source: IllegalDropRecordSourceModel) {
    if (source instanceof IllegalDropEventRecord) {
      return this._fromIllegalDropEventRecord(source);
    }
    throw new Error('Error');
  }

  /******private ****************/
  private _fromIllegalDropEventRecord(item: IllegalDropEventRecord) {
    let model = new IllegalDropRecordModel();

    model.ImageUrl = item.ImageUrl ? PicturesUrl.jpg(item.ImageUrl) : '';
    model.ResourceName = item.ResourceName ?? '';
    model.StationName = item.Data.StationName;
    model.EventTime = item.EventTime.toString();

    return model;
  }
}
