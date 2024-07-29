import { Injectable } from '@angular/core';
import { wait } from 'src/app/common/tools/tool';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { Member } from 'src/app/network/model/garbage-station/member.model';
import { InfoDetailsDivisionCommitteesBusiness } from '../business/info-details-division-committees.business';

@Injectable()
export class InfoDetailsDivisionCommitteesStatisticController {
  data?: DivisionNumberStatistic;
  members: Member[] = [];

  member?: Member;
  division?: Division;
  constructor(private business: InfoDetailsDivisionCommitteesBusiness) {}

  load(divisionId: string) {
    return new Promise<void>((resolve) => {
      let result = [false, false, false];
      this.business.get(divisionId).then((x) => {
        this.division = x;
        result[0] = true;
      });
      this.business.statistic.load(divisionId).then((x) => {
        this.data = x;
        result[1] = true;
      });
      this.business.member.load(divisionId).then((x) => {
        this.members = x;
        if (this.members.length > 0) {
          this.member = this.members[0];
        }
        result[2] = true;
      });

      wait(
        () => {
          return result.every((x) => x);
        },
        () => {
          resolve();
        }
      );
    });
  }
}
