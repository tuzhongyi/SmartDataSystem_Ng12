import { Inject, Injectable } from '@angular/core';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { Division } from 'src/app/network/model/division.model';
import { CommonElementListModel } from './common-element-list.model';

@Injectable({
  providedIn: 'root',
})
export class CommonElementListConverter extends AbstractCommonModelConverter<
  CommonElementListModel<any>
> {
  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof Division) {
      return this._fromDivision(source);
    }
    throw new TypeError();
  }

  private _fromDivision(item: Division) {
    let model = new CommonElementListModel<Division>();
    model.Id = item.Id;
    model.Name = item.Name;
    model.Children = [];

    model.RawData = item;

    return model;
  }
}
