import { Injectable } from '@angular/core';
import { CommonTreeConverter } from 'src/app/converter/common-tree.converter';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { IconTypeEnum } from 'src/app/enum/icon-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionNode } from 'src/app/network/model/division-tree.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { DivisionTreeSource } from './division-tree.model';

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
    } else if (source instanceof VehicleCamera) {
      return this._fromVehicleCamera(source);
    }

    throw new Error('Method not implemented.');
  }

  private _fromVehicleCamera(item: VehicleCamera) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.ParentId = item.GarbageVehicleId;
    node.ChildrenLoaded = false;
    node.ParentNode = undefined;
    // node.IconClass =
    //   DivisionNodeIconType.get(
    //     EnumHelper.ConvertDivisionToUserResource(item.DivisionType)
    //   ) ?? '';
    node.RawData = item;
    return node;
  }

  private _fromDivision(item: Division) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = !item.IsLeaf;
    node.ParentId = item.ParentId;
    node.ChildrenLoaded = false;
    node.ParentNode = undefined;
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
    node.ParentId = item.DivisionId;
    node.ChildrenLoaded = false;
    node.ParentNode = undefined;
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
    node.ParentId = item.DivisionId;
    node.ChildrenLoaded = false;
    node.ParentNode = undefined;
    node.RawData = item;

    return node;
  }

  private _fromDivisionNode(item: any, parentId?: string) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = item.Nodes.length > 0;
    node.ParentId = parentId;
    node.ChildrenLoaded = true;
    node.ParentNode = undefined;
    node.IconClass =
      DivisionNodeIconType.get(
        EnumHelper.ConvertDivisionToUserResource(item.DivisionType)
      ) ?? '';
    node.RawData = item;
    return node;
  }
}
