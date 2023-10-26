import { GarbageVehicle } from '../model/garbage-station/garbage-vehicle.model';
import { DivisionModel } from './division.view-model';

/**	清运车辆	*/
export class GarbageVehicleModel extends GarbageVehicle {
  /**	String	所属区划ID	O	*/
  Division?: Promise<DivisionModel>;
}
