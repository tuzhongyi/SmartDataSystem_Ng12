import { Injectable } from '@angular/core';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';

@Injectable()
export class AIGarbageStationRegionManagerBusiness {
  constructor(private service: AIGarbageRequestService) {}

  download(filename: string) {
    return this.service.region.excel.get(filename);
  }
  upload(file: any) {
    return this.service.region.excel.post(file);
  }
  delete(ids: string[]) {
    let all = ids.map((x) => {
      return this.service.region.delete(x);
    });
    return Promise.all(all);
  }
}
