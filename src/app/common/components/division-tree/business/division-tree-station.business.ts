import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { DivisionTreeService } from '../service/division-tree.service';

export class DivisionTreeStationBusiness {
  constructor(private service: DivisionTreeService) {}

  children(parentId: string): Promise<GarbageStation[]> {
    throw new Error('Method not implemented.');
  }

  list() {
    return this.service.station.list();
  }

  search(name: string) {
    return this.service.station.search(name);
  }
}
