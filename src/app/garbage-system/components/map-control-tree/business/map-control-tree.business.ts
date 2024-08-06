import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { MapControlTreeConverter } from '../map-control-tree.converter';
import {
  MapControlTreeArgs,
  MapControlTreeNode,
} from '../map-control-tree.model';
import { MapControlTreeDivisionBusiness } from './map-control-tree-division.business';
import { MapControlTreeStationBusiness } from './map-control-tree-station.business';

@Injectable()
export class MapControlTreeBusiness {
  constructor(
    private division: MapControlTreeDivisionBusiness,
    private station: MapControlTreeStationBusiness,
    private global: GlobalStorageService,
    private converter: MapControlTreeConverter
  ) {}

  // async load(args: MapControlTreeArgs, divisionId?: string) {
  //   let parentId = divisionId ?? (await this.global.defaultDivisionId);
  //   let defaultType = await this.global.defaultDivisionType;
  //   let datas = await this.loadData(parentId, args);
  //   let model = datas.map((x) => {
  //     return this.converter.convert(x);
  //   });
  //   return model;
  // }

  // async load(args: MapControlTreeArgs, divisionId?: string) {
  //   let parentId = divisionId ?? (await this.global.defaultDivisionId);
  //   let parent = await this.division.get(parentId);
  //   let node = this.converter.convert(
  //     parent,
  //     await this.global.defaultDivisionType
  //   );

  //   let children = await this.loadData(parentId, args);
  //   node.extendable = children.length > 0;
  //   for (let i = 0; i < children.length; i++) {
  //     const child = children[i];
  //     if (!node.children) {
  //       node.children = [];
  //     }
  //     if (child instanceof GarbageStation) {
  //       let current = this.converter.convert(
  //         child,
  //         await this.global.defaultDivisionType,
  //         await this.station.drops()
  //       );

  //       node.children.push(current);
  //     } else {
  //       let current = await this.load(args, child.Id);
  //       node.children.push(current);
  //     }
  //   }

  //   return node;
  // }

  // async load(args: MapControlTreeArgs) {
  //   let stations = await this.station.load(args);
  //   let divisions = await this.division.all();
  //   let defaultType = await this.global.defaultDivisionType;

  //   let datas = [...divisions, ...stations];

  //   let result = datas.map((x) => {
  //     let data = this.converter.convert(x, defaultType);
  //     if (x instanceof Division) {
  //       data.getChildren = (id: string) => {
  //         return result.filter((x) => x.parentId == id);
  //       };
  //     }
  //     return data;
  //   });
  //   return result;
  // }

  async load(args: MapControlTreeArgs) {
    let _default = await this.global.division.promise.default;
    let defaultId = _default.Id;
    let defaultType = _default.DivisionType;
    let divisions = await this.division.all();
    let stations = await this.station.load(args);
    let drops = await this.station.drops();
    let statistic = await this.station.statistic(stations.map((x) => x.Id));

    let root = await this.division.get(defaultId);
    let nodes = this.converter.tree(
      divisions,
      stations,
      root,
      defaultType,
      drops,
      statistic
    );
    return nodes;
  }

  async loadstation(args: MapControlTreeArgs) {
    let datas = await this.station.load(args);
    let drops = await this.station.drops();
    let statistic = await this.station.statistic(datas.map((x) => x.Id));

    let nodes = datas.map((x) =>
      this.converter.convert(
        x,
        undefined,
        drops.find((y) => y.Id === x.Id),
        statistic.find((y) => y.Id === x.Id)
      )
    );
    return nodes;
  }

  async loadData(parentId: string, args: MapControlTreeArgs) {
    let parent = await this.division.get(parentId);
    if (parent.DivisionType === DivisionType.Committees) {
      return this.station.load(args, parentId);
    } else {
      return this.division.load(parentId);
    }
  }

  async refresh(args: MapControlTreeArgs) {
    let stations = await this.station.load(args);
    let drops = await this.station.drops();
    let statistic = await this.station.statistic(stations.map((x) => x.Id));

    let flats = this.converter.flat(stations, drops, statistic);

    return flats;
  }

  getDivision(id: string) {
    return this.division.get(id);
  }

  destroy() {
    this.station.destroy();
  }

  find(
    id: string,
    datas: MapControlTreeNode[]
  ): MapControlTreeNode | undefined {
    for (let i = 0; i < datas.length; i++) {
      let data = datas[i];
      if (data.id === id) {
        return data;
      }
      if (data.children) {
        let result = this.find(id, data.children);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  }
}
