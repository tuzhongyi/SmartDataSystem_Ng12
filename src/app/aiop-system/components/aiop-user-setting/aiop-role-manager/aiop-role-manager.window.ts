import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { Role } from 'src/app/network/model/garbage-station/role.model';

export class AIOPRoleManagerWindow {
  details = new AIOPRoleManagerDetailsWindow();
  confirm = new AIOPRoleManagerConfirmWindow();
  clear() {
    this.details.clear();
    this.confirm.clear();
  }
  close() {
    this.details.show = false;
    this.confirm.show = false;
  }
}

class AIOPRoleManagerDetailsWindow extends WindowViewModel {
  clear() {
    this.role = undefined;
  }
  style = {
    width: '800px',
    height: 'auto',
  };
  role?: Role;
}
class AIOPRoleManagerConfirmWindow extends WindowViewModel {
  clear() {
    this.models = [];
  }
  get content() {
    return `是否删除 ${this.models.map((x) => x.Name).join(', ')} ？`;
  }
  models: Role[] = [];
}
