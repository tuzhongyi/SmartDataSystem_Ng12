import { InfoDetailsDivisionCommitteesMemberBusiness } from './business/info-details-division-committees-member.business';
import { InfoDetailsDivisionCommitteesStatisticBusiness } from './business/info-details-division-committees-statistic.business';
import { InfoDetailsDivisionCommitteesBusiness } from './business/info-details-division-committees.business';
import { InfoDetailsDivisionCommitteesStationTableController } from './controller/info-details-division-committees-station-table.controller';
import { InfoDetailsDivisionCommitteesStatisticController } from './controller/info-details-division-committees-statistic.controller';

export const InfoDetailsDivisionCommitteesProviders = [
  InfoDetailsDivisionCommitteesBusiness,
  InfoDetailsDivisionCommitteesStatisticBusiness,
  InfoDetailsDivisionCommitteesMemberBusiness,
  InfoDetailsDivisionCommitteesStationTableController,
  InfoDetailsDivisionCommitteesStatisticController,
];
