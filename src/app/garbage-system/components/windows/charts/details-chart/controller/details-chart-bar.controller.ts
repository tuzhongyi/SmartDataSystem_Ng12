import { Injectable } from '@angular/core';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { DetailsChartCreater } from '../details-chart.creater';
import { ChartConfig } from '../details-chart.option';

@Injectable()
export class DetailsChartBarController {
  config = new ChartConfig(TimeUnit.Hour, new Date());
  load(
    date: Date,
    unit: TimeUnit,
    datas: ITimeData<IModel | undefined>[][],
    types: EventType[]
  ) {
    let titles = DetailsChartCreater.Titles(types);
    this.config.options = this.config.getOption(unit, date, {
      formatter: function (e) {
        return e;
      },
      orient: 'vertical',
      right: 0,
      top: 50,
      icon: 'circle',
      textStyle: {
        color: '#fff',
      },
    });
    this.config.merge = {
      series: datas.map((_data, i) => {
        let item: any = {
          type: 'bar',
          name: titles[i],
          data: _data.map((x) => x.value),
          color: ChartConfig.color[i],
          barWidth: `${32 / datas.length}px`,
          barMinHeight: 5,
          itemStyle: {
            color: ChartConfig.itemColor[i],
          },
          label: {
            show: true,
            position: 'top',
            fontSize: '16px',
            color: ChartConfig.color[i],
            textBorderWidth: 0,
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
