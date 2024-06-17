import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';

@Injectable()
export class AIGarbageStationDeviceManagerBusiness {
  constructor(
    private service: AIGarbageRequestService,
    private sr: SRServerRequestService,
    private local: LocalStorageService
  ) {}

  async preview(cameraId: string) {
    let url = await this.sr.preview(cameraId, this.local.video.stream);
    let converter = new VideoControlConverter();
    return converter.Convert(url);
  }

  download(filename: string) {
    return this.service.device.excel.get(filename);
  }
  upload(file: any) {
    return this.service.device.excel.post(file);
  }
  delete(ids: string[]) {
    let all = ids.map((x) => {
      return this.service.device.delete(x);
    });
    return Promise.all(all);
  }
}
