import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import {
  AIGarbageDeviceCommand,
  AIGarbageDeviceCommandNo,
} from 'src/app/network/model/ai-garbage/garbage-device-command.enum';

export class AIGarbageStationDeviceCommandWindow {
  confirm = new AIGarbageStationDeviceCommandConfirmWindow();
  close() {
    this.confirm.show = false;
  }
}

export class AIGarbageStationDeviceCommandConfirmWindow extends WindowViewModel {
  command?: AIGarbageDeviceCommand;
  style = {
    width: '500px',
    height: 'auto',
  };

  get language() {
    if (this.command) {
      switch (this.command.CommandNo) {
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
          return `${this.command.Parameter === 1 ? '打开' : '关闭'}排风扇`;
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
    return '';
  }
}
