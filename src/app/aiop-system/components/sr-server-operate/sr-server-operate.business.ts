import { Injectable } from '@angular/core';
import { SRServer } from 'src/app/network/model/garbage-station/sr-server';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';

@Injectable()
export class SRServerOperateBusiness {
  constructor(private _srRequest: SRServerRequestService) {}
  getServer(id: string) {
    return this._srRequest.get(id);
  }
  createServer(server: SRServer) {
    return this._srRequest.create(server);
  }
  updateServer(server: SRServer) {
    return this._srRequest.update(server);
  }
}
