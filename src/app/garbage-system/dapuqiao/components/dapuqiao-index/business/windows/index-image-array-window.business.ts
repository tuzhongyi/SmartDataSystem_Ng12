import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { timer } from 'rxjs';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { Medium } from 'src/app/common/tools/medium';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { IndexVideoWindowBusiness } from './index-video-window.business';

@Injectable()
export class IndexImageArrayWindowBusiness extends WindowViewModel {
  constructor(
    private stationService: GarbageStationRequestService,
    private video: IndexVideoWindowBusiness
  ) {
    super();
  }

  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };

  manualcapture = false;
  stationId?: string;

  private _models: ImageControlModel[] = [];
  public get models(): ImageControlModel[] {
    return this._models;
  }
  public set models(v: ImageControlModel[]) {
    this._models = v;
    if (this.manualcapture) {
      this.manualCapture(this.stationId, v).then((x) => {
        this._models = x;
        if (this._models && this.models.length > 0) {
          this.current = this._models[this.index];
        }
      });
    }
    if (this._models && this.models.length > 0) {
      this.current = this._models[this.index];
    }
  }

  current?: ImageControlModel;
  index: number = 0;
  captureing = false;

  get first() {
    return this.index === 0;
  }
  get last() {
    return this.index === this.models.length - 1;
  }

  onnext() {
    this.index++;
    if (this.index < this.models.length) {
      this.current = this.models[this.index];
    }
  }
  onprev() {
    this.index--;
    if (this.index >= 0) {
      this.current = this.models[this.index];
    }
  }

  onvideo() {
    if (this.current) {
      this.video.title = this.current.name;
      if (this.current.eventTime) {
        this.video.playback(
          this.current.id,
          DateTimeTool.beforeOrAfter(this.current.eventTime)
        );
      } else {
        this.video.preview(this.current.id);
      }
    }
  }

  private async manualCapture(
    stationId?: string,
    models: ImageControlModel[] = []
  ) {
    this.captureing = true;
    return timer(1000)
      .toPromise()
      .then((x) => {
        if (stationId) {
          return this.stationService.manualCapture(stationId).then((urls) => {
            try {
              if (models) {
                for (let i = 0; i < models.length; i++) {
                  for (let j = 0; j < urls.length; j++) {
                    const url = urls[j];
                    if (url.CameraId == models[i].id && url.Result && url.Id) {
                      let plain = instanceToPlain(models[i]);
                      let img = plainToInstance(ImageControlModel, plain);
                      img.src = Medium.img(url.Id);
                      models[i] = img;
                    }
                  }
                }
              }
              return models;
            } finally {
              this.captureing = false;
            }
          });
        }
        return [];
      });
  }
}
