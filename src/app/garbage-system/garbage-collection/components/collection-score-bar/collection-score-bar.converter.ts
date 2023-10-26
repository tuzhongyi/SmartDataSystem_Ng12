import { Injectable } from '@angular/core';
import { CommonBarChartConverter } from 'src/app/common/components/common-bar-chart/common-bar-chart.converter';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { DivisionGarbageScore } from 'src/app/network/model/garbage-station/division-garbage-score.model';
import { CollectionScoreBarModel } from './collection-score-bar.model';
@Injectable()
export class CollectionScoreBarConverter extends AbstractCommonModelConverter<CollectionScoreBarModel> {
  constructor(private _commonBarChartConverter: CommonBarChartConverter) {
    super();
  }
  Convert(source: modelSource, ...res: any[]): CollectionScoreBarModel<any> {
    if (Array.isArray(source)) {
      if (this._isDivisionGarbageScore(source)) {
        return this._fromDivisionGarbageScore(source);
      }
    } else {
    }

    throw new TypeError();
  }

  private _fromDivisionGarbageScore(source: DivisionGarbageScore[]) {
    let model = new CollectionScoreBarModel();

    model.BarChartModel = this._commonBarChartConverter.Convert(source);

    return model;
  }
  private _isDivisionGarbageScore(
    data: CommonModelSource[]
  ): data is DivisionGarbageScore[] {
    return data.length == 0 || data[0] instanceof DivisionGarbageScore;
  }
}
