import { Injectable } from '@angular/core';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DivisionModel } from 'src/app/view-model/garbage-station.model';
import {
  ListItem,
  ListItemType,
} from '../../map-control-list-panel/map-list-item';

export type ListPanelType = Division | GarbageStation;
@Injectable()
export class ListPanelConverter
  implements IConverter<ListPanelType[], ListItem<ListPanelType>[]>
{
  constructor(private service: GarbageStationRequestService) {}
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
  fromDivision(source: DivisionModel) {
    let item = new ListItem(
      source.Id,
      source.Name,
      ListItemType.Division,
      source
    );
    let params = new GetGarbageStationsParams();
    params.DivisionId = source.Id;
    this.service.cache.list(params).then((x) => {
      item.hasChild = x.Data.length > 0;
    });
    return item;
  }
  fromGarbageStation(source: GarbageStation) {
    let item = new ListItem(
      source.Id,
      source.Name,
      ListItemType.GarbageStation,
      source
    );
    return item;
  }
}
