import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class DivisionModel extends Division {
  GarbageStations!: Promise<GarbageStation[]>;
}
