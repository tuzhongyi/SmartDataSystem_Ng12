import { Injectable } from '@angular/core';
import { CommonPieChartConverter } from 'src/app/common/components/common-pie-chart/common-pie-chart.converter';
import { Language } from 'src/app/common/tools/language';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { ClassificationNumber } from 'src/app/network/model/classification-number.mode';
import { DivisionGarbageScore } from 'src/app/network/model/division-garbage-score.model';
import { CollectionPointPieModel } from './collection-point-pie.model';

@Injectable()
export class CollectionPointPieConverter extends AbstractCommonModelConverter<CollectionPointPieModel> {
  constructor(private _commonPieChartConverter: CommonPieChartConverter) {
    super();
  }
  Convert(source: modelSource, ...res: any[]) {
    if (Array.isArray(source)) {
      if (this._isClassificationNumber(source)) {
        return this._fromClassificationNumber(source);
      }
    } else {
    }

    throw new TypeError();
  }

  private _fromClassificationNumber(item: ClassificationNumber[]) {
    // 排列顺序
    let keys = [
      CollectionPointClassification.PublicPlace,
      CollectionPointClassification.Building,
      CollectionPointClassification.Shop,
      CollectionPointClassification.Residence,
      CollectionPointClassification.Unit,
      CollectionPointClassification.Other,
    ];

    // 数据可能不全
    let data: ClassificationNumber[] = [];
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let tmp = item.find((num) => num.Classification == key);
      if (tmp) {
        data.push(tmp);
      } else {
        let number = new ClassificationNumber();
        number.Classification = key;
        number.Number = 0;
        data.push(number);
      }
    }

    let model = new CollectionPointPieModel();

    model.Data = data.map((num) => {
      return {
        Count: num.Number,
        Label: Language.CollectionPointClassification(num.Classification),
        Type: num.Classification,
        Tagcls: CollectionPointClassification[num.Classification],
        RawData: num,
      };
    });
    model.PieCharModel = this._commonPieChartConverter.Convert(data);
    model.RawData = item;

    return model;
  }
  private _isClassificationNumber(
    data: CommonModelSource[]
  ): data is ClassificationNumber[] {
    return data.length == 0 || data[0] instanceof ClassificationNumber;
  }
}
