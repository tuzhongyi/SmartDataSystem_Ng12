import { Component, Input, OnInit } from '@angular/core';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { ErrorModel } from 'src/app/network/model/ai-garbage/message/error.model';
import { ResponseMessageModel } from 'src/app/network/model/ai-garbage/message/response-message.model';

@Component({
  selector: 'ai-garbage-station-device-session-message-history-manager',
  templateUrl:
    './ai-garbage-station-device-session-message-history-manager.component.html',
  styleUrls: [
    './ai-garbage-station-device-session-message-history-manager.component.less',
  ],
})
export class AiGarbageStationDeviceSessionMessageHistoryManagerComponent
  implements OnInit
{
  @Input() devices: AIGarbageDevice[] = [];
  @Input() messages: ResponseMessageModel[] = [];
  @Input() errors: ErrorModel[] = [];

  constructor() {}

  selected = {
    device: undefined as AIGarbageDevice | undefined,
    message: undefined as ResponseMessageModel | undefined,
    error: undefined as ErrorModel | undefined,
    clear: () => {
      this.selected.device = undefined;
      this.selected.message = undefined;
      this.selected.error = undefined;
    },
  };

  get success() {
    return this.messages.map((x) => x.Id);
  }

  ngOnInit(): void {
    if (!this.selected.device && this.devices.length > 0) {
      this.on.select(this.devices[0]);
    }
  }

  on = {
    select: (data: AIGarbageDevice) => {
      this.selected.clear();
      this.selected.message = this.messages.find((x) => x.Id === data.Id);
      if (this.selected.message) return;

      this.selected.error = this.errors.find((x) => x.Id === data.Id);
    },
  };
}
