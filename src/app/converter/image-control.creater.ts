import { DeviceViewModel } from '../common/components/tables/device-list-table/device.model';
import { GarbageDropRecordViewModel } from '../common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { Medium } from '../common/tools/medium';
import { EventType } from '../enum/event-type.enum';
import { OnlineStatus } from '../enum/online-status.enum';
import { ICamera } from '../network/model/camera.interface';
import { Camera } from '../network/model/camera.model';
import { EventDataObject } from '../network/model/event-data-object.model';
import { EventRule } from '../network/model/event-rule';
import {
  GarbageFullEventRecord,
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from '../network/model/garbage-event-record.model';
import { EventRecordViewModel } from '../view-model/event-record.model';
import { ImageControlModel } from '../view-model/image-control.model';

type InputType =
  | Camera
  | DeviceViewModel
  | IllegalDropEventRecord
  | GarbageFullEventRecord
  | MixedIntoEventRecord
  | EventRecordViewModel
  | GarbageDropRecordViewModel;

export class ImageControlCreater {
  static Create(model: Camera): ImageControlModel;
  static Create(model: DeviceViewModel): ImageControlModel;
  static Create(model: IllegalDropEventRecord): ImageControlModel;
  static Create(model: GarbageFullEventRecord): ImageControlModel[];
  static Create(model: MixedIntoEventRecord): ImageControlModel;
  static Create(model: EventRecordViewModel): ImageControlModel;
  static Create(model: GarbageDropRecordViewModel): ImageControlModel[];
  static Create(model: InputType) {
    if (model instanceof DeviceViewModel) {
      return this.fromDeviceViewModel(model);
    } else if (model instanceof Camera) {
      return this.fromCamera(model);
    } else if (model instanceof IllegalDropEventRecord) {
      return this.fromIllegalDropEventRecord(model);
    } else if (model instanceof GarbageFullEventRecord) {
      return this.fromGarbageFullEventRecord(model);
    } else if (model instanceof MixedIntoEventRecord) {
      return this.fromMixedIntoEventRecord(model);
    } else if (model instanceof EventRecordViewModel) {
      switch (model.EventType) {
        case EventType.IllegalDrop:
          return this.fromIllegalDropEventRecord(model);
        case EventType.GarbageFull:
          return this.fromGarbageFullEventRecord(model);
        case EventType.MixedInto:
          return this.fromMixedIntoEventRecord(model);
        case EventType.GarbageDrop:
        case EventType.GarbageDropHandle:
        case EventType.GarbageDropSuperTimeout:
        case EventType.GarbageDropTimeout:
        case EventType.GarbageDropTimeoutHandle:
          return this.fromEventRecordViewModel(model);
        default:
          return this.fromEventRecordViewModel(model);
      }
    } else if (model instanceof GarbageDropRecordViewModel) {
      return this.fromGarbageDropRecordViewModel(model);
    } else {
      return undefined;
    }
  }

  static create(
    id: string,
    url: Promise<string>,
    name: string,
    args?: {
      stationId?: string;
      eventTime?: Date;
      onerror?: boolean;
      camera?: Promise<ICamera>;
      polygon?: EventDataObject[];
      rules?: EventRule[];
    }
  ): ImageControlModel {
    let model = new ImageControlModel();
    model.id = id;
    model.src = url;
    model.name = name;
    if (args) {
      model.onerror = args.onerror ? Medium.default : '';
      model.eventTime = args.eventTime;
      model.camera = args.camera;
      model.stationId = args.stationId;
      model.polygon = args.polygon;
      model.rules = args.rules;
      if (args.camera) {
        args.camera.then((camera) => {
          model.status = camera.OnlineStatus ?? OnlineStatus.Offline;
        });
      }
    }

    return model;
  }

  private static fromCamera(model: Camera) {
    return this.create(model.Id, Medium.img(model.ImageUrl), model.Name, {
      stationId: model.GarbageStationId,
      onerror: true,
      camera: new Promise((x) => x(model)),
    });
  }
  private static fromDeviceViewModel(model: DeviceViewModel) {
    return this.create(model.Id, Medium.img(model.ImageUrl), model.Name, {
      stationId: model.GarbageStationId,
      onerror: true,
      camera: new Promise((x) => x(model)),
    });
  }
  private static fromMixedIntoEventRecord(data: MixedIntoEventRecord) {
    return this.create(
      data.ResourceId ?? data.EventId,
      Medium.img(data.ImageUrl ?? Medium.default),
      data.ResourceName ?? data.Data.StationName,

      {
        eventTime: data.EventTime,
        stationId: data.Data.StationId,
      }
    );
  }
  private static fromGarbageFullEventRecord(data: GarbageFullEventRecord) {
    if (data.Data.CameraImageUrls) {
      return data.Data.CameraImageUrls.map((x) => {
        return ImageControlCreater.create(
          x.CameraId,
          Medium.img(x.ImageUrl),
          x.CameraName ?? data.ResourceName ?? data.Data.StationName,
          {
            stationId: data.Data.StationId,
            eventTime: data.EventTime,
          }
        );
      });
    } else {
      return [Medium.default];
    }
  }
  private static fromIllegalDropEventRecord(data: IllegalDropEventRecord) {
    return ImageControlCreater.create(
      data.ResourceId ?? data.EventId,
      Medium.img(data.ImageUrl ?? Medium.default),
      data.ResourceName ?? data.Data.StationName,
      {
        eventTime: data.EventTime,
        stationId: data.Data.StationId,
        rules: data.Data.Rules,
        polygon: data.Data.Objects,
      }
    );
  }
  private static fromEventRecordViewModel(data: EventRecordViewModel) {
    return ImageControlCreater.create(
      data.ResourceId ?? data.EventId,
      data.ResourceName ?? data.Data.StationName,
      data.ImageUrl ?? Medium.default,
      {
        eventTime: data.EventTime,
        stationId: data.Data.StationId,
      }
    );
  }
  private static fromGarbageDropRecordViewModel(
    data: GarbageDropRecordViewModel
  ) {
    let models = [];
    if (data.Data.DropImageUrls) {
      models.push(
        ...data.Data.DropImageUrls.map((url) =>
          this.create(
            url.CameraId,
            Medium.img(url.ImageUrl),
            url.CameraName ?? data.Data.StationName,
            {
              stationId: data.Data.StationId,
              eventTime: data.EventTime,
            }
          )
        )
      );
    }
    if (data.Data.TimeoutImageUrls) {
      models.push(
        ...data.Data.TimeoutImageUrls.map((url) =>
          this.create(
            url.CameraId,
            Medium.img(url.ImageUrl),
            url.CameraName ?? data.Data.StationName,
            {
              stationId: data.Data.StationId,
              eventTime: data.EventTime,
            }
          )
        )
      );
    }
    if (data.Data.HandleImageUrls) {
      models.push(
        ...data.Data.HandleImageUrls.map((url) =>
          this.create(
            url.CameraId,
            Medium.img(url.ImageUrl),
            url.CameraName ?? data.Data.StationName,
            {
              stationId: data.Data.StationId,
              eventTime: data.EventTime,
            }
          )
        )
      );
    }
    return models;
  }
}
