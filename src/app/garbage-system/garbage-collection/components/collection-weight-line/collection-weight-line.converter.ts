import { Injectable } from '@angular/core';
import { CommonLineChartConverter } from 'src/app/common/components/common-line-chart/common-line-chart.converter';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { DivisionGarbageWeight } from 'src/app/network/model/garbage-station/division-garbage-weight.model';
import { CollectionWeightLineModel } from './collection-weight-line.model';

@Injectable()
export class CollectionWeightLineConverter extends AbstractCommonModelConverter<CollectionWeightLineModel> {
  constructor(private _commonLineChartConverter: CommonLineChartConverter) {
    super();
  }
  Convert(source: modelSource, ...res: any): CollectionWeightLineModel<any> {
    if (Array.isArray(source)) {
      if (this._isDivisionGarbageWeight(source)) {
        return this._fromDivisionGarbageWeight(source, res);
      }
    } else {
    }

    throw new TypeError();
  }

  private _fromDivisionGarbageWeight(
    source: DivisionGarbageWeight[],
    args: [TrashCanType]
  ) {
    let model = new CollectionWeightLineModel();
    model.LineChartModel = this._commonLineChartConverter.Convert(source, args);
    return model;
  }
  private _isDivisionGarbageWeight(
    data: CommonModelSource[]
  ): data is DivisionGarbageWeight[] {
    return data.length == 0 || data[0] instanceof DivisionGarbageWeight;
  }
}
