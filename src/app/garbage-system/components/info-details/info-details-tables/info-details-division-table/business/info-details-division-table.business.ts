import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { Member } from 'src/app/network/model/garbage-station/member.model';
import {
  InfoDetailsDivisionTableArgs,
  InfoDetailsDivisionTableItem,
} from '../info-details-division-table.model';
import { InfoDetailsDivisionTableDivisionBusiness } from './info-details-division-table-division.business';
import { InfoDetailsDivisionTableDownloadBusiness } from './info-details-division-table-download.business';
import { InfoDetailsDivisionTableMemberBusiness } from './info-details-division-table-member.business';

@Injectable()
export class InfoDetailsDivisionTableBusiness {
  constructor(
    public division: InfoDetailsDivisionTableDivisionBusiness,
    private member: InfoDetailsDivisionTableMemberBusiness,
    public downloader: InfoDetailsDivisionTableDownloadBusiness
  ) {}
  async load(args: InfoDetailsDivisionTableArgs) {
    let statistic = await this.division.load(args);
    let members = await this.member.load(args);

    let datas = statistic.map((x) => {
      return this.converet(
        x,
        members.filter((y) => y.DivisionId == x.Id)
      );
    });

    datas = datas.sort((a, b) => {
      let _a = a.StationNumber ? 1 : 0;
      let _b = b.StationNumber ? 1 : 0;

      return (
        LocaleCompare.compare(_b, _a) || LocaleCompare.compare(a.Name, b.Name)
      );
    });

    return datas;
  }

  private converet(data: DivisionNumberStatistic, members: Member[]) {
    let plain = instanceToPlain(data);
    let model = plainToInstance(InfoDetailsDivisionTableItem, plain);
    if (members) {
      model.member.count = members.length;
      if (model.member.count > 0) {
        model.member.default = members[0];
      }
    }
    return model;
  }
}

export const InfoDetailsDivisionTableProviders = [
  InfoDetailsDivisionTableBusiness,
  InfoDetailsDivisionTableDivisionBusiness,
  InfoDetailsDivisionTableMemberBusiness,
  InfoDetailsDivisionTableDownloadBusiness,
];
