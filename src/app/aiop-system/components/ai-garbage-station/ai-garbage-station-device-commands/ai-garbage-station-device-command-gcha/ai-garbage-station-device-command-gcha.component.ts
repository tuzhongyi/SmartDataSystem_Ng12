import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Language } from 'src/app/common/tools/language';
import {
  AIGarbageDeviceCommand,
  AIGarbageDeviceCommandNo,
} from 'src/app/network/model/ai-garbage/garbage-device-command.enum';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { AIGarbageStationDeviceCommandBusiness } from '../ai-garbage-station-device-commands.business';
import { AIGarbageStationDeviceCommandWindow } from '../ai-garbage-station-device-commands.window';

@Component({
  selector: 'ai-garbage-station-device-command-gcha',
  templateUrl: './ai-garbage-station-device-command-gcha.component.html',
  styleUrls: [
    '../ai-garbage-station-device-commands.less',
    './ai-garbage-station-device-command-gcha.component.less',
  ],
  providers: [AIGarbageStationDeviceCommandBusiness],
})
export class AiGarbageStationDeviceCommandGCHAComponent implements OnInit {
  @Input() model?: AIGarbageDevice;
  constructor(
    private business: AIGarbageStationDeviceCommandBusiness,
    private toastr: ToastrService
  ) {}

  window = new AIGarbageStationDeviceCommandWindow();
  AIGarbageDeviceCommand = AIGarbageDeviceCommandNo;
  Language = Language;
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
          this.toastr.success('操作成功');
        })
        .catch((x) => {
          this.toastr.error('操作失败');
        })
        .finally(() => {
          this.window.close();
        });
    }
  }
}
