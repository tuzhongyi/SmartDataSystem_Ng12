import { Injectable } from '@angular/core';
import { AIGarbageRfidCard } from 'src/app/network/model/ai-garbage/rfid-card.model';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';

@Injectable()
export class AIGarbageStationRfidCardDetailsBusiness {
  constructor(private service: AIGarbageRequestService) {}

  update(model: AIGarbageRfidCard) {
    model.UpdateTime = new Date();
    return this.service.rfid.cards.update(model);
  }
}
