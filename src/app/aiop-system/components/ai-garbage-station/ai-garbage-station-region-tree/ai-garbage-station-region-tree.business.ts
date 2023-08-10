import { Injectable } from '@angular/core';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { Division } from 'src/app/network/model/division.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { AIGarbageStationRegionTreeConverter } from './ai-garbage-station-region-tree.converter';
import { AIGarbageRegionTreeService } from './ai-garbage-station-region-tree.service';

@Injectable()
export class AIGarbageRegionTreeBusiness {
  public nestedNodeMap = new Map<string, CommonNestNode<AIGarbageRegion>>();

  constructor(
    private service: AIGarbageRegionTreeService,
    private _converter: AIGarbageStationRegionTreeConverter
  ) {}
  async init(name: string, onlyDivisionNode: boolean) {
    this.nestedNodeMap.clear();

    let regions = await this.service.regions();
    regions = regions.filter((x) => {
      if (x.Name) {
        return x.Name.toLowerCase().includes(name);
      }
      return false;
    });
    let divisionIds = regions
      .filter((x) => !!x.DivisionId)
      .map((x) => x.DivisionId!);
    let divisions = await this.service.divisions(divisionIds);
    let data;
    if (onlyDivisionNode) {
      data = [...divisions];
    } else {
      data = [...divisions, ...regions];
    }

    let res = this._converter.buildNestTree<Division | AIGarbageRegion>(data);
    return res;
  }
  searchNode(condition: string, onlyDivisionNode: boolean) {
    return this.init(condition, onlyDivisionNode);
  }
}
