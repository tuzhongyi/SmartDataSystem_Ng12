import { CollectionPoint } from 'src/app/network/model/collection-point.model';
import { DivisionNode } from 'src/app/network/model/division-tree.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { IBusiness } from '../../interfaces/bussiness.interface';

export interface IDivisionTreeBusiness
  extends IBusiness<DivisionTreeSource[], CommonNestNode[]> {
  showExtend: boolean;
  depthIsEnd: boolean;
  nestedNodeMap: Map<string, CommonNestNode<DivisionTreeSource>>;
  searchNode(...args: any[]): Promise<CommonNestNode<any>[]>;
  loadChildren(
    flat: CommonFlatNode<DivisionTreeSource>
  ): Promise<CommonNestNode<DivisionTreeSource> | undefined>;
}

export interface IDivisionTreeComponent {
  business: IDivisionTreeBusiness;
}

export type DivisionTreeSource =
  | Division
  | GarbageStation
  | DivisionNode
  | GarbageVehicle
  | VehicleCamera
  | CollectionPoint;
