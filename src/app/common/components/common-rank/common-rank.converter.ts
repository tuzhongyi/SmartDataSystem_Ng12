import { Injectable } from '@angular/core';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { ScoreTop } from 'src/app/network/model/score-top.model';
import { Guid } from '../../tools/guid';
import { CommonRankData, CommonRankModel } from './common-rank.model';

@Injectable({
  providedIn: 'root',
})
export class CommonRankConverter extends AbstractCommonModelConverter<
  CommonRankModel<any>
> {
  Convert(source: modelSource, ...res: any[]): CommonRankModel<any> {
    if (Array.isArray(source)) {
      if (this._isScoreTop(source)) {
        return this._fromScoreTop(source);
      }
    } else {
    }

    throw new TypeError();
  }

  private _fromScoreTop(source: ScoreTop[]) {
    let model = new CommonRankModel();

    model.Data = source.map((scoreTop) => {
      let data = new CommonRankData();
      data.Id = scoreTop.Id;
      data.Name = scoreTop.Name;
      data.Number = scoreTop.Number;
      data.Unit = '起';
      return data;
    });
    model.RawData = source;
    return model;
  }

  private _isScoreTop(data: CommonModelSource[]): data is ScoreTop[] {
    return data.length == 0 || data[0] instanceof ScoreTop;
  }
}
