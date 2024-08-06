import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { ListPanelDivisionBusiness } from './map-control-list-panel-division.business';
import { ListPanelStationBusiness } from './map-control-list-panel-station.business';
import {
  ListItem,
  ListItemType,
  MapListPanelArgs,
} from './map-control-list-panel.model';
import { ListPanelConverter, ListPanelType } from './map-list-panel.converter';

@Injectable()
export class ListPanelBusiness
  implements IBusiness<Array<ListPanelType>, ListItem<ListPanelType>[]>
{
  constructor(
    private global: GlobalStorageService,
    private converter: ListPanelConverter,
    private division: ListPanelDivisionBusiness,
    private station: ListPanelStationBusiness
  ) {}

  async load(args: MapListPanelArgs): Promise<ListItem<ListPanelType>[]> {
    let divisionId =
      args.divisionId ?? (await this.global.division.promise.default).Id;

    let data = await this.getData(divisionId);
    let model = this.converter.Convert(data);

    if (
      args.divisionId &&
      args.divisionId != (await this.global.division.promise.default).Id
    ) {
      let current = await this.division.get(divisionId);
      if (current.ParentId) {
        let parent = await this.division.get(current.ParentId);
        let item = this.createParentItem(parent);
        model.unshift(item);
      }
    }

    return model;
  }
  async getData(parentId: string): Promise<ListPanelType[]> {
    let parent = await this.division.get(parentId);

    switch (parent.DivisionType) {
      case DivisionType.Committees:
        return this.station.load(parentId);
      default:
        return this.division.load(parentId);
    }
  }

  createParentItem(division: Division) {
    return new ListItem(division.Id, '上一级', ListItemType.Parent, division);
  }

  async search(name: string) {
    let data = await this.station.search(name);
    let model = this.converter.Convert(data);
    return model;
  }

  // async onSearch(text: string) {
  //   if (text) {
  //     let params = new GetGarbageStationsParams();
  //     params.Name = text;
  //     let data = await this.stationService.cache.list(params);
  //     let items = this.converter.Convert(data.Data);
  //     this.datasource = items;
  //   } else {
  //     this.init();
  //   }
  // }
}
