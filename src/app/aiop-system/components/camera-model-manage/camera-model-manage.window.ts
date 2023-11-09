import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { AICameraModelManageEventArgs } from './camera-model-manage.model';

export class CameraModelManageWindow {
  confirm = new CameraModelManageConfirmWindow();
}

class CameraModelManageConfirmWindow extends WindowViewModel {
  style = {
    width: '500px',
    height: 'auto',
  };
  args?: AICameraModelManageEventArgs;
}
