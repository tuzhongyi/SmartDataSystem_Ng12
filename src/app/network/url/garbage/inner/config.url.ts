import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { InnerUrl } from '../../base.url';

export class ConfigInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Config`;
  }
  item(type: UserConfigType) {
    return `${this.basic()}/${type}`;
  }
}
