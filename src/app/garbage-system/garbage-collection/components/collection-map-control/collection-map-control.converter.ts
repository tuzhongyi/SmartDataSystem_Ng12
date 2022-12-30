import { classToPlain, plainToClass } from 'class-transformer';
import { CoordinateTransform } from 'src/app/common/tools/coordinateTransform';
import { GisType } from 'src/app/enum/gis-type.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { GisPoint as GisRoutePoint } from 'src/app/network/model/gis-point.model';

export class CollectionMapControlConverter {
  GisPoint(gis: GisRoutePoint, height: number = 18) {
    let gcj02 = [gis.Longitude, gis.Latitude];
    switch (gis.GisType) {
      case GisType.BD09:
        gcj02 = CoordinateTransform.bd09togcj02(gis.Longitude, gis.Latitude);
        break;
      case GisType.WGS84:
        gcj02 = CoordinateTransform.wgs84togcj02(gis.Longitude, gis.Latitude);
        break;
      default:
        break;
    }
    return new CesiumDataController.Position(gcj02[0], gcj02[1], height);
  }

  Position(gis: { lon: number; lat: number }, type?: GisType) {
    switch (type) {
      case GisType.BD09:
        return CoordinateTransform.gcj02tobd09(gis.lon, gis.lat);
      case GisType.WGS84:
        return CoordinateTransform.gcj02towgs84(gis.lon, gis.lat);
      default:
        return [gis.lon, gis.lat];
    }
  }

  ElementType(type: VehicleType) {
    return CesiumDataController.ElementType.Vehicle;
  }

  GarbageVehicle(vehicle: GarbageVehicle) {
    let type = this.ElementType(vehicle.VehicleType);
    let point = new CesiumDataController.Point(vehicle.Id, type);
    point.url = 'img/route/vehicle.png';
    if (vehicle.GisPoint) {
      point.position = this.GisPoint(vehicle.GisPoint);
    }
    if (vehicle.DivisionId) {
      point.villageId = vehicle.DivisionId;
      point.parentId = vehicle.DivisionId;
    }

    point.name = vehicle.Name;
    return point;
  }
}
