import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { ViewModelConverter } from 'src/app/converter/view-models/view-model.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DivisionModel } from 'src/app/network/view-model/division.view-model';
import {
  ListItem,
  ListItemType,
} from '../../map-control-list-panel/map-list-item';
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
    private storeService: GlobalStorageService,
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService,
    private vmConverter: ViewModelConverter
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
        data = await this.loadByDivision(item.Data as DivisionModel);
        break;
      case ListItemType.GarbageStation:
        break;
      case ListItemType.Parent:
        data = await this.loadByParent(item.Data as DivisionModel);
        break;
      default:
        break;
    }

    this.itemSelected.emit(data);
  }

  async loadByDivision(division: DivisionModel) {
    let source = await this.load(division.Id, division.DivisionType);
    let parentItem = this.createParentItem(division);
    source.unshift(parentItem);
    this.datasource = source;
    return division;
  }
  async loadByParent(division: DivisionModel) {
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
    return response.Data.map((x) => {
      return this.vmConverter.Division(x);
    });
  }

  async loadGarbageStation(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let response = await this.stationService.cache.list(params);
    return response.Data.map((x) => {
      return this.vmConverter.GarbageStation(x);
    });
  }

  createParentItem(division: DivisionModel) {
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
