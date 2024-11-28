import { DeviceViewModel } from '../common/components/tables/device-list-table/device.model';
import { GarbageDropRecordViewModel } from '../common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { Medium } from '../common/tools/medium';
import { EventType } from '../enum/event-type.enum';
import { OnlineStatus } from '../enum/online-status.enum';
import { ICamera } from '../network/model/garbage-station/camera.interface';
import { Camera } from '../network/model/garbage-station/camera.model';
import { EventDataObject } from '../network/model/garbage-station/event-data-object.model';
import { GarbageFullEventRecord } from '../network/model/garbage-station/event-record/garbage-full-event-record.model';
import { IllegalDropEventRecord } from '../network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { MixedIntoEventRecord } from '../network/model/garbage-station/event-record/mixed-into-event-record.model';
import { SewageEventRecord } from '../network/model/garbage-station/event-record/sewage-event-record.model';
import { EventRule } from '../network/model/garbage-station/event-rule';
import { CameraImageUrl } from '../network/model/url.model';
import { EventRecordViewModel } from '../view-model/event-record.model';
import { ImageControlModel } from '../view-model/image-control.model';

type InputType =
  | Camera
  | DeviceViewModel
  | IllegalDropEventRecord
  | GarbageFullEventRecord
  | MixedIntoEventRecord
  | SewageEventRecord
  | EventRecordViewModel
  | GarbageDropRecordViewModel
  | CameraImageUrl
  | string;

export class ImageControlCreater {
  static Create(model: SewageEventRecord): ImageControlModel[];
  static Create(model: GarbageFullEventRecord): ImageControlModel[];
  static Create(model: MixedIntoEventRecord): ImageControlModel[];
  static Create(model: GarbageDropRecordViewModel): ImageControlModel[];
  static Create(
    model: EventRecordViewModel
  ): ImageControlModel | ImageControlModel[];
  static Create(model: string): ImageControlModel;
  static Create(model: Camera): ImageControlModel;
  static Create(model: CameraImageUrl): ImageControlModel;
  static Create(model: DeviceViewModel): ImageControlModel;
  static Create(model: IllegalDropEventRecord): ImageControlModel;

  static Create(model: InputType) {
    if (typeof model === 'string') {
      return this.fromString(model);
    } else if (model instanceof DeviceViewModel) {
      return this.fromDeviceViewModel(model);
    } else if (model instanceof Camera) {
      return this.fromCamera(model);
    } else if (model instanceof CameraImageUrl) {
      return this.fromCameraImageUrl(model);
    } else if (model instanceof IllegalDropEventRecord) {
      return this.fromIllegalDropEventRecord(model);
    } else if (model instanceof GarbageFullEventRecord) {
      return this.fromGarbageFullEventRecord(model);
    } else if (model instanceof MixedIntoEventRecord) {
      return this.fromMixedIntoEventRecord(model);
    } else if (model instanceof SewageEventRecord) {
      return this.fromSewageEventRecord(model);
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
        case EventType.Sewage:
          return this.fromSewageEventRecord(model);
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
      ishandle?: boolean;
      istimeout?: boolean;
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
      model.ishandle = args.ishandle;
      model.istimeout = args.istimeout;
      if (args.camera) {
        args.camera.then((camera) => {
          model.status = camera.OnlineStatus ?? OnlineStatus.Offline;
        });
      }
    }

    return model;
  }

  private static fromCameraImageUrl(model: CameraImageUrl) {
    return this.create(
      model.CameraId,
      Medium.img(model.ImageUrl),
      model.CameraName ?? '',
      {
        onerror: true,
        rules: model.Rules,
        polygon: model.Objects,
      }
    );
  }

  private static fromString(input: string) {
    let model = new ImageControlModel();
    model.src = Medium.img(input);
    model.onerror = '';
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
    let result = [
      this.create(
        data.ResourceId ?? data.EventId,
        Medium.img(data.ImageUrl ?? Medium.default),
        data.ResourceName ?? data.Data.StationName,

        {
          eventTime: data.EventTime,
          stationId: data.Data.StationId,
          rules: data.Data.Rules,
          polygon: data.Data.Objects,
          ishandle: false,
          istimeout: false,
        }
      ),
    ];
    if (data.Data.HandleImageUrl) {
      result.push(
        this.create(
          data.ResourceId ?? data.EventId,
          Medium.img(data.Data.HandleImageUrl ?? Medium.default),
          data.ResourceName ?? data.Data.StationName,
          {
            eventTime: data.Data.ProcessTime,
            stationId: data.Data.StationId,
            ishandle: true,
            istimeout: false,
          }
        )
      );
    }
    return result;
  }
  private static fromSewageEventRecord(data: SewageEventRecord) {
    let result = [
      this.create(
        data.ResourceId ?? data.EventId,
        Medium.img(data.ImageUrl ?? Medium.default),
        data.ResourceName ?? data.Data.StationName,
        {
          eventTime: data.EventTime,
          stationId: data.Data.StationId,
          rules: data.Data.Rules,
          polygon: data.Data.Objects,
          ishandle: false,
          istimeout: false,
        }
      ),
    ];
    if (data.Data.HandleImageUrl) {
      result.push(
        this.create(
          data.ResourceId ?? data.EventId,
          Medium.img(data.Data.HandleImageUrl ?? Medium.default),
          data.ResourceName ?? data.Data.StationName,
          {
            eventTime: data.Data.ProcessTime,
            stationId: data.Data.StationId,
            ishandle: true,
            istimeout: false,
          }
        )
      );
    }
    return result;
  }
  private static fromGarbageFullEventRecord(data: GarbageFullEventRecord) {
    let result: ImageControlModel[] = [];
    if (data.Data.CameraImageUrls) {
      result = data.Data.CameraImageUrls.map((x) => {
        return ImageControlCreater.create(
          x.CameraId,
          Medium.img(x.ImageUrl),
          x.CameraName ?? data.ResourceName ?? data.Data.StationName,
          {
            stationId: data.Data.StationId,
            eventTime: data.EventTime,
            ishandle: false,
            istimeout: false,
            rules: x.Rules,
            polygon: x.Objects,
          }
        );
      });
    } else {
      result = [
        ImageControlCreater.create(
          data.ResourceId!,
          new Promise<string>((resolve) => {
            resolve(Medium.default);
          }),
          data.ResourceName ?? data.Data.StationName
        ),
      ];
    }

    if (data.Data.HandleImageUrls) {
      result.push(
        ...data.Data.HandleImageUrls.map((x) => {
          return this.create(
            x.CameraId ?? data.ResourceId ?? data.EventId,
            Medium.img(x.ImageUrl ?? Medium.default),
            x.CameraName ?? data.ResourceName ?? data.Data.StationName,
            {
              eventTime: data.Data.ProcessTime,
              stationId: data.Data.StationId,
              ishandle: true,
              istimeout: false,
            }
          );
        })
      );
    }

    return result;
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
              ishandle: false,
              istimeout: false,
              rules: url.Rules,
              polygon: url.Objects,
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
              ishandle: false,
              istimeout: true,
              rules: url.Rules,
              polygon: url.Objects,
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
              ishandle: true,
              istimeout: data.Data.IsSuperTimeout || data.Data.IsTimeout,
              rules: url.Rules,
              polygon: url.Objects,
            }
          )
        )
      );
    }
    return models;
  }
}
