import { Injectable } from '@angular/core';
import { TimeModel } from 'src/app/common/components/time-control/time-control.model';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { AIGarbageSchedule } from 'src/app/network/model/ai-garbage/schedule.model';
import { AIGarbageTimeSegment } from 'src/app/network/model/ai-garbage/time-segment.model';
import { Time } from 'src/app/network/model/time.model';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import {
  AIGarbageScheduleModel,
  AIGarbageTimeSegmentModel,
} from './ai-garbage-station-device-schedule.model';

@Injectable()
export class AIGarbageStationDeviceScheduleBusiness {
  constructor(private service: AIGarbageRequestService) {}
  tomodel(schelule: AIGarbageSchedule) {
    let model = new AIGarbageScheduleModel();
    if (schelule.SprayTimes) {
      model.SprayTimes = schelule.SprayTimes.map((time) => {
        return new TimeModel(time.hour, time.minute, time.second);
      });
    }
    if (schelule.ExhaustFanTimeSegments) {
      model.ExhaustFanTimeSegments = schelule.ExhaustFanTimeSegments.map(
        (x) => {
          let model = new AIGarbageTimeSegmentModel();
          model.StartTime = new TimeModel(
            x.StartTime.hour,
            x.StartTime.minute,
            x.StartTime.second
          );
          model.StopTime = new TimeModel(
            x.StopTime.hour,
            x.StopTime.minute,
            x.StopTime.second
          );
          return model;
        }
      );
    }
    return model;
  }
  frommodel(model: AIGarbageScheduleModel) {
    let entity = new AIGarbageSchedule();
    if (model.SprayTimes) {
      entity.SprayTimes = model.SprayTimes.map((x) => {
        return new Time(x.hour.value, x.minute.value, x.second.value);
      });
    }
    if (model.ExhaustFanTimeSegments) {
      entity.ExhaustFanTimeSegments = model.ExhaustFanTimeSegments.map((x) => {
        let segment = new AIGarbageTimeSegment();
        segment.StartTime = new Time(
          x.StartTime.hour.value,
          x.StartTime.minute.value,
          x.StartTime.second.value
        );
        segment.StopTime = new Time(
          x.StopTime.hour.value,
          x.StopTime.minute.value,
          x.StopTime.second.value
        );
        return segment;
      });
    }
    return entity;
  }
  update(id: string, secret: string, model: AIGarbageScheduleModel) {
    let device = new AIGarbageDevice();
    device.Id = id;
    device.Secret = secret;
    device.Schedule = this.frommodel(model);
    return this.service.device.update(device);
  }
}
