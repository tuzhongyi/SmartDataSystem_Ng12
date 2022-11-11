import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { IBusiness } from '../../interfaces/bussiness.interface';

export interface IDivisionTreeBusiness
  extends IBusiness<Division[] | GarbageStation[], CommonNestNode[]> {
  showStation: boolean;
  depthIsEnd: boolean;
  nestedNodeMap: Map<string, CommonNestNode<Division>>;
  searchNode(...args: any[]): Promise<CommonNestNode<any>[]>;
  loadChildren(
    flat: CommonFlatNode<Division>
  ): Promise<CommonNestNode<Division> | undefined>;
}

export interface IDivisionTreeComponent {
  business: IDivisionTreeBusiness;
}
