import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { AIGarbageDropWindow } from 'src/app/network/model/ai-garbage/drop-window.model';
import {
  AIGarbageDeviceCommand,
  AIGarbageDeviceCommandNo,
} from 'src/app/network/model/ai-garbage/garbage-device-command.enum';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { AIGarbageStationDeviceCommandBusiness } from './ai-garbage-station-device-command.business';
import { AIGarbageStationDeviceCommandWindow } from './ai-garbage-station-device-command.model';

@Component({
  selector: 'app-ai-garbage-station-device-command',
  templateUrl: './ai-garbage-station-device-command.component.html',
  styleUrls: [
    '../../../../../assets/less/confirm.less',
    './ai-garbage-station-device-command.component.less',
  ],
  providers: [AIGarbageStationDeviceCommandBusiness],
})
export class AIGarbageStationDeviceCommandComponent implements OnInit {
  @Input()
  model?: AIGarbageDevice;
  @Input()
  power: EventEmitter<AIGarbageDropWindow> = new EventEmitter();

  constructor(private business: AIGarbageStationDeviceCommandBusiness) {}

  Language = Language;
  debug = true;
  window = new AIGarbageStationDeviceCommandWindow();
  AIGarbageDeviceCommand = AIGarbageDeviceCommandNo;
  ngOnInit(): void {}

  tocommand(cmd: AIGarbageDeviceCommandNo, number?: number) {
    let command = new AIGarbageDeviceCommand();
    command.CommandNo = cmd;
    command.Parameter = number;
    this.window.confirm.command = command;
    this.window.confirm.show = true;
  }
  oncommand(cmd?: AIGarbageDeviceCommand) {
    if (this.model && cmd) {
      this.business
        .command(this.model.Id, cmd)
        .then((x) => {
          MessageBar.response_success('操作成功');
        })
        .catch((x) => {
          MessageBar.response_Error('操作失败');
        })
        .finally(() => {
          this.window.close();
        });
    }
  }
}
