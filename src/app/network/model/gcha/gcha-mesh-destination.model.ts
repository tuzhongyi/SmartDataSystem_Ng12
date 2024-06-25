import { IModel } from '../model.interface';
import { GCHAMeshNodePosition } from './gcha-mesh-node-position.model';

/**	MeshDestination(目的地)	*/
export class GCHAMeshDestination implements IModel {
  /**	String	目的地节点ID	O	*/
  Id?: string;
  /**	MeshNodePosition	目的地坐标	O	*/
  Position?: GCHAMeshNodePosition;
}
