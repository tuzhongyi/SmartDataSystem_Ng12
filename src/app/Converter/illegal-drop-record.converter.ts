/*
 * @Author: pmx
 * @Date: 2021-12-24 11:21:22
 * @Last Modified by: pmx
 * @Last Modified time: 2021-12-24 13:34:34
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
 *　　　┃ 　　　　　 ┣┓
 *　　　┃ 　　　　　┏┛
 *　　　┗┓┓┏━━━┳┓┏┛ + + + +
 *　　　　┃┫┫　┃┫┫
 *　　　　┗┻┛　┗┻┛+ + + +
 */
import { Injectable } from '@angular/core';
import { IConverter } from '../common/interfaces/converter.interface';
import { IllegalDropEventRecord } from '../network/model/event-record.model';

type IllegalDropSourceModel = IllegalDropEventRecord;

@Injectable({
  providedIn: 'root',
})
export class IllegalDropRecordConverter implements IConverter<any, any> {
  Convert(source: IllegalDropSourceModel[]) {}
}
