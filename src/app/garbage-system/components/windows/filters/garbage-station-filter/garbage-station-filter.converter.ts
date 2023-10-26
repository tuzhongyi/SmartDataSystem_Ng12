import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { SelectItemConverter } from 'src/app/converter/select-item.converter';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

export class GarbageStationFilterConverter
  implements IConverter<GarbageStation[], SelectItem[]>
{
  converter = {
    item: new SelectItemConverter(),
  };
  Convert(source: GarbageStation[]): SelectItem[] {
    let array: SelectItem[] = [];
    for (let i = 0; i < source.length; i++) {
      const division = source[i];
      let item = this.converter.item.Convert(division);
      array.push(item);
    }
    return array;
  }
}
