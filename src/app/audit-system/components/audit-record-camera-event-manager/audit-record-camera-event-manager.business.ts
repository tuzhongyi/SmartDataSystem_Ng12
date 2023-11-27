import { Injectable } from '@angular/core';
import { AIModelRequestService } from 'src/app/network/request/ai-model/ai-model.service';

@Injectable()
export class AuditRecordCameraEventManagerBusiness {
  constructor(private service: AIModelRequestService) {}

  async models() {
    let paged = await this.service.list();
    return paged.Data;
  }
}
