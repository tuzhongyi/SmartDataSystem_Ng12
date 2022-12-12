import { EventEmitter, Injectable } from '@angular/core';
import { DivisionTreeConverter } from 'src/app/common/components/division-tree/division-tree.converter';
import {
  DivisionTreeSource,
  IDivisionTreeBusiness,
} from 'src/app/common/components/division-tree/division-tree.model';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';

import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { Division } from 'src/app/network/model/division.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { GarbageCollectionPointTreeDivisionBusiness } from './garbage-collection-point-tree-division.business';
import { GarbageCollectionPointTreeSourceBusiness } from './garbage-collection-point-tree-point.business';

@Injectable()
export class GarbageCollectionPointTreeBusiness
  implements IDivisionTreeBusiness
{
  private vehicles: GarbageVehicle[] = [];

  public showExtend = true;
  public depthIsEnd = false;
  public loaded: EventEmitter<DivisionTreeSource[]> = new EventEmitter();
  private datas: DivisionTreeSource[] = [];

  public nestedNodeMap = new Map<string, CommonNestNode<Division>>();

  constructor(
    private _division: GarbageCollectionPointTreeDivisionBusiness,
    private _source: GarbageCollectionPointTreeSourceBusiness,
    private _converter: DivisionTreeConverter
  ) {}
  async getData(): Promise<DivisionTreeSource[]> {
    let divisions = await this._division.all();
    let points = await this._source.all();
    return [...divisions, ...points];
  }

  // 相当于默认请求 condition==''的区划
  async load(type: DivisionType = DivisionType.City, depth: number = 0) {
    this.nestedNodeMap.clear();

    this.datas = await this.getData();
    this.loaded.emit(this.datas);
    let nodes = this._converter.buildNestTree(this.datas);
    this._updateNestedMap(nodes);

    return nodes;

    return this._getDataRecursively(type, depth).then((x) => {
      this.loaded.emit(this.datas);
      return x;
    });
  }

  async loadChildren(flat: CommonFlatNode<Division>) {
    let node = this.nestedNodeMap.get(flat.Id);
    if (!node) return;
    if (node.ChildrenLoaded) return;

    let children: CommonNestNode[] = [];
    try {
      let type = node.RawData.DivisionType;

      let data = await this._division.getByType(
        EnumHelper.GetDivisionChildType(type),
        node.Id
      );
      children = this._converter.iterateToNestNode(data);
      children.forEach((child) => (child.ParentNode = node!));
      this._register(children);
      node.childrenChange.next(children);
      node.ChildrenLoaded = true;
      // 如果当前是请求街道下层的居委会信息，而且需要展示厢房，则居委会节点要能loadChildren
      if (type == DivisionType.County && this.showExtend) {
        children.forEach((child) => (child.HasChildren = true));
      }

      this.loadVehicles([node.RawData as Division]);
    } catch (e) {}

    // console.log('子节点', node)
    return node;
  }

  findParent(source: DivisionTreeSource) {
    if (source instanceof VehicleCamera) {
      return this.datas.find((x) => x.Id === source.GarbageVehicleId);
    } else if (source instanceof GarbageVehicle) {
      return this.datas.find((x) => x.Id === source.DivisionId);
    } else {
      return this.datas.find((x) => x.Id === (source as Division).ParentId);
    }
  }

  async searchNode(
    name: string,
    type: DivisionType = DivisionType.City,
    depth: number = 0
  ) {
    this.nestedNodeMap.clear();
    let result = this.datas.filter((x) => x.Name.includes(name));

    for (let i = 0; i < result.length; i++) {
      let item = result[i];
      let parent: DivisionTreeSource | undefined;
      do {
        parent = this.findParent(item);
        if (parent) {
          let index = result.findIndex((x) => x.Id === parent!.Id);
          if (index < 0) {
            result.push(parent);
          }
          item = parent;
        }
      } while (parent);
    }

    let nodes = this._converter.buildNestTree(result);
    this._updateNestedMap(nodes);
    return nodes;
  }

  private async _getDataRecursively(
    type: DivisionType = DivisionType.City,
    depth: number = 0
  ) {
    if (depth < 0) return [];
    let data = await this._division.getByType(type);
    this.datas.push(...data);
    let nodes = this._converter.iterateToNestNode(data);
    this._register(nodes);

    if (type == DivisionType.Committees && this.showExtend) {
      nodes.forEach((node) => (node.HasChildren = true));
    }
    if (depth == 0 && this.depthIsEnd) {
      nodes.forEach((node) => {
        node.HasChildren = false;
      });
    }

    try {
      let children = await this._getDataRecursively(
        EnumHelper.GetDivisionChildType(type),
        depth - 1
      );

      children.forEach((child) => {
        let parentId = child.ParentId;
        if (parentId) {
          let parentNode = this.nestedNodeMap.get(parentId);
          if (parentNode) {
            // console.log(parentNode.name)
            child.ParentNode = parentNode;
            parentNode.ChildrenLoaded = true;
            parentNode.childrenChange.value.push(child);
          }
        }
      });
    } catch (e) {
      // 当 GetResourceChildType 没有下一级时报错，自动退出
      // console.log(e)
    }

    this.loadVehicles(data);

    return nodes;
  }

  loadVehicles(divisions: Division[]) {
    let vehicles = this.vehicles
      .filter((x) => divisions.findIndex((y) => y.Id === x.DivisionId) >= 0)
      .sort((a, b) => {
        return LocaleCompare.compare(b.Name, a.Name);
      });
    if (vehicles) {
      this.datas.push(...vehicles);
      vehicles.forEach((x) => {
        let parent = this.nestedNodeMap.get(x.DivisionId!);
        if (parent) {
          let current = this._converter.Convert(x);
          current.ParentNode = parent;
          parent.childrenChange.value.push(current);
          this.loadCameras(x, current);
        }
      });
    }
    return vehicles;
  }

  loadCameras(vehicle: GarbageVehicle, parent: CommonNestNode) {
    if (vehicle.Cameras) {
      this.datas.push(...vehicle.Cameras);
      vehicle.Cameras.forEach((x) => {
        if (parent) {
          let current = this._converter.Convert(x);
          current.ParentNode = parent;
          parent.childrenChange.value.push(current);
        }
      });
    }
  }

  private async _getAncestorDivision(division: Division) {
    let res: Division[] = [];

    while (division.ParentId) {
      let d = await this._division.get(division.ParentId);
      res.push(d);
      division = d;
    }

    return res;
  }

  private _register(nodes: CommonNestNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      // 一定要直接覆盖，保证 node 为最新
      this.nestedNodeMap.set(node.Id, node);
    }
  }
  private _updateNestedMap(nodes: CommonNestNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      this.nestedNodeMap.set(node.Id, node);
      if (node.childrenChange.value.length > 0) {
        this._updateNestedMap(node.childrenChange.value);
      }
    }
  }
}
