import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { Member } from 'src/app/network/model/garbage-station/member.model';

export class InfoDetailsDivisionTableItem extends DivisionNumberStatistic {
  member: {
    count: number;
    default?: Member;
  } = { count: 0 };
}
export class InfoDetailsDivisionTableArgs {
  divisionId?: string;
}
