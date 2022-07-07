import { Injectable } from "@angular/core";
import { RegionType } from "../enum/region-type.enum";
import { Region, RegionNode } from "../network/model/region";
import { CommonNestNode } from "../view-model/common-nest-node.model";
import { CommonTreeConverter } from "./common-tree.converter";


const RegionNodeIconType = new Map([
  [RegionType.None, 'howell-icon-earth'],
  [RegionType.Normal, 'howell-icon-earth'],
  [RegionType.Leaf, 'howell-icon-map5'],
]);


type RegionTreeSource = Region | RegionNode

@Injectable({
  providedIn: 'root'
})
export class RegionTreeConverter extends CommonTreeConverter {


  Convert(source: RegionTreeSource, ...res: any[]): CommonNestNode {
    if (source instanceof Region) {
      return this._fromRegion(source)
    } else if (source instanceof RegionNode) {
      return this._fromRegionNode(source)
    }

    throw new Error('Method not implemented.');
  }

  private _fromRegion(item: Region) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = false;
    node.ParentId = item.ParentId ?? null;
    node.ChildrenLoaded = true;
    node.ParentNode = null;
    node.IconClass = RegionNodeIconType.get(item.RegionType) ?? ''
    node.RawData = item;
    return node;
  }
  private _fromRegionNode(item: RegionNode, parentId: string | null = null) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = !!(item.Nodes && item.Nodes.length > 0);
    node.ParentId = parentId
    node.ChildrenLoaded = true;
    node.ParentNode = null;
    node.IconClass = RegionNodeIconType.get(item.RegionType) ?? ''
    node.RawData = item;
    return node;
  }
}