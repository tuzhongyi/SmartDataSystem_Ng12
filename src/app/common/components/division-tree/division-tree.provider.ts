import { DivisionTreeBusiness } from './business/division-tree.business';
import { DivisionTreeBusinessFactory } from './business/division-tree.business.factory';
import { DivisionTreeCityService } from './service/division-tree-city.service';

import { DivisionTreeCommitteesService } from './service/division-tree-committees.service';
import { DivisionTreeCountyService } from './service/division-tree-county.service';
import { DivisionTreeStationService } from './service/division-tree-station.service';
import { DivisionTreeService } from './service/division-tree.service';

export const DivisionTreeProviders = [
  DivisionTreeCityService,
  DivisionTreeCountyService,
  DivisionTreeCommitteesService,
  DivisionTreeStationService,
  DivisionTreeService,
  DivisionTreeBusiness,
  DivisionTreeBusinessFactory,
];
