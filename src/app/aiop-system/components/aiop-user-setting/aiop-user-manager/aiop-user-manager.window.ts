import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { User } from 'src/app/network/model/garbage-station/user.model';

export class AIOPUserManagerWindow {
  details = new AIOPUserManagerDetailsWindow();
  confirm = new AIOPUserManagerConfirmWindow();
  password = new AIOPUserManagerPasswordWindow();
  clear() {
    this.details.clear();
    this.confirm.clear();
    this.password.clear();
  }
  close() {
    this.details.show = false;
    this.confirm.show = false;
    this.password.show = false;
  }
}

class AIOPUserManagerDetailsWindow extends WindowViewModel {
  clear() {
    this.user = undefined;
  }
  style = {
    width: '800px',
    height: '80%',
  };
  user?: User;
}
class AIOPUserManagerPasswordWindow extends WindowViewModel {
  clear() {
    this.user = undefined;
  }
  style = {
    width: '500px',
    height: 'auto',
  };
  user?: User;
}
class AIOPUserManagerConfirmWindow extends WindowViewModel {
  clear() {
    this.models = [];
  }
  get content() {
    return `是否删除 ${this.models
      .map((x) => x.LastName ?? x.FirstName ?? x.Username)
      .join(', ')} ？`;
  }
  models: User[] = [];
}
