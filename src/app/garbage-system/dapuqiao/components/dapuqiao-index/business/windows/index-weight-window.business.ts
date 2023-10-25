import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageType } from 'src/app/enum/garbage-type.enum';

export class IndexWeightWindowBusiness extends WindowViewModel {
  clear() {
    this.type = undefined;
  }
  style = {
    top: '55%',
    width: '90%',
    height: '89%',
  };
  type?: GarbageType;
}
