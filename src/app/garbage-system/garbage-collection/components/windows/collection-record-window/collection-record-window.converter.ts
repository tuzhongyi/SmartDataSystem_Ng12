import { Injectable } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Medium } from 'src/app/common/tools/medium';
import {
  AbstractCommonModelPromiseConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { CollectionRecordWindowModel } from './collection-record-window.model';

@Injectable()
export class CollectionRecordWindowConverter extends AbstractCommonModelPromiseConverter<CollectionRecordWindowModel> {
  constructor(private _garbageVehicleRequest: GarbageVehicleRequestService) {
    super();
  }
  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof GarbageCollectionEventRecord) {
      return this._fromGarbageCollectionEventRecord(source);
    }
    throw new TypeError('类型出错');
  }

  private async _fromGarbageCollectionEventRecord(
    source: GarbageCollectionEventRecord
  ) {
    let model = new CollectionRecordWindowModel();
    model.Id = source.EventId;
    model.ResourceName = source.ResourceName ?? Language.json.Unknow;
    model.VehicleName = source.Data.VehicleName;
    model.MemberName = source.Data.MemberName ?? Language.json.Unknow;
    model.DivisionName = source.Data.DivisionName ?? Language.json.Unknow;
    model.TrashCanName = source.Data.TrashCanName ?? Language.json.Unknow;
    model.CollectionPointName =
      source.Data.CollectionPointName ?? Language.json.Unknow;
    model.Weight = source.Data.Weight ?? 0;
    model.Score = source.Data.Score
      ? Language.CollectionPointScore(source.Data.Score)
      : Language.json.Unknow;

    model.TagCls = source.Data.Score
      ? CollectionPointScore[source.Data.Score]
      : '';

    model.ImageUrl = await Medium.img(source.ImageUrl);
    model.EventTime = source.EventTime;
    let { Cameras } = await this._garbageVehicleRequest.get(
      source.Data.VehicleId
    );
    model.Cameras = Cameras ?? [];

    model.TrashCanType = source.Data.TrashCanType;

    model.RawData = source;
    return model;
  }
}
