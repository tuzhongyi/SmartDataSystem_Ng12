import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { FormState } from 'src/app/enum/form-state.enum';
import { IIdNameModel } from 'src/app/network/model/model.interface';

export class EncodeDeviceManageWindow {
  operate = new EncodeDeviceManageOperateWindow();
  label = new EncodeDeviceManageLabelWindow();
  confirm = new EncodeDeviceManageComfirmWindow();
}

class EncodeDeviceManageOperateWindow extends WindowViewModel {
  clear() {
    this.resource = undefined;
    this.state = FormState.none;
  }
  style = {
    width: '850px',
    height: '70%',
  };
  state = FormState.none;
  resource?: IIdNameModel;
}
class EncodeDeviceManageLabelWindow extends WindowViewModel {
  clear() {
    this.resource = undefined;
  }
  style = {
    width: '850px',
    height: 'auto',
  };

  resource?: IIdNameModel;
}
class EncodeDeviceManageComfirmWindow extends WindowViewModel {
  style = {
    height: 'auto',
  };
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');
}
