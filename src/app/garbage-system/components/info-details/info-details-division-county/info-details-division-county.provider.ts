import { InfoDetailsDivisionCountyMemberBusiness } from './business/info-details-division-county-member.business';
import { InfoDetailsDivisionCountyStatisticBusiness } from './business/info-details-division-county-statistic.business';
import { InfoDetailsDivisionCountyBusiness } from './business/info-details-division-county.business';
import { InfoDetailsDivisionCountyChildrenTableController } from './controller/info-details-division-county-children-table.controller';
import { InfoDetailsDivisionCountyStatisticController } from './controller/info-details-division-county-statistic.controller';

export const InfoDetailsDivisionCountyProviders = [
  InfoDetailsDivisionCountyBusiness,
  InfoDetailsDivisionCountyStatisticBusiness,
  InfoDetailsDivisionCountyMemberBusiness,
  InfoDetailsDivisionCountyStatisticController,
  InfoDetailsDivisionCountyChildrenTableController,
];
