import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { AIGarbageRfidCard } from 'src/app/network/model/ai-garbage/rfid-card.model';
import { AIGarbageStationRfidCardDetailsBusiness } from './ai-garbage-station-rfid-card-details.business';

@Component({
  selector: 'app-ai-garbage-station-rfid-card-details',
  templateUrl: './ai-garbage-station-rfid-card-details.component.html',
  styleUrls: ['./ai-garbage-station-rfid-card-details.component.less'],
  providers: [AIGarbageStationRfidCardDetailsBusiness],
})
export class AIGarbageStationRfidCardDetailsComponent {
  @Input()
  model?: AIGarbageRfidCard;
  @Output()
  ok: EventEmitter<AIGarbageRfidCard> = new EventEmitter();
  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  constructor(private business: AIGarbageStationRfidCardDetailsBusiness) {}

  oncancel() {
    this.cancel.emit();
  }
  onok() {
    if (this.model) {
      this.business
        .update(this.model)
        .then((x) => {
          MessageBar.response_success('操作成功');
          this.ok.emit(this.model);
        })
        .catch((x) => {
          MessageBar.response_Error('操作失败');
          console.error(x);
        });
    }
  }
}
