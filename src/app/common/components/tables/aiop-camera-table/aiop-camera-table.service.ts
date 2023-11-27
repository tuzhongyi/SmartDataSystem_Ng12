import { Injectable } from '@angular/core';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class AiopCameraTableService {
  constructor(public resource: ResourceRequestService) {}
}
