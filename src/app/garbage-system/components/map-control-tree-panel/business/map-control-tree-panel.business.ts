import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { MapControlTreePanelConverter } from '../map-control-tree-panel.converter';
import { MapControlTreePanelDivisionBusiness } from './map-control-tree-panel-division.business';
import { MapControlTreePanelStationBusiness } from './map-control-tree-panel-station.business';

@Injectable()
export class MapControlTreePanelBusiness {
  constructor(
    private division: MapControlTreePanelDivisionBusiness,
    private station: MapControlTreePanelStationBusiness,
    private global: GlobalStorageService,
    private converter: MapControlTreePanelConverter
  ) {}

  async load(divisionId?: string) {
    let parentId = divisionId ?? (await this.global.defaultDivisionId);
    let defaultType = await this.global.defaultDivisionType;
    let datas = await this.loadData(parentId);
    let model = datas.map((x) => {
      return this.converter.convert(x, defaultType);
    });
    return model;
  }

  async loadData(parentId: string) {
    let parent = await this.division.get(parentId);
    if (parent.DivisionType === DivisionType.Committees) {
      return this.station.load(parentId);
    } else {
      return this.division.load(parentId);
    }
  }
}
