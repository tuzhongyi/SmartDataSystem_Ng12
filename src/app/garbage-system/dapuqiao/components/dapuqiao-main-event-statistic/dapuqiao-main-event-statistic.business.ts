import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/division-number-statistic-v2.model';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import {
  DapuqiaoMainEventStatisticArgs,
  DapuqiaoMainEventStatisticModel,
} from './dapuqiao-main-event-statistic.model';
import { DapuqiaoMainEventStatisticService } from './dapuqiao-main-event-statistic.service';

@Injectable()
export class DapuqiaoMainEventStatisticBusiness
  implements
    IBusiness<
      DivisionNumberStatistic | DivisionNumberStatisticV2,
      DapuqiaoMainEventStatisticModel
    >
{
  constructor(
    private service: DapuqiaoMainEventStatisticService,
    private global: GlobalStorageService
  ) {}

  async load(
    args: DapuqiaoMainEventStatisticArgs
  ): Promise<DapuqiaoMainEventStatisticModel> {
    let data = await this.getData(this.global.divisionId, args);
    let model = this.convert(data);
    return model;
  }
  getData(divisionId: string, args: DapuqiaoMainEventStatisticArgs) {
    if (args.unit === TimeUnit.Day) {
      return this.service.today(divisionId);
    } else {
      return this.service.history(divisionId, args.unit);
    }
  }

  convert(input: DivisionNumberStatistic | DivisionNumberStatisticV2) {
    let model = new DapuqiaoMainEventStatisticModel();
    if (input.Level3Statistic) {
      if (input.Level3Statistic.Level3Number) {
        model.supervision.value =
          input.Level3Statistic.SupervisedNumber ??
          0 / input.Level3Statistic.Level3Number;
      }

      model.feedback.value = input.Level3Statistic.FeedbackRatio ?? 100;

      model.statistic.all = input.Level3Statistic.Level3Number ?? 0;
      model.statistic.feedback = input.Level3Statistic.FeedbackNumber ?? 0;
      model.statistic.supervision = input.Level3Statistic.SupervisedNumber ?? 0;
    }
    return model;
  }
}
