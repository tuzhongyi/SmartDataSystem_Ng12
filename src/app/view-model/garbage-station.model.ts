import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class GarbageStationModel extends GarbageStation {
  Division?: Promise<DivisionModel>;
}

export class DivisionModel extends Division {
  Parent?: Promise<DivisionModel>;
}
