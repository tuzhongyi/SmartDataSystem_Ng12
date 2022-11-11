import { EventEmitter, Injectable } from '@angular/core';
import { url } from 'inspector';
import { timer } from 'rxjs';
import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { VideoUrl } from 'src/app/network/model/url.model';

import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParams,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { Medium } from 'src/app/common/tools/medium';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { PatrolArrayControlConverter } from './patrol-control.converter';

import { PatrolControlModel } from './patrol-control.model';

@Injectable()
export class PatrolControlBusiness
  implements IBusiness<GarbageStation[], PatrolControlModel[]>
{
  constructor(
    private storeService: GlobalStorageService,
    private stationService: GarbageStationRequestService,
    private srService: SRServerRequestService
  ) {
    storeService.statusChange.subscribe((x) => {
      this.load();
    });
    storeService.interval.subscribe((x) => {
      this.load();
    });
  }
  Converter: IConverter<GarbageStation[], PatrolControlModel[]> =
    new PatrolArrayControlConverter();

  async load(): Promise<PatrolControlModel[]> {
    let stations = await this.getData(this.storeService.divisionId);

    let statistic = await this.statistic(stations.map((x) => x.Id));
    let model = this.Converter.Convert(stations, statistic);
    this.model = model[0];
    this.model.media = await this.manualCapture(this.model);

    return model;
  }

  manualCaptureEvent: EventEmitter<boolean> = new EventEmitter();

  manualCapture(model: PatrolControlModel) {
    this.manualCaptureEvent.emit(true);
    return timer(1000)
      .toPromise()
      .then((x) => {
        return this.stationService.manualCapture(model.id).then((urls) => {
          try {
            if (model.media) {
              model.media.forEach((media) => {
                urls.forEach((url) => {
                  if (
                    url.CameraId == media.cameraId &&
                    url.Result &&
                    media.image &&
                    url.Id
                  ) {
                    media.fulled = false;
                    media.image.src = Medium.jpg(url.Id);
                  }
                });
              });
            }
            return model.media;
          } finally {
            this.manualCaptureEvent.emit(false);
          }
        });
      });
  }

  getPreview(camera: Camera) {
    return this.srService.preview(camera.Id);
  }
  getPlayback(model: PatrolControlModel, interval: DurationParams) {
    return this.srService.playback(model.id, interval);
  }

  async statistic(stationIds: string[]) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.Ids = stationIds;
    let paged = await this.stationService.statistic.number.list(params);
    return paged.Data;
  }

  async getData(divisionId: string): Promise<GarbageStation[]> {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;

    let paged = await this.stationService.list(params);
    return paged.Data;
  }

  model?: PatrolControlModel;
}
