import { EventEmitter, Injectable } from '@angular/core';
import { GarbageStationEventRecordVisionModel } from 'src/app/common/components/tables/garbage-station-event-record-vision-table/garbage-station-event-record-vision-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { Medium } from 'src/app/common/tools/medium';
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

  ondetails(item: GarbageStationEventRecordVisionModel) {
    this.details.emit(item);
  }
  onselect(item: GarbageStationEventRecordVisionModel) {
    this.select.emit(item);
  }
  async onimage(item: GarbageStationEventRecordVisionModel) {
    this.image.array.index = 0;
    this.image.array.stationId = item.Data.StationId;
    this.image.array.manualcapture = true;

    let models = this.convert(await item.GarbageStation);
    this.image.array.models = models;

    this.image.array.show = true;
  }

  convert(input: GarbageStation) {
    if (input.Cameras) {
      let array = input.Cameras.sort((a, b) => {
        return LocaleCompare.compare(a.Name, b.Name);
      }).map((x, i) => {
        let img = new ImageControlModel();
        img.src = Medium.img(x.ImageUrl);
        img.name = x.Name ?? '';
        img.stationId = input.Id;
        img.index = i;
        img.camera = x;
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
