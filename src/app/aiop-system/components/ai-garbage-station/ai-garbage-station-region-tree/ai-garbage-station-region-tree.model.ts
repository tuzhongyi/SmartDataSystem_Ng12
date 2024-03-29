import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { CommonTreeModel } from 'src/app/view-model/common-tree.model';

export class DivisionModel extends Division implements CommonTreeModel {}
export class AIGarbageRegionModel
  extends AIGarbageRegion
  implements CommonTreeModel {}
export class AIGarbageDeviceModel
  extends AIGarbageDevice
  implements CommonTreeModel
{
  Name!: string;
}

export type TreeSourceType =
  | DivisionModel
  | AIGarbageRegionModel
  | AIGarbageDeviceModel;

export class AIGarbageRegionTreeArgs {
  name?: string;
  showRegion: boolean = false;
  showDevice: boolean = false;
}
