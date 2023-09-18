import { EventEmitter, Injectable } from '@angular/core';
import { DaPuQiaoGarbageStationEventRecordVisionModel } from 'src/app/common/components/tables/daqupiao/dapuqiao-garbage-station-event-record-vision-table/dapuqiao-garbage-station-event-record-vision-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { Medium } from 'src/app/common/tools/medium';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { EventRecord } from 'src/app/network/model/event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { SupervisePosition } from '../../../dapuqiao-main-event-vision/dapuqiao-main-event-vision.model';
import { IndexImageWindowBusiness } from './index-image-window.business';

@Injectable()
export class IndexSuperviseTableWindowBusiness extends WindowViewModel {
  constructor(private image: IndexImageWindowBusiness) {
    super();
  }
  select: EventEmitter<EventRecord> = new EventEmitter();
  details: EventEmitter<EventRecord> = new EventEmitter();
  private _position?: SupervisePosition;
  public get position(): SupervisePosition | undefined {
    return this._position;
  }
  public set position(v: SupervisePosition | undefined) {
    switch (v) {
      case SupervisePosition.main:
        this.style = {
          width: 'calc(50% - 10px)',
          height: 'calc(((100% - 90px) / 3 * 2) - 14px)',
          top: '100px',
          transform: 'translateX(-50%)',
          bottom: 'auto',
          padding: '15px 20px',
          display: 'block',
          transition:
            this._position === SupervisePosition.bottom ? '0.8s' : '0.4s',
        };

        break;
      case SupervisePosition.center:
        this.style = {
          width: 'calc(50% - 10px)',
          height: '500px', //'calc(((100% - 90px) / 3 * 2) - 14px)',
          top: '56%',
          transform: 'translate(-50%, -50%)',
          bottom: 'auto',
          padding: '15px 20px',
          display: 'block',
          transition:
            this._position === SupervisePosition.bottom ? '0.6s' : '0.4s',
        };
        break;
      case SupervisePosition.bottom:
        this.style = {
          width: 'calc(50% - 10px)',
          height: 'calc(((100% - 90px) / 3 * 1) - 11px)',
          top: 'auto',
          transform: 'translateX(-50%)',
          bottom: '5px',
          padding: '15px 20px',
          display: 'block',
          transition:
            this._position === SupervisePosition.main ? '0.8s' : '0.6s',
        };
        break;

      default:
        break;
    }
    this._position = v;
  }

  style = {
    width: 'calc(50% - 10px)',
    height: 'calc(((100% - 90px) / 3 * 2) - 14px)',
    top: '56%',
    transform: 'translate(-50%, -50%)',
    bottom: 'auto',
    padding: '15px 20px',
    display: 'none',
    transition: '0.4s',
  };

  ondetails(item: DaPuQiaoGarbageStationEventRecordVisionModel) {
    this.details.emit(item);
  }
  onselect(item: DaPuQiaoGarbageStationEventRecordVisionModel) {
    this.select.emit(item);
  }
  async onimage(item: DaPuQiaoGarbageStationEventRecordVisionModel) {
    this.image.array.manualcapture = true;
    this.image.array.index = 0;
    this.image.array.stationId = item.Data.StationId;

    let models = this.convert(await item.GarbageStation);
    this.image.array.models = models;

    this.image.array.show = true;
  }

  convert(station: GarbageStation) {
    if (station.Cameras) {
      let array = station.Cameras.sort((a, b) => {
        return LocaleCompare.compare(a.Name, b.Name);
      }).map((camera, i) => {
        let img = new ImageControlModel();
        img.id = camera.Id;
        img.stationId = station.Id;
        img.name = camera.Name ?? '';
        img.src = Medium.img(camera.ImageUrl);
        img.status = camera.OnlineStatus ?? OnlineStatus.Offline;
        img.index = i;
        img.camera = camera;
        return img;
      });
      return array;
    }
    return [];
  }

  onclose() {
    this.show = false;
  }
}
