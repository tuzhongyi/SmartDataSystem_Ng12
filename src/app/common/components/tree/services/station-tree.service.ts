import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { ServiceInterface } from '../interface/service.interface';

export class StationTreeService /**implements ServiceInterface */ {
  constructor() {}
  getName() {
    return TreeServiceEnum.Station;
  }
  loadData() {}
}
