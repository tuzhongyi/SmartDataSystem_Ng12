import { mode } from 'crypto-js';
import { Language } from 'src/app/common/tools/language';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { DivisionGarbageScore } from 'src/app/network/model/division-garbage-score.model';
import { GarbageScoreNumber } from 'src/app/network/model/garbage-score-num.model';
import {
  CollectionScoreDes,
  CollectionScorePieModel,
} from './collection-score-pie.model';

export class CollectionScorePieConverter extends AbstractCommonModelConverter<CollectionScorePieModel> {
  Convert(source: CommonModelSource, ...res: any[]): CollectionScorePieModel {
    if (source instanceof DivisionGarbageScore) {
      return this._fromDivisionGarbageScore(source);
    }
    throw new Error('Method not implemented.');
  }

  private _fromDivisionGarbageScore(item: DivisionGarbageScore) {
    let model = new CollectionScorePieModel<DivisionGarbageScore>();
    model.Id = item.DivisionId;
    model.Name = item.DivisionName;
    model.TotalCount = item.ScoreNumber;

    model.RawData = item;

    if (item.Scores) {
      // 好评，中评，差评顺序
      item.Scores.sort((a, b) => {
        return (a.Score - b.Score) * -1;
      });
      model.CountDes = item.Scores.map((score) => {
        let des = new CollectionScoreDes<GarbageScoreNumber>();
        des.Count = score.Number;
        des.Label = Language.CollectionScore(score.Score);
        des.RawData = score;
        return des;
      });
    }

    return model;
  }
}
