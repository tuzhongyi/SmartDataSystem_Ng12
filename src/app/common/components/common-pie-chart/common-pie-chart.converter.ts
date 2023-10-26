/*
 * @Author: pmx
 * @Date: 2022-12-13 09:59:17
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-13 10:43:51
 */
import { Injectable } from '@angular/core';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { ClassificationNumber } from '../../../network/model/garbage-station/classification-number.mode';
import { DivisionGarbageScore } from '../../../network/model/garbage-station/division-garbage-score.model';
import { Language } from '../../tools/language';
import { CommonPieChartModel } from './common-pie-chart.model';

import ColorPalette from 'src/assets/json/color-palette.json';

import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';

@Injectable({
  providedIn: 'root',
})
export class CommonPieChartConverter extends AbstractCommonModelConverter<
  CommonPieChartModel<any>
> {
  Convert(source: modelSource, ...res: any[]) {
    if (Array.isArray(source)) {
      if (this._isClassificationNumber(source)) {
        return this._fromClassificationNumber(source);
      }
    } else {
      if (source instanceof DivisionGarbageScore) {
        return this._fromDivisionGarbageScore(source);
      }
    }

    throw new TypeError();
  }

  private _fromClassificationNumber(source: ClassificationNumber[]) {
    type ClassificationType =
      keyof typeof ColorPalette.CollectionPointClassification;

    let model = new CommonPieChartModel<ClassificationNumber[]>();

    model.Merge = {
      series: [
        {
          type: 'pie',
          data: [
            ...source.map((num) => {
              return {
                name: Language.CollectionPointClassification(
                  num.Classification
                ),
                value: num.Number,
                itemStyle: {
                  color:
                    ColorPalette.CollectionPointClassification[
                      CollectionPointClassification[
                        num.Classification
                      ] as ClassificationType
                    ],
                },
              };
            }),
          ],
        },
        {
          //利用数据圆实现黑色阴影
          type: 'pie',
          radius: ['40%', '55%'],
          z: 2,
          emphasis: {
            disabled: true,
          },
          data: [
            {
              value: 10,
              itemStyle: {
                color: 'rgba(0,0,0,0.5)',
              },
            },
          ],
        },
      ],
    };
    model.RawData = source;

    return model;
  }

  private _fromDivisionGarbageScore(source: DivisionGarbageScore) {
    type ScoreType = keyof typeof ColorPalette.CollectionPointScore;

    let model = new CommonPieChartModel();

    if (source.Scores) {
      model.Merge = {
        series: [
          {
            type: 'pie',
            data: [
              ...source.Scores.map((score) => {
                return {
                  name: Language.CollectionPointScore(score.Score),
                  value: score.Number,
                  itemStyle: {
                    color:
                      ColorPalette.CollectionPointScore[
                        CollectionPointScore[score.Score] as ScoreType
                      ],
                  },
                };
              }),
            ],
          },
          {
            // 利用占位圆实现黑色阴影
            type: 'pie',
            z: 3,
            radius: ['40%', '55%'],
            emptyCircleStyle: {
              color: 'black',
              opacity: 0.5,
            },
          },
        ],
      };
    }

    model.RawData = source;

    return model;
  }

  private _isClassificationNumber(
    data: CommonModelSource[]
  ): data is ClassificationNumber[] {
    return data.length == 0 || data[0] instanceof ClassificationNumber;
  }
}
