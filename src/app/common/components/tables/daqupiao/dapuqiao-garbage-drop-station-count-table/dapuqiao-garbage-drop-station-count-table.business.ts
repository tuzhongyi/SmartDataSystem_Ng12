import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { isToday } from 'src/app/common/tools/tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/division-number-statistic-v2.model';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { DaPuQiaoGarbageDropStationCountTableDownload } from './dapuqiao-garbage-drop-station-count-table.download';
import {
  DaPuQiaoGarbageDropStationCountTableArgs,
  DivisionNumberStatisticModel,
  DivisionNumberStatisticV2Model,
  GarbageStationNumberStatisticModel,
  GarbageStationNumberStatisticV2Model,
  NumberStatistic,
  NumberStatisticModel,
} from './dapuqiao-garbage-drop-station-count-table.model';
import { DaPuQiaoGarbageDropStationCountTableService } from './dapuqiao-garbage-drop-station-count-table.service';

@Injectable()
export class DaPuQiaoGarbageDropStationCountTableBusiness
  implements IBusiness<NumberStatistic[], NumberStatisticModel[]>
{
  constructor(
    private service: DaPuQiaoGarbageDropStationCountTableService,
    public download: DaPuQiaoGarbageDropStationCountTableDownload
  ) {}
  async load(args: any): Promise<NumberStatisticModel[]> {
    let data = await this.getData(args);

    let model = data.map((x) => this.convert(x));
    console.log(model);
    return model;
  }
  getData(
    args: DaPuQiaoGarbageDropStationCountTableArgs
  ): Promise<NumberStatistic[]> {
    if (isToday(args.date) && args.unit === TimeUnit.Day) {
      return this.service.today(args);
    } else {
      return this.service.history(args);
    }
  }

  convert<T>(input: NumberStatistic) {
    let plain = instanceToPlain(input);
    let model: NumberStatisticModel;
    if (input instanceof GarbageStationNumberStatistic) {
      model = plainToInstance(GarbageStationNumberStatisticModel, plain);
      model.Parent = this.service.parent(model.Id, true);
    } else if (input instanceof GarbageStationNumberStatisticV2) {
      model = plainToInstance(GarbageStationNumberStatisticV2Model, plain);
      model.Parent = this.service.parent(model.Id, true);
    } else if (input instanceof DivisionNumberStatistic) {
      model = plainToInstance(DivisionNumberStatisticModel, plain);
      model.Parent = this.service.parent(model.Id, false);
    } else if (input instanceof DivisionNumberStatisticV2) {
      model = plainToInstance(DivisionNumberStatisticV2Model, plain);
      model.Parent = this.service.parent(model.Id, false);
    } else {
      throw new Error('Unknown type');
    }
    if (input.Level3Statistic) {
      if (input.Level3Statistic.AllLevelNumber) {
        model.FeedbackRatio =
          (input.Level3Statistic.FeedbackNumber ?? 0) /
          input.Level3Statistic.AllLevelNumber;
      }
      if (input.Level3Statistic.Level3Number) {
        model.SupervisedRatio =
          (input.Level3Statistic.SupervisedNumber ?? 0) /
          input.Level3Statistic.Level3Number;
      }
    }
    model.FeedbackRatio = Math.round(model.FeedbackRatio * 10000) / 100;
    model.SupervisedRatio = Math.round(model.SupervisedRatio * 10000) / 100;
    return model;
  }
}
