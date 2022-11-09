import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { ScoreTop } from 'src/app/network/model/score-top.model';
import { CollectionScoreRankModel } from './collection-score-rank.model';

export class CollectionScoreRankConverter extends AbstractCommonModelConverter<
  CollectionScoreRankModel,
  ScoreTop
> {
  Convert(source: CommonModelSource, ...res: any[]): CollectionScoreRankModel {
    if (source instanceof ScoreTop) {
      return this._fromScoreTop(source);
    }
    throw new TypeError('类型出错');
  }
  private _fromScoreTop(item: ScoreTop) {
    let model = new CollectionScoreRankModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.Number = item.Number;
    return model;
  }
}
