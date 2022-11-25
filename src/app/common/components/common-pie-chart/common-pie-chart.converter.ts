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
import { GarbageScoreNumber } from '../../../network/model/garbage-score-num.model';

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
                value: (Math.random() * 10) >> 0,
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
    let model = new CommonPieChartModel();

    if (item.Scores) {
      // 好评，中评，差评顺序
      item.Scores.sort((a, b) => {
        return (a.Score - b.Score) * -1;
      });
      // modK
      model.Merge = {
        series: [
          {
            type: 'pie',
            data: [
              ...item.Scores.map((score) => {
                return {
                  name: Language.CollectionScore(score.Score),
                  value: score.Number,
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
