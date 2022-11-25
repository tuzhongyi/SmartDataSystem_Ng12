/*
 * @Author: pmx
 * @Date: 2022-11-25 19:35:21
 * @Last Modified by:   pmx
 * @Last Modified time: 2022-11-25 19:35:21
 */
import { Injectable } from '@angular/core';
import { CommonPieChartConverter } from 'src/app/common/components/common-pie-chart/common-pie-chart.converter';
import { Language } from 'src/app/common/tools/language';
import {
  AbstractCommonModelConverter,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { DivisionGarbageScore } from 'src/app/network/model/division-garbage-score.model';
import { CollectionScorePieModel } from './collection-score-pie.model';

@Injectable()
export class CollectionScorePieConverter extends AbstractCommonModelConverter<CollectionScorePieModel> {
  constructor(private _commonPieChartConverter: CommonPieChartConverter) {
    super();
  }
  Convert(source: modelSource, ...res: any[]) {
    if (Array.isArray(source)) {
    } else {
      if (source instanceof DivisionGarbageScore) {
        return this._fromDivisionGarbageScore(source);
      }
    }

    throw new TypeError();
  }

  private _fromDivisionGarbageScore(item: DivisionGarbageScore) {
    let model = new CollectionScorePieModel();

    if (item.Scores) {
      // 好评，中评，差评顺序
      item.Scores.sort((a, b) => {
        return (a.Score - b.Score) * -1;
      });
      // 组件自身数据
      model.Data = item.Scores.map((score) => {
        return {
          Count: score.Number,
          Label: Language.CollectionScore(score.Score),
          Type: score.Score,
          Tagcls: CollectionPointScore[score.Score],
          RawData: score,
        };
      });
      // echart数据
      model.pieCharModel = this._commonPieChartConverter.Convert(item);
    }

    model.RawData = item;

    return model;
  }
}
