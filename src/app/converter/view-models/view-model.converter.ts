import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import {
  DivisionModel,
  GarbageStationModel,
} from 'src/app/view-model/garbage-station.model';

@Injectable({
  providedIn: 'root',
})
export class ViewModelConverter {
  constructor(
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService
  ) {}

  GarbageStation(source: GarbageStation): GarbageStationModel {
    let plain = instanceToPlain(source);
    let model = plainToInstance(GarbageStationModel, plain);
    if (model.DivisionId) {
      model.Division = this.divisionService.cache
        .get(model.DivisionId)
        .then((x) => {
          return this.Division(x);
        });
    }
    return model;
  }

  Division(source: Division): DivisionModel;
  Division(source: Promise<Division>): Promise<DivisionModel>;

  Division(
    source: Division | Promise<Division>,
    ...res: any[]
  ): DivisionModel | Promise<Division> {
    if (source instanceof Division) {
      let plain = instanceToPlain(source);
      let model = plainToInstance(DivisionModel, plain);
      if (source.ParentId) {
        model.Parent = this.divisionService.cache
          .get(source.ParentId)
          .then((x) => {
            return this.Division(x);
          });
      }

      return model;
    } else {
      return source.then((x) => {
        return this.Division(x);
      });
    }
  }
}
