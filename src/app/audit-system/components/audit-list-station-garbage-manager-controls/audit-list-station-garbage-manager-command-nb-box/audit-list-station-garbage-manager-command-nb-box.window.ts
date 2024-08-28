import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

export class AuditListStationGarbageManagerCommandNBBoxWindow {
  confirm = new ConfirmWindow();
  close() {
    this.confirm.close();
  }
}

export class ConfirmWindow extends WindowViewModel {
  clear() {
    this.type = undefined;
  }
  type?: number;
  style = {
    width: '500px',
    height: 'auto',
  };

  get language() {
    switch (this.type) {
      case 1:
        return '是否重启5V电源';
      case 2:
        return '是否重启12V电源';
      default:
        return '';
    }
  }

  close() {
    this.clear();
    this.show = false;
  }
}
