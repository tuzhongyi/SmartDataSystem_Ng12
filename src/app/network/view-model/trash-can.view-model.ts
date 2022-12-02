import { CollectionPoint } from '../model/collection-point.model';
import { CollectionTrashCan } from '../model/trash-can.model';
import { CollectionPointModel } from './collection-point.view-model';
import { DivisionModel } from './division.view-model';

/**	垃圾桶	*/
export class VehicleTrashCanModel extends CollectionTrashCan {
  /**	String	所属区划ID	O	*/
  Division?: Promise<DivisionModel>;
  /**	String	收运点ID	O	*/
  CollectionPoint?: Promise<CollectionPointModel>;
}
