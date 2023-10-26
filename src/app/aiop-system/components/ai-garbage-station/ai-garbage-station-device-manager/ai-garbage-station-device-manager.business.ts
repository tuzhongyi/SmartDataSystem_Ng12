import { Injectable } from '@angular/core';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';

@Injectable()
export class AIGarbageStationDeviceManagerBusiness {
  constructor(
    private service: AIGarbageRequestService,
    private sr: SRServerRequestService
  ) {}

  async preview(cameraId: string) {
    let url = await this.sr.preview(cameraId, StreamType.main);
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
