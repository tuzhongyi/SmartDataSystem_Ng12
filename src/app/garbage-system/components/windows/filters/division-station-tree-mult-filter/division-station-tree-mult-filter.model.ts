import { DivisionType } from 'src/app/enum/division-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';

export class DivisionStationTreeConfig {
  depth: number = 0;
  showDepth: number = 0;
  depthIsEnd: boolean = true;
  showStation: boolean = false;

  treeSelectModel: SelectStrategy = SelectStrategy.Multiple;
  divisionType: DivisionType = DivisionType.County;
}

export class DivisionStationTreeFilterConfig {
  tree: DivisionStationTreeConfig = new DivisionStationTreeConfig();
}
