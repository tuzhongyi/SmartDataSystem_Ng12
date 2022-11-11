import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { Division } from 'src/app/network/model/division.model';
import { ElementListModel } from './element-list.model';

export class ElementListConverter extends AbstractCommonModelConverter<
  ElementListModel<any>
> {
  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof Division) {
      return this._fromDivision(source);
    }
    throw new TypeError();
  }

  private _fromDivision(item: Division) {
    let model = new ElementListModel<Division>();
    model.Id = item.Id;
    model.Name = item.Name;
    model.Children = [];

    model.rawData = item;

    return model;
  }
}
