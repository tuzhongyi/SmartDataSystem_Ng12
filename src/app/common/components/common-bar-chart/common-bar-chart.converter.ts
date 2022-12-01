import { Injectable } from '@angular/core';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { DivisionGarbageScore } from 'src/app/network/model/division-garbage-score.model';
import { CommonBarChartModel } from './common-bar-chart.model';
import less from 'less';

console.log(less);
// #F06565
import ColorPalette from 'src/assets/json/color-palette.json';

@Injectable({
  providedIn: 'root',
})
export class CommonBarChartConverter extends AbstractCommonModelConverter<
  CommonBarChartModel<any>
> {
  Convert(source: modelSource, ...res: any[]): CommonBarChartModel<any> {
    if (Array.isArray(source)) {
      if (this._isDivisionGarbageScore(source)) {
        return this._fromDivisionGarbageScore(source);
      }
    } else {
    }

    throw new TypeError();
  }

  private _fromDivisionGarbageScore(source: DivisionGarbageScore[]) {
    type ScoreType = keyof typeof ColorPalette.CollectionPointScore;

    let sortMap = new Map<CollectionPointScore, number[]>([
      [CollectionPointScore.Good, []],
      [CollectionPointScore.Average, []],
      [CollectionPointScore.Poor, []],
    ]);

    // 根据日期排序
    source.sort((a, b) => {
      return a.Date - b.Date;
    });

    let xAxisData = [];

    for (let i = 0; i < source.length; i++) {
      let item = source[i];
      xAxisData.push(item.BeginTime.getDate() + '日');

      for (let [key, value] of sortMap.entries()) {
        if (item.Scores) {
          let tmp = item.Scores.find((score) => score.Score == key);
          if (tmp) {
            value.push(tmp.Number);
          } else {
            value.push(0);
          }
        } else {
          value.push(0);
        }
      }
    }

    let model = new CommonBarChartModel();

    model.Merge = {
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      series: [
        {
          name: '好评',
          data: [0, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth: 15,
          barMinHeight: 5,
          itemStyle: {
            color:
              ColorPalette.CollectionPointScore[
                CollectionPointScore[CollectionPointScore.Good] as ScoreType
              ],
            // color: {
            //   type: 'linear',
            //   x: 0,
            //   y: 1,
            //   x2: 0,
            //   y2: 0,
            //   colorStops: [
            //     {
            //       offset: 0,
            //       color: 'rgba(104,232,136,0.5)', // color at 0%
            //     },
            //     {
            //       offset: 1,
            //       color: 'rgba(104,232,136,1)', // color at 100%
            //     },
            //   ],
            // },
          },
        },
      ],
    };
    return model;
  }

  /**********************************************************/
  private _isDivisionGarbageScore(
    data: CommonModelSource[]
  ): data is DivisionGarbageScore[] {
    return data.length == 0 || data[0] instanceof DivisionGarbageScore;
  }
}

// DivisionGarbageScore
