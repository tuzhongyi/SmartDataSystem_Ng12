import { Injectable } from '@angular/core';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AIOPGarbageStationManagerBusiness {
  constructor(private service: GarbageStationRequestService) {}

  download(filename: string, divisionId: string) {
    return this.service.excel.get(filename, {
      DivisionId: divisionId,
    });
  }
  upload(file: any) {
    return this.service.excel.post(file);
  }
}
