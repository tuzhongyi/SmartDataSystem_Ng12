import { SelectEnum } from "src/app/enum/select.enum";
import { TreeServiceEnum } from "src/app/enum/tree-service.enum";
import { UserResourceType } from "src/app/enum/user-resource-type.enum";

export class DivisionStationTreeConfig {
  depth: number = 0;
  showDepth: number = 0;
  depthIsEnd: boolean = true;
  treeServiceModel: TreeServiceEnum = TreeServiceEnum.Division;
  treeSelectModel: SelectEnum = SelectEnum.Multiple;
  userType: UserResourceType = UserResourceType.County;

}

export class DivisionStationTreeFilterConfig {
  tree: DivisionStationTreeConfig = new DivisionStationTreeConfig();
}