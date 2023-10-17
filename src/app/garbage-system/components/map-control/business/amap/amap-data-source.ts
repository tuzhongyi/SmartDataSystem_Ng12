import { StationType } from 'src/app/enum/station-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageStationNumberStatisticModel } from '../amap.model';

export class AMapDataSource {
  all: GarbageStation[] = [];

  get construction(): GarbageStation[] {
    return (
      this.all.filter((s) => s.StationType === StationType.Construction) ?? []
    );
  }
  get rfid(): GarbageStation[] {
    return (
      this.all.filter(
        (x) =>
          x.StationType === StationType.Rfid ||
          x.StationType === StationType.Smart
      ) ?? []
    );
  }
  get garbage(): GarbageStation[] {
    return this.all.filter((x) => x.StationType === StationType.Garbage) ?? [];
  }
  drop: AMapDataDropSource = new AMapDataDropSource();
  plug: AMapDataPlugSource = new AMapDataDropSource();
  points: Global.Dictionary<CesiumDataController.Point> = {};
}
class AMapDataDropSource {
  all: GarbageStationNumberStatisticModel[] = [];
  get construction(): GarbageStationNumberStatisticModel[] {
    return (
      this.all.filter(
        (s) => s.GarbageStation.StationType === StationType.Construction
      ) ?? []
    );
  }
  get rfid(): GarbageStationNumberStatisticModel[] {
    return (
      this.all.filter(
        (x) =>
          x.GarbageStation.StationType === StationType.Rfid ||
          x.GarbageStation.StationType === StationType.Smart
      ) ?? []
    );
  }
  get garbage(): GarbageStationNumberStatisticModel[] {
    return (
      this.all.filter(
        (x) => x.GarbageStation.StationType === StationType.Garbage
      ) ?? []
    );
  }
}
class AMapDataPlugSource {
  all: GarbageStationNumberStatisticModel[] = [];
  get construction(): GarbageStationNumberStatisticModel[] {
    return (
      this.all.filter(
        (s) => s.GarbageStation.StationType === StationType.Construction
      ) ?? []
    );
  }
  get rfid(): GarbageStationNumberStatisticModel[] {
    return (
      this.all.filter(
        (x) =>
          x.GarbageStation.StationType === StationType.Rfid ||
          x.GarbageStation.StationType === StationType.Smart
      ) ?? []
    );
  }
  get garbage(): GarbageStationNumberStatisticModel[] {
    return (
      this.all.filter(
        (x) => x.GarbageStation.StationType === StationType.Garbage
      ) ?? []
    );
  }
}
