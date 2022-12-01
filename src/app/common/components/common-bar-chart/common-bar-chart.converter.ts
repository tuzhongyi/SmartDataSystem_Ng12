import { Injectable } from '@angular/core';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { DivisionGarbageScore } from 'src/app/network/model/division-garbage-score.model';
import { CommonBarChartModel } from './common-bar-chart.model';
// #F06565
import ColorPalette from 'src/assets/json/color-palette.json';
import { Language } from '../../tools/language';

// Color('#7743CE').alpha(0.5)
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

    let max = 10;

    for (let i = 0; i < source.length; i++) {
      let item = source[i];
      xAxisData.push(item.BeginTime.getDate() + '日');

      for (let [key, value] of sortMap.entries()) {
        if (item.Scores) {
          let tmp = item.Scores.find((score) => score.Score == key);
          if (tmp) {
            // tmp.Number = (Math.random() * 300) >> 0;
            value.push(tmp.Number);
            max = Math.max(max, Math.ceil(tmp.Number / 50) * 50);
          } else {
            value.push(0);
          }
        } else {
          value.push(0);
        }
      }
    }

    let model = new CommonBarChartModel();

    console.log(sortMap);
    model.Merge = {
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: {
        min: 0,
        max: max,
      },
      series: [
        {
          name: Language.CollectionPointScore(CollectionPointScore.Good),
          data: sortMap.get(CollectionPointScore.Good),
          type: 'bar',
          barWidth: 6,
          barMinHeight: 5,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(240,101,101,0.5)', // color at 0%
                },
                {
                  offset: 1,
                  color: 'rgba(240,101,101,1)', // color at 100%
                },
              ],
            },
          },
        },
        {
          name: Language.CollectionPointScore(CollectionPointScore.Average),
          data: sortMap.get(CollectionPointScore.Average),
          type: 'bar',
          barWidth: 6,
          barMinHeight: 5,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(255,186,60,0.5)', // color at 0%
                },
                {
                  offset: 1,
                  color: 'rgba(255,186,60,1)', // color at 100%
                },
              ],
            },
          },
        },
        {
          name: Language.CollectionPointScore(CollectionPointScore.Poor),
          data: sortMap.get(CollectionPointScore.Poor),
          type: 'bar',
          barWidth: 6,
          barMinHeight: 5,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(104,232,136,0.5)', // color at 0%
                },
                {
                  offset: 1,
                  color: 'rgba(104,232,136,1)', // color at 100%
                },
              ],
            },
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

// color:
//   ColorPalette.CollectionPointScore[
//     CollectionPointScore[CollectionPointScore.Good] as ScoreType
//   ],
