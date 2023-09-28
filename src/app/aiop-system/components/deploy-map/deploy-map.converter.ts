import { GisType } from 'src/app/enum/gis-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GisPoint } from 'src/app/network/model/gis-point.model';

export class DeployMapConverter {
  position = new DeployMapPositionConverter();
  convert(station: GarbageStation): CesiumDataController.Point {
    let point = new CesiumDataController.Point();
    point.id = station.Id;
    point.name = station.Name;
    point.model = CesiumDataController.ModelType.Image;
    point.parentId = station.DivisionId ?? '';
    point.villageId = station.DivisionId ?? '';
    if (station.GisPoint) {
      point.position = this.position.from(station.GisPoint);
    }
    point.radian = 0;
    point.scale = 1;
    point.type = CesiumDataController.ElementType.Camera;
    point.url = 'img/camera.png';
    return point;
  }
}
class DeployMapPositionConverter {
  to(position: CesiumDataController.Position): GisPoint {
    let point = new GisPoint();
    point.GisType = GisType.GCJ02;
    point.Longitude = position.lon;
    point.Latitude = position.lat;
    return point;
  }
  from(gis: GisPoint) {
    let position = new CesiumDataController.Position();
    position.lon = gis.Longitude;
    position.lat = gis.Latitude;
    position.height = 18;
    return position;
  }
}
