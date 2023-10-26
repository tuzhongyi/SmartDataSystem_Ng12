import { CollectionPoint } from '../model/garbage-station/collection-point.model';
import { DivisionModel } from './division.view-model';

/**	收运点	*/
export class CollectionPointModel extends CollectionPoint {
  /**	String	所属区划ID	O	*/
  Division?: Promise<DivisionModel>;
}
