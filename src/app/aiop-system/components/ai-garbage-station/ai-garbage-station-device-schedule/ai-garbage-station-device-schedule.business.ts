import { Injectable } from '@angular/core';
import { TimeModel } from 'src/app/common/components/time-control/time-control.model';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { Schedule } from 'src/app/network/model/schedule.model';
import { DayTimeSegment } from 'src/app/network/model/time-segment-day.model';
import { TimeSegment } from 'src/app/network/model/time-segment.model';
import { Time } from 'src/app/network/model/time.model';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import {
  AIGarbageDayTimeSegmentModel,
  AIGarbageScheduleModel,
  AIGarbageTimeSegmentModel,
} from './ai-garbage-station-device-schedule.model';

@Injectable()
export class AIGarbageStationDeviceScheduleBusiness {
  constructor(private service: AIGarbageRequestService) {}
  tomodel(schelule: Schedule) {
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
    if (schelule.DoorOpenTimes) {
      model.DoorOpenTimes = schelule.DoorOpenTimes.map((x) => {
        let model = new AIGarbageDayTimeSegmentModel();
        model.Day = x.DayOfWeek;
        if (x.Segments) {
          model.Segments = x.Segments.map((y) => {
            let current = new AIGarbageTimeSegmentModel();

            current.StartTime = new TimeModel(
              y.StartTime.hour,
              y.StartTime.minute,
              y.StartTime.second
            );
            current.StopTime = new TimeModel(
              y.StopTime.hour,
              y.StopTime.minute,
              y.StopTime.second
            );
            return current;
          });
        }

        return model;
      });
    }
    return model;
  }
  frommodel(model: AIGarbageScheduleModel) {
    let entity = new Schedule();
    if (model.SprayTimes) {
      entity.SprayTimes = model.SprayTimes.map((x) => {
        return new Time(x.hour.value, x.minute.value, x.second.value);
      });
    }
    if (model.ExhaustFanTimeSegments) {
      entity.ExhaustFanTimeSegments = model.ExhaustFanTimeSegments.map((x) => {
        let segment = new TimeSegment();
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
    if (model.DoorOpenTimes) {
      entity.DoorOpenTimes = model.DoorOpenTimes.map((x) => {
        let day = new DayTimeSegment();
        day.DayOfWeek = x.Day;
        if (x.Segments) {
          day.Segments = x.Segments.map((y) => {
            let segment = new TimeSegment();
            segment.StartTime = new Time(
              y.StartTime.hour.value,
              y.StartTime.minute.value,
              y.StartTime.second.value
            );
            segment.StopTime = new Time(
              y.StopTime.hour.value,
              y.StopTime.minute.value,
              y.StopTime.second.value
            );
            return segment;
          });
        }
        return day;
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
