import { IModel } from '../model.interface';

/**	MeshNodePosition(网状节点位置)	*/
export class GCHAMeshNodePosition implements IModel {
  /**	Int32	X轴坐标，单位：cm	M	*/
  X!: number;
  /**	Int32	Y轴坐标，单位：cm	M	*/
  Y!: number;
}
