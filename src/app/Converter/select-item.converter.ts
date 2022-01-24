import { SelectItem } from '../common/components/select-control/select-control.model';
import { IConverter } from '../common/interfaces/converter.interface';
import { IModel } from '../network/model/model.interface';

interface SelectItemSource extends IModel {
  Id: string;
  Name: string;
}

export class SelectItemConverter
  implements IConverter<SelectItemSource, SelectItem>
{
  Convert(source: SelectItemSource, ...res: any[]): SelectItem {
    let item = new SelectItem();
    item.language = source.Name;
    item.key = source.Id;
    item.value = source;
    return item;
  }
}
