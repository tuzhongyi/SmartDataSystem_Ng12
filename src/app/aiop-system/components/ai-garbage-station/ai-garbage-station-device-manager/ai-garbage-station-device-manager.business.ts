import { Injectable } from '@angular/core';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';

@Injectable()
export class AIGarbageStationDeviceManagerBusiness {
  constructor(private service: AIGarbageRequestService) {}

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
