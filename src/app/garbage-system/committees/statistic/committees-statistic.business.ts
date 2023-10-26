import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { CommitteesStatisticConverter } from './committees-statistic.converter';
import { CommitteesStatisticViewModel } from './committees-statistic.model';

@Injectable()
export class CommitteesStatisticBusiness
  implements IBusiness<DivisionNumberStatistic, CommitteesStatisticViewModel>
{
  constructor(private divisionService: DivisionRequestService) {}
  Converter: IConverter<DivisionNumberStatistic, CommitteesStatisticViewModel> =
    new CommitteesStatisticConverter();

  async load(divisionId: string) {
    let data = await this.getData(divisionId);
    let model = this.Converter.Convert(data);
    return model;
  }

  getData(divisionId: string): Promise<DivisionNumberStatistic> {
    return this.divisionService.statistic.number.get(divisionId);
  }
}
