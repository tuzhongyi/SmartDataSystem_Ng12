import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AIGarbageDeviceCommand,
  AIGarbageDeviceCommandNo,
} from 'src/app/network/model/ai-garbage/garbage-device-command.enum';

@Component({
  selector: 'ai-garbage-station-device-command-confirm',
  templateUrl: './ai-garbage-station-device-command-confirm.component.html',
  styleUrls: [
    '../../../../../../assets/less/confirm.less',
    './ai-garbage-station-device-command-confirm.component.less',
  ],
})
export class AiGarbageStationDeviceCommandConfirmComponent implements OnInit {
  @Input() command?: AIGarbageDeviceCommand;
  @Output() ok = new EventEmitter<AIGarbageDeviceCommand>();
  @Output() cancel = new EventEmitter<void>();
  constructor() {}

  language = '';

  ngOnInit(): void {
    if (this.command) {
      this.language = this.load(this.command.CommandNo, this.command.Parameter);
    }
  }

  load(command: AIGarbageDeviceCommandNo, parameter?: number) {
    switch (command) {
      case AIGarbageDeviceCommandNo.SyncRfidCard:
        return '同步RFID卡号';
      case AIGarbageDeviceCommandNo.UpgradeCheck:
        return '自动程序升级检测';
      case AIGarbageDeviceCommandNo.SelfCheck:
        return '系统自检，并上报结果';
      case AIGarbageDeviceCommandNo.Reboot:
        return '重启系统';
      case AIGarbageDeviceCommandNo.TCPConnection:
        return '开启TCP连接';
      case AIGarbageDeviceCommandNo.ExhaustFan:
        return `${parameter === 1 ? '打开' : '关闭'}排风扇`;
      case AIGarbageDeviceCommandNo.Spray:
        return `喷洒香氛`;
      case AIGarbageDeviceCommandNo.DeviceInformation:
        return '设备信息同步';
      case AIGarbageDeviceCommandNo.WindowPowerOn:
        return `窗口上电`;
      case AIGarbageDeviceCommandNo.GCHAUpgradeCheck:
        return 'GCHA自动程序升级检测';
      case AIGarbageDeviceCommandNo.GCHAReboot:
        return 'GCHA重启系统';
      case AIGarbageDeviceCommandNo.GCHATCP:
        return 'GCHA开启TCP连接';
      default:
        return '';
    }
  }

  onok() {
    this.ok.emit(this.command);
  }
  oncancel() {
    this.cancel.emit();
  }
}
