import { GisRoutePoint } from '../model/gis-point.model';
import { VehicleTrashCan } from '../model/trash-can.model';

export class GisRoutePointModel extends GisRoutePoint {
  TrashCan?: Promise<VehicleTrashCan>;
}
