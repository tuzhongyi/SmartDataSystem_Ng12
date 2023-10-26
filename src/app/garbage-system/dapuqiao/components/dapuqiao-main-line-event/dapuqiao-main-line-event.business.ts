import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { Language } from 'src/app/common/tools/language';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IChartLineData } from 'src/app/garbage-system/components/charts/lines/chart-line-simple/chart-line-simple.option';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { GetDivisionStatisticNumbersParamsV2 } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DaPuQiaoMainLineEventModel } from './dapuqiao-main-line-event.model';

@Injectable()
export class DapuqiaoMainEventLineBusiness
  implements IBusiness<DivisionNumberStatisticV2[], DaPuQiaoMainLineEventModel>
{
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {}
  async load(...args: any): Promise<DaPuQiaoMainLineEventModel> {
    let days = 7;
    let duration = DateTimeTool.beforeDay(new Date(), days);
    let data = await this.getData(this.global.divisionId, duration);
    console.log(data);
    let model = this.convert(duration.begin, days, data);
    return model;
  }
  getData(
    divisionId: string,
    duration: Duration
  ): Promise<DivisionNumberStatisticV2[]> {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionIds = [divisionId];
    params.TimeUnit = TimeUnit.Day;
    return this.service.statistic.number.history.list(params);
  }

  convert(
    begin: Date,
    days: number,
    datas: DivisionNumberStatisticV2[]
  ): DaPuQiaoMainLineEventModel {
    let x: string[] = [];
    let times: Date[] = [];
    for (let i = 0; i < days; i++) {
      let current = new Date(begin.getTime());
      current.setDate(current.getDate() + i);
      let week = current.getDay();
      x.push(Language.Week(week));
      times.push(current);
    }
    let one: IChartLineData = {
      name: '一级事件',
      value: [],
    };
    let two: IChartLineData = {
      name: '二级事件',
      value: [],
    };
    let three: IChartLineData = {
      name: '三级事件',
      value: [],
    };

    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (
        times.find((x) => {
          return (
            x.getFullYear() === data.Time.Year &&
            x.getMonth() + 1 === data.Time.Month &&
            x.getDate() === data.Time.Day
          );
        })
      ) {
        if (data.Level3Statistic) {
          one.value.push(data.Level3Statistic.Level1Number ?? 0);
          two.value.push(data.Level3Statistic.Level2Number ?? 0);
          three.value.push(data.Level3Statistic.Level3Number ?? 0);
        }
      }
    }

    let array: DaPuQiaoMainLineEventModel = {
      x: x,
      datas: [one, two, three],
    };
    return array;
  }
}
