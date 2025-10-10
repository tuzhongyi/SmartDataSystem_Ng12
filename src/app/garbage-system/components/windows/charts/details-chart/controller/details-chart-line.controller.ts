import { Injectable } from '@angular/core';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { DetailsChartCreater } from '../details-chart.creater';
import { ChartConfig } from '../details-chart.option';

@Injectable()
export class DetailsChartLineController {
  constructor() {}
  public config = new ChartConfig(TimeUnit.Hour, new Date());
  private business?: IBusiness<IModel, ITimeData<IModel>[][]>;
  init(business: IBusiness<IModel, ITimeData<IModel>[][]>) {
    this.business = business;
  }
  load(
    date: Date,
    unit: TimeUnit,
    datas: ITimeData<IModel | undefined>[][],
    types: EventType[]
  ) {
    let titles = DetailsChartCreater.Titles(types);
    this.config.options = this.config.getOption(unit, date, {
      orient: 'vertical',
      right: 0,
      top: 50,
      icon: 'circle',
      textStyle: {
        color: '#fff',
      },
    });
    this.config.merge = {
      series: datas.map((x, i) => {
        let item: any = {
          type: 'line',
          name: titles[i],
          data: x.map((y) => y.value),
          color: ChartConfig.color[i],
          areaStyle: {
            color: ChartConfig.itemColor[i],
          },
          label: {
            formatter: (params: CallbackDataParams) => {
              return params.value.toString();
            },
          },
        };
        return item;
      }),
    };
  }
}
