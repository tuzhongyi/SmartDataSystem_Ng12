import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { CameraDownloadFileParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IntervalParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class DownloadBusiness {
  constructor(private stationService: GarbageStationRequestService) {}

  video(stationId: string, cameraId: string, args: IntervalParams) {
    const interval = args.EndTime.getTime() - args.BeginTime.getTime();

    if (interval > 5 * 60 * 1000) {
      args.EndTime.setTime(args.BeginTime.getTime() + 5 * 1000 * 60);
    }
    let params = new CameraDownloadFileParams();
    params.CameraId = cameraId;
    params.BeginTime = args.BeginTime;
    params.EndTime = args.EndTime;
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
