import { Injectable } from '@angular/core';
import { CommonTreeConverter } from 'src/app/converter/common-tree.converter';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { Division } from 'src/app/network/model/division.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';

@Injectable()
export class AIGarbageStationRegionTreeConverter extends CommonTreeConverter {
  Convert(source: AIGarbageRegion | Division, ...res: any[]): CommonNestNode {
    if (source instanceof AIGarbageRegion) {
      return this._fromRegion(source);
    } else if (source instanceof Division) {
      return this._fromDivision(source);
    }
    throw new Error('Method not implemented.');
  }

  private _fromDivision(item: Division): CommonNestNode<Division> {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = true;
    node.ParentId = undefined;
    node.ChildrenLoaded = true;
    node.ParentNode = undefined;
    node.IconClass = 'howell-icon-earth';
    node.RawData = item;
    node.hideArrow = true;

    return node;
  }

  private _fromRegion(item: AIGarbageRegion): CommonNestNode<AIGarbageRegion> {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name ?? '';
    node.HasChildren = false;
    node.ParentId = item.DivisionId!;
    node.ChildrenLoaded = true;
    node.ParentNode = undefined;
    node.IconClass = 'howell-icon-map5';
    node.RawData = item;
    node.hideArrow = true;
    return node;
  }
}
