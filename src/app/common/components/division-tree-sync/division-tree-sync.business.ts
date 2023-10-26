import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { DivisionType } from 'src/app/enum/division-type.enum';

import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { DivisionTreeConverter } from '../division-tree/division-tree.converter';
import { DivisionTreeSyncArgs } from './division-tree-sync.model';

@Injectable()
export class DivisionTreeSyncBusiness {
  public nestedNodeMap = new Map<string, CommonNestNode<Division>>();
  private datas: Array<Division | GarbageStation> = [];
  constructor(
    private _divisionRequest: DivisionRequestService,
    private _stationRequest: GarbageStationRequestService,
    private _converter: DivisionTreeConverter
  ) {}

  // 相当于默认请求 condition==''的区划
  async load(args: DivisionTreeSyncArgs) {
    this.nestedNodeMap.clear();

    let data = await this.getData(args);

    if (args.name) {
      data = this.filtName(data, args.name);
    }

    data = this.filtResourceType(data, args.resourceType);

    let res = this._converter.buildNestTree(data, args.onlystation);

    return res;
  }

  filtResourceType(data: Array<Division | GarbageStation>, type: DivisionType) {
    return data.filter((x) => {
      if (x instanceof Division) {
        if (x.DivisionType === type) {
          x.ParentId = undefined;
        }
        return x.DivisionType >= type;
      }
      return true;
    });
  }

  filtName(data: Array<Division | GarbageStation>, name: string) {
    return data.filter((x) => {
      return x.Name.includes(name);
    });
  }

  filteDepth(nodes: CommonNestNode[]) {
    return nodes;
  }

  searchNode(args: DivisionTreeSyncArgs) {
    return this.load(args);
  }

  async getData(args: DivisionTreeSyncArgs) {
    if (args.onlystation) {
      return this._loadStation();
    }
    let divisions = await this._loadDivision(args.resourceType);
    if (args.showStation) {
      let stations = await this._loadStation();
      return [...divisions, ...stations];
    }
    return divisions;
  }

  private async _loadDivision(type: DivisionType) {
    let array = await this._divisionRequest.cache.all();
    return plainToInstance(Division, array);
  }

  private async _loadStation() {
    let array = await this._stationRequest.cache.all();
    return plainToInstance(GarbageStation, array);
  }
}
