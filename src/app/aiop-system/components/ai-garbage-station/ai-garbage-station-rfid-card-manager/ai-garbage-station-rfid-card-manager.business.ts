import { Injectable } from '@angular/core';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';

@Injectable()
export class AIGarbageStationRfidCardManagerBusiness {
  constructor(private service: AIGarbageRequestService) {}

  download(filename: string, regionId: string) {
    return this.service.rfid.cards.excel.get(filename, {
      regionId: regionId,
    });
  }
  upload(file: any, regionId: string) {
    return this.service.rfid.cards.excel.post(file, {
      regionId: regionId,
    });
  }
  delete(ids: string[]) {
    let all = ids.map((x) => {
      return this.service.rfid.cards.delete(x);
    });
    return Promise.all(all);
  }
}
