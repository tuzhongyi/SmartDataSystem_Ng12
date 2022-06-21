import { InjectionToken, Provider } from "@angular/core";
import { DistrictTreeBusiness } from "../business/district-tree.business";
import { RegionTreeBusiness } from "../business/region-tree.business";
import { TreeBusinessInterface } from "../interface/tree-business.interface";

export const TreeBusinessToken = new InjectionToken<TreeBusinessInterface>('')

export const TreeBusinessProviders: Provider[] = [
  {
    provide: TreeBusinessToken,
    useClass: DistrictTreeBusiness,
    multi: true
  },
  {
    provide: TreeBusinessToken,
    useClass: RegionTreeBusiness,
    multi: true
  },
]