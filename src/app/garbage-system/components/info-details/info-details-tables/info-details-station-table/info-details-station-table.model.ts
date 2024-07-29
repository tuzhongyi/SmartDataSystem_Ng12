import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { Member } from 'src/app/network/model/garbage-station/member.model';

export class InfoDetailsStationTableItem extends GarbageStationNumberStatistic {
  member: {
    count: number;
    default?: Member;
  } = { count: 0 };

  canIllegalDrop = false;
  canGarbageFull = false;
  canMixedInto = false;
  canGCHA = false;
  canDoor = false;
}
export class InfoDetailsStationTableArgs {
  divisionId?: string;
}
