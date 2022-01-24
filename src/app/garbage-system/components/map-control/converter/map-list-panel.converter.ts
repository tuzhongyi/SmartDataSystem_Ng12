import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ListItem, ListItemType } from '../map-list-panel/map-list-item';

export type ListPanelType = Division | GarbageStation;
export class ListPanelConverter
  implements IConverter<ListPanelType[], ListItem<ListPanelType>[]>
{
  Convert(source: ListPanelType[], ...res: any[]): ListItem<ListPanelType>[] {
    let result: ListItem<ListPanelType>[] = [];
    for (let i = 0; i < source.length; i++) {
      const item = this.itemConvert(source[i]);
      result.push(item);
    }
    return result;
  }

  itemConvert(source: ListPanelType): ListItem<ListPanelType> {
    if (source instanceof Division) {
      return this.fromDivision(source);
    } else if (source instanceof GarbageStation) {
      return this.fromGarbageStation(source);
    } else {
      throw new Error('source is not MapListPanelType');
    }
  }
  fromDivision(source: Division) {
    return new ListItem(source.Id, source.Name, ListItemType.Division, source);
  }
  fromGarbageStation(source: GarbageStation) {
    return new ListItem(
      source.Id,
      source.Name,
      ListItemType.GarbageStation,
      source
    );
  }
}
