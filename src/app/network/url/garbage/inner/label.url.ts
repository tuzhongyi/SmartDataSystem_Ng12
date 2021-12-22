import { UserLabelType } from 'src/app/enum/user-label-type.enum';
import { InnerUrl } from '../../base.url';

export class LabelInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Labels`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
  list() {
    return `${this.basic()}/List`;
  }

  type(id: string, type: UserLabelType) {
    return `${this.item(id)}/LabelTypes/${type}`;
  }
}
