import { Inject, Injectable } from '@angular/core';
import { number } from 'echarts';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { Division } from 'src/app/network/model/division.model';
import { ElementListModel } from '../common/components/element-list/element-list.model';
import {
  HWPieChartData,
  HWPieChartModel,
} from '../common/components/hw-pie-chart/hw-pie-chart.model';
import { Language } from '../common/tools/language';
import {
  CollectionScorePieModel,
  CollectionScoreDes,
} from '../garbage-system/garbage-collection/components/collection-score-pie/collection-score-pie.model';
import { ClassificationNumber } from '../network/model/classification-number.mode';
import { DivisionGarbageScore } from '../network/model/division-garbage-score.model';
import { GarbageScoreNumber } from '../network/model/garbage-score-num.model';

@Injectable({
  providedIn: 'root',
})
export class HWPieChartConverter extends AbstractCommonModelConverter<
  HWPieChartModel<any>
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
    let model = new HWPieChartModel<ClassificationNumber[]>();

    model.Data = numbers.map((num) => {
      let data = new HWPieChartData();
      data.Count = num.Number;
      data.Label = Language.CollectionPointClassification(num.Classification);
      data.RawData = num;
      return data;
    });

    model.RawData = numbers;

    return model;
  }

  private _fromDivisionGarbageScore(item: DivisionGarbageScore) {
    let model = new HWPieChartModel();

    if (item.Scores) {
      // 好评，中评，差评顺序
      item.Scores.sort((a, b) => {
        return (a.Score - b.Score) * -1;
      });
      model.Data = item.Scores.map((score) => {
        let data = new CollectionScoreDes<GarbageScoreNumber>();
        data.Count = score.Number;
        data.Label = Language.CollectionScore(score.Score);
        data.RawData = score;
        return data;
      });
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
