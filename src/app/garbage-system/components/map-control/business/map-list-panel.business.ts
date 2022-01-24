import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Division } from 'src/app/network/model/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { ListItem, ListItemType } from '../map-list-panel/map-list-item';
import {
  ListPanelConverter,
  ListPanelType,
} from '../converter/map-list-panel.converter';

@Injectable()
export class ListPanelBusiness
  implements IBusiness<Array<ListPanelType>, ListItem<ListPanelType>[]>
{
  datasource: ListItem<ListPanelType>[] = [];

  constructor(
    private storeService: StoreService,
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService
  ) {}
  Converter: IConverter<ListPanelType[], ListItem<ListPanelType>[]> =
    new ListPanelConverter();

  async load(
    parentId: string,
    parentType: DivisionType
  ): Promise<ListItem<ListPanelType>[]> {
    let data = await this.getData(parentId, parentType);
    return this.Converter.Convert(data);
  }
  async getData(
    parentId: string,
    parentType: DivisionType
  ): Promise<ListPanelType[]> {
    switch (parentType) {
      case DivisionType.Committees:
        return this.loadGarbageStation(parentId);
      default:
        return this.loadDivision(parentId);
    }
  }

  async init() {
    this.datasource = await this.load(
      this.storeService.divisionId,
      this.storeService.divisionType
    );
  }

  itemSelected: EventEmitter<ListPanelType> = new EventEmitter();

  async onItemCliced(item: ListItem<ListPanelType>) {
    let data: ListPanelType = item.Data;
    switch (item.type) {
      case ListItemType.Division:
        data = await this.loadByDivision(item.Data as Division);
        break;
      case ListItemType.GarbageStation:
        break;
      case ListItemType.Parent:
        data = await this.loadByParent(item.Data as Division);
        break;
      default:
        break;
    }

    this.itemSelected.emit(data);
  }

  async loadByDivision(division: Division) {
    let source = await this.load(division.Id, division.DivisionType);
    let parentItem = this.createParentItem(division);
    source.unshift(parentItem);
    this.datasource = source;
    return division;
  }
  async loadByParent(division: Division) {
    let parent = await this.divisionService.cache.get(division.ParentId!);
    let source = await this.load(parent.Id, parent.DivisionType);
    if (parent.DivisionType !== this.storeService.divisionType) {
      let parentItem = this.createParentItem(parent);
      source.unshift(parentItem);
    }
    this.datasource = source;
    return parent;
  }

  async loadDivision(parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    let response = await this.divisionService.cache.list(params);
    return response.Data;
  }

  async loadGarbageStation(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let response = await this.stationService.cache.list(params);
    return response.Data;
  }

  createParentItem(division: Division) {
    return new ListItem(division.Id, '上一级', ListItemType.Parent, division);
  }

  async onSearch(text: string) {
    if (text) {
      let params = new GetGarbageStationsParams();
      params.Name = text;
      let data = await this.stationService.cache.list(params);
      let items = this.Converter.Convert(data.Data);
      this.datasource = items;
    } else {
      this.init();
    }
  }
}
