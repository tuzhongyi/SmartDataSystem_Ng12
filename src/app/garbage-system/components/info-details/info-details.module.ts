import { InfoDetailsDivisionCommitteesComponent } from './info-details-division-committees/info-details-division-committees.component';
import { InfoDetailsDivisionCountyComponent } from './info-details-division-county/info-details-division-county.component';
import { InfoDetailsTables } from './info-details-tables/info-details-tables.module';

export const InfoDetailsComponents = [
  InfoDetailsDivisionCommitteesComponent,
  InfoDetailsDivisionCountyComponent,
  ...InfoDetailsTables,
];
