import { Language } from 'src/app/common/tools/language';
import { IIdNameModel } from 'src/app/network/model/model.interface';

export class DropWindowModel implements IIdNameModel {
  get Id() {
    return this.No.toString();
  }

  get Name() {
    return `窗口 ${this.No} ${Language.DropWindowType(this.DropType)}`;
  }

  No!: number;
  DropType!: number;
  GripperState?: number;
  Weight?: number;
  PlateTurningState?: number;
  WindowState?: number;
  GarbageFull?: number;
}
