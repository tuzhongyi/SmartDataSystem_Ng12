import { GisRoutePoint } from '../model/gis-point.model';
import { CollectionTrashCan } from '../model/trash-can.model';

export class GisRoutePointModel extends GisRoutePoint {
  TrashCan?: Promise<CollectionTrashCan>;
}
