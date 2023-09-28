import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class DeployMapWindow {
  coordinate = new DeployMapCoordinateWindow();
  unbind = new DeployMapUnbindWindow();
  bind = new DeployMapUnbindWindow();
  location = new DeployMapLocationWindow();
  clean() {
    this.coordinate.clean();
    this.bind.clean();
    this.unbind.clean();
    this.location.clean();
  }

  close() {
    this.coordinate.show = false;
    this.unbind.show = false;
    this.bind.show = false;
    this.location.show = false;
  }
}

class DeployMapCoordinateWindow extends WindowViewModel {
  clean() {
    this.station = undefined;
  }
  station?: GarbageStation;
  style = {
    width: '400px',
    height: '300px',
  };
}

class DeployMapUnbindWindow extends ConfirmDialogModel {
  constructor() {
    super('提示', '是否解除绑定该点位');
  }
  clean() {}
  show = false;
}
class DeployMapBindWindow extends ConfirmDialogModel {
  constructor() {
    super('提示', '是否绑定该点位');
  }
  clean() {}
  show = false;
}
class DeployMapLocationWindow extends ConfirmDialogModel {
  constructor() {
    super('提示', '是否保存当前位置');
  }
  clean() {
    this.point = undefined;
    this.position = undefined;
  }
  point?: CesiumDataController.Point;
  position?: CesiumDataController.Position;
  show = false;
}

export interface DeployMapResult {
  amap: boolean;
  service: boolean;
}
export interface AMapDragendArgs {
  point: CesiumDataController.Point;
  position: CesiumDataController.Position;
}
