import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

import { Medium } from 'src/app/common/tools/medium';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { PatrolControlConverter } from './patrol-control.converter';

import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { Paged } from 'src/app/view-model/paged.model';
import { PatrolControlModel } from './patrol-control.model';

@Injectable()
export class PatrolControlBusiness
  implements IBusiness<PagedList<GarbageStation>, Paged<PatrolControlModel>>
{
  constructor(
    private storeService: GlobalStorageService,
    private stationService: GarbageStationRequestService,
    private srService: SRServerRequestService
  ) {}
  converter: IConverter<GarbageStation, PatrolControlModel> =
    new PatrolControlConverter();

  async load(index: number): Promise<Paged<PatrolControlModel>> {
    let paged = await this.getData(this.storeService.divisionId, index);
    let station = paged.Data[0];
    let statistic = await this.statistic(station.Id);
    let data = this.converter.Convert(station, statistic);
    let model = new Paged<PatrolControlModel>();
    model.Page = paged.Page;
    model.Data = data;

    return model;
  }

  manualCaptureEvent: EventEmitter<boolean> = new EventEmitter();

  manualCapture(
    id: string,
    medias: ImageVideoControlModel[]
  ): Promise<ImageVideoControlModel[]> {
    this.manualCaptureEvent.emit(true);

    return new Promise((resolve) => {
      return this.stationService.manualCapture(id).then((urls) => {
        try {
          medias.forEach((media) => {
            urls.forEach((url) => {
              if (
                url.CameraId == media.cameraId &&
                url.Result &&
                media.image &&
                url.Id
              ) {
                media.fulled = false;
                let plain = instanceToPlain(media.image);
                media.image = plainToInstance(ImageControlModel, plain);
                media.image.src = Medium.img(url.Id);
              }
            });
          });
          resolve(medias);
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

  async statistic(stationId: string) {
    return this.stationService.statistic.number.get(stationId);
  }

  async getData(
    divisionId: string,
    index: number
  ): Promise<PagedList<GarbageStation>> {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    params.PageIndex = index;
    params.PageSize = 1;
    return this.stationService.list(params);
  }

  model?: PatrolControlModel;
}
