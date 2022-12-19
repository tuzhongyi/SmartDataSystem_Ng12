import { EventEmitter } from '@angular/core';
import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { ICamera } from 'src/app/network/model/camera.interface';
import { ImageControlModel } from 'src/app/view-model/image-control.model';

export interface IMediaControlBusiness
  extends IBusiness<
    Array<ICamera | ImageControlModel>,
    ImageVideoControlModel[]
  > {
  manualCaptureEvent: EventEmitter<boolean>;
  manualCapture(
    stationId: string,
    models: ImageVideoControlModel[]
  ): Promise<ImageVideoControlModel[]>;
}

export interface IMediaControlComponent {}
