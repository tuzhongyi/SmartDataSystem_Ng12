import { DistrictTreeEnum } from 'src/app/enum/district-tree.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TreeBusinessEnum } from 'src/app/enum/tree-business.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';

export class DivisionStationTreeConfig {
  depth: number = 0;
  showDepth: number = 0;
  depthIsEnd: boolean = true;
  treeServiceModel: DistrictTreeEnum = DistrictTreeEnum.Division;
  treeSelectModel: SelectStrategy = SelectStrategy.Multiple;
  divisionType: DivisionType = DivisionType.County;
}

export class DivisionStationTreeFilterConfig {
  tree: DivisionStationTreeConfig = new DivisionStationTreeConfig();
}
