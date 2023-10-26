import { Injectable } from '@angular/core';
import { CommonRankConverter } from 'src/app/common/components/common-rank/common-rank.converter';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { ScoreTop } from 'src/app/network/model/garbage-station/score-top.model';
import { CollectionScoreRankModel } from './collection-score-rank.model';

@Injectable()
export class CollectionScoreRankConverter extends AbstractCommonModelConverter<CollectionScoreRankModel> {
  constructor(private _commonRankConverter: CommonRankConverter) {
    super();
  }
  Convert(source: modelSource, ...res: any[]) {
    if (Array.isArray(source)) {
      if (this._isScoreTop(source)) {
        return this._fromScoreTop(source);
      }
    } else {
    }

    throw new TypeError();
  }

  private _fromScoreTop(source: ScoreTop[]) {
    let model = new CollectionScoreRankModel();
    model.RankModel = this._commonRankConverter.Convert(source);
    model.RawData = source;
    return model;
  }

  private _isScoreTop(data: CommonModelSource[]): data is ScoreTop[] {
    return data.length == 0 || data[0] instanceof ScoreTop;
  }
}
