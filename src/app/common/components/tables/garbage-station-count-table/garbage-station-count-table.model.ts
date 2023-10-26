import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

export class DivisionModel extends Division {
  GarbageStations!: Promise<GarbageStation[]>;
}
