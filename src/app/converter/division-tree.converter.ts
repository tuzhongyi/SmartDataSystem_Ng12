import { Injectable } from '@angular/core';
import { EnumHelper } from '../enum/enum-helper';
import { IconTypeEnum } from '../enum/icon-type.enum';
import { UserResourceType } from '../enum/user-resource-type.enum';
import { DivisionNode } from '../network/model/division-tree.model';
import { Division } from '../network/model/division.model';
import { GarbageStation } from '../network/model/garbage-station.model';
import { GarbageVehicle } from '../network/model/garbage-vehicle.model';
import { CommonNestNode } from '../view-model/common-nest-node.model';
import { DivisionManageModel } from '../aiop-system/components/division-manage/division-manange.model';
import { CommonTreeConverter } from './common-tree.converter';

export type DivisionTreeSource =
  | Division
  | GarbageStation
  | DivisionNode
  | GarbageVehicle;

const DivisionNodeIconType = new Map([
  [UserResourceType.City, 'howell-icon-earth'],
  [UserResourceType.County, 'howell-icon-map5'],
  [UserResourceType.Committees, 'howell-icon-map5'],
  [UserResourceType.Station, 'howell-icon-garbage'],
]);

@Injectable({
  providedIn: 'root',
})
export class DivisionTreeConverter extends CommonTreeConverter {
  Convert(source: DivisionTreeSource, ...res: any[]): CommonNestNode {
    // DivisionNode 继承自 Division,要先判断掉
    if (source instanceof DivisionNode) {
      return this._fromDivisionNode(source);
    } else if (source instanceof Division) {
      return this._fromDivision(source);
    } else if (source instanceof GarbageStation) {
      return this._fromGarbageStation(source);
    } else if (source instanceof GarbageVehicle) {
      return this._fromGarbageVehicle(source);
    }

    throw new Error('Method not implemented.');
  }

  private _fromDivision(item: Division) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = !item.IsLeaf;
    node.ParentId = item.ParentId ? item.ParentId : null;
    node.ChildrenLoaded = false;
    node.ParentNode = null;
    node.IconClass =
      DivisionNodeIconType.get(
        EnumHelper.ConvertDivisionToUserResource(item.DivisionType)
      ) ?? '';
    node.RawData = item;
    return node;
  }
  private _fromGarbageStation(item: GarbageStation) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = false;
    node.ParentId = item.DivisionId ? item.DivisionId : null;
    node.ChildrenLoaded = false;
    node.ParentNode = null;
    node.IconClass = DivisionNodeIconType.get(UserResourceType.Station) ?? '';
    node.RawData = item;
    if (item.GisPoint) {
      node.ButtonIconClasses = [IconTypeEnum.unlink];
    } else {
      node.ButtonIconClasses = [IconTypeEnum.link];
    }

    return node;
  }

  private _fromGarbageVehicle(item: GarbageVehicle) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = false;
    node.ParentId = item.DivisionId ? item.DivisionId : null;
    node.ChildrenLoaded = false;
    node.ParentNode = null;
    node.RawData = item;

    return node;
  }

  private _fromDivisionNode(item: any, parentId: string | null = null) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = item.Nodes.length > 0;
    node.ParentId = parentId;
    node.ChildrenLoaded = true;
    node.ParentNode = null;
    node.IconClass =
      DivisionNodeIconType.get(
        EnumHelper.ConvertDivisionToUserResource(item.DivisionType)
      ) ?? '';
    node.RawData = item;
    return node;
  }
}
