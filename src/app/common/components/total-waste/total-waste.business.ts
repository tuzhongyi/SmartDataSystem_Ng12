import { Injectable } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageType } from 'src/app/enum/garbage-type.enum';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { TotalWasteModel } from './total-waste.model';

@Injectable()
export class TotalWasteBusiness {
  constructor(private service: DivisionRequestService) {}

  async load(id: string) {
    let data = await this.get(id);
    let model = new TotalWasteModel();
    if (data.GarbageWeights) {
      for (let i = 0; i < data.GarbageWeights.length; i++) {
        const weight = data.GarbageWeights[i];
        switch (weight.GarbageType) {
          case GarbageType.Dry:
            model.dry = weight.DayWeight;
            break;
          case GarbageType.Wet:
            model.wet = weight.DayWeight;
            break;
          default:
            break;
        }
      }
    }
    model.station = data.StationNumber;
    model.event = 0;
    if (data.TodayEventNumbers) {
      data.TodayEventNumbers.forEach((e) => {
        switch (e.EventType) {
          case EventType.IllegalDrop:
          case EventType.MixedInto:
            model.event += e.DeltaNumber ?? 0;
            break;

          default:
            break;
        }
      });
    }
    return model;
  }

  get(id: string) {
    return this.service.statistic.number.get(id);
  }
}
