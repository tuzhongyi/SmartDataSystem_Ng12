import { SelectItem } from '../common/components/select-control/select-control.model';
import { IConverter } from '../common/interfaces/converter.interface';
import { IItemModel } from '../view-model/item.model';

export class SelectItemConverter implements IConverter<IItemModel, SelectItem> {
  Convert(source: IItemModel, ...res: any[]): SelectItem {
    let item = new SelectItem();
    item.Name = source.Name;
    item.Id = source.Id;
    item.value = source;
    return item;
  }
}
