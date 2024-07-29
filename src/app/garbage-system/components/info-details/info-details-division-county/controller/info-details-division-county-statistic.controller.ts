import { Injectable } from '@angular/core';
import { EnumTool } from 'src/app/common/tools/enum-tool/enum.tool';
import { wait } from 'src/app/common/tools/tool';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { Member } from 'src/app/network/model/garbage-station/member.model';
import { InfoDetailsDivisionCountyBusiness } from '../business/info-details-division-county.business';

@Injectable()
export class InfoDetailsDivisionCountyStatisticController {
  data?: DivisionNumberStatistic;
  members: Member[] = [];

  member?: Member;
  division?: Division;
  get childtype() {
    if (this.division) {
      return EnumTool.division.child(this.division.DivisionType);
    }
    return undefined;
  }
  constructor(private business: InfoDetailsDivisionCountyBusiness) {}
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
