import { IInnerUrl } from '../../base.url';

export class TaskInnerUrl implements IInnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Tasks`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
  finish(id: string) {
    return `${this.item(id)}/Finish`;
  }
}
