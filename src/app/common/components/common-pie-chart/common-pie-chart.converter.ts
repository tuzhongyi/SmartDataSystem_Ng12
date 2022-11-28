import { Inject, Injectable } from '@angular/core';
import { number } from 'echarts';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import {
  CommonPieChartData,
  CommonPieChartModel,
} from './common-pie-chart.model';
import { Language } from '../../tools/language';
import { ClassificationNumber } from '../../../network/model/classification-number.mode';
import { DivisionGarbageScore } from '../../../network/model/division-garbage-score.model';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';

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

  private _fromClassificationNumber(numbers: ClassificationNumber[]) {
    type ClassificationType =
      keyof typeof ColorPalette.CollectionPointClassification;

    let model = new CommonPieChartModel<ClassificationNumber[]>();

    model.Merge = {
      series: [
        {
          type: 'pie',
          data: [
            ...numbers.map((num) => {
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
      ],
    };
    model.RawData = numbers;

    return model;
  }

  private _fromDivisionGarbageScore(item: DivisionGarbageScore) {
    type ScoreType = keyof typeof ColorPalette.CollectionPointScore;

    let model = new CommonPieChartModel();

    if (item.Scores) {
      model.Merge = {
        series: [
          {
            type: 'pie',
            data: [
              ...item.Scores.map((score) => {
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
        ],
      };
    }

    model.RawData = item;

    return model;
  }

  private _isClassificationNumber(
    data: CommonModelSource[]
  ): data is ClassificationNumber[] {
    return data.length == 0 || data[0] instanceof ClassificationNumber;
  }
}
