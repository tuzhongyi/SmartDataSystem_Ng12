import { GisRoutePoint } from '../model/garbage-station/gis-point.model';
import { CollectionTrashCan } from '../model/garbage-station/trash-can.model';

export class GisRoutePointModel extends GisRoutePoint {
  TrashCan?: Promise<CollectionTrashCan>;
}
