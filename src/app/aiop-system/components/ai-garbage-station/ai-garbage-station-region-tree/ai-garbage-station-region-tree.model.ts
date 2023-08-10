import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { Division } from 'src/app/network/model/division.model';
import { CommonTreeModel } from 'src/app/view-model/common-tree.model';

export class DivisionModel extends Division implements CommonTreeModel {}
export class AIGarbageRegionModel
  extends AIGarbageRegion
  implements CommonTreeModel {}
