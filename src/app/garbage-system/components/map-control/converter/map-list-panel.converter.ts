import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { MapListItem, MapListItemType } from '../map-list-panel/map-list-item';

export type MapListPanelType = Division | GarbageStation;
export class MapListPanelConverter
  implements IConverter<MapListPanelType[], MapListItem<MapListPanelType>[]>
{
  Convert(
    source: MapListPanelType[],
    ...res: any[]
  ): MapListItem<MapListPanelType>[] {
    let result: MapListItem<MapListPanelType>[] = [];
    for (let i = 0; i < source.length; i++) {
      const item = this.itemConvert(source[i]);
      result.push(item);
    }
    return result;
  }

  itemConvert(source: MapListPanelType): MapListItem<MapListPanelType> {
    if (source instanceof Division) {
      return this.fromDivision(source);
    } else if (source instanceof GarbageStation) {
      return this.fromGarbageStation(source);
    } else {
      throw new Error('source is not MapListPanelType');
    }
  }
  fromDivision(source: Division) {
    return new MapListItem(
      source.Id,
      source.Name,
      MapListItemType.Division,
      source
    );
  }
  fromGarbageStation(source: GarbageStation) {
    return new MapListItem(
      source.Id,
      source.Name,
      MapListItemType.GarbageStation,
      source
    );
  }
}
