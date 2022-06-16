import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { CameraDownloadFileParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class DownloadBusiness {
  constructor(private stationService: GarbageStationRequestService) {}
  video(stationId: string, cameraId: string, args: DurationParams): void;
  video(stationId: string, cameraId: string, args: Date): void;
  video(stationId: string, cameraId: string, args: DurationParams | Date) {
    let duration: DurationParams;
    if (args instanceof Date) {
      duration = DurationParams.beforeAndAfter(args);
    } else {
      duration = args;
      const interval =
        duration.EndTime.getTime() - duration.BeginTime.getTime();
      if (interval > 5 * 60 * 1000) {
        duration.EndTime.setTime(duration.BeginTime.getTime() + 5 * 1000 * 60);
      }
    }

    let params = new CameraDownloadFileParams();
    params.CameraId = cameraId;
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    params.GarbageStationId = stationId;
    const response = this.stationService.camera.file.download(params);
    response.then((data) => {
      if (data && data.Url) {
        const a = document.createElement('a');
        a.href = data.Url;
        a.click();
        document.body.appendChild(a);
        document.body.removeChild(a);
      }
    });
  }

  image(url: string, name: string, time: Date) {
    const a = document.createElement('a');
    a.href = url;
    a.download =
      name + ' ' + formatDate(time, 'yyyy_MM_dd HH:mm:ss', 'en') + '.jpeg';
    a.click();
    document.body.appendChild(a);
    document.body.removeChild(a);
  }
}
