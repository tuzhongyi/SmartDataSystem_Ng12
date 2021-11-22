import { InnerUrl } from '../../base.url';
import { TrashCanInnerUrl } from './trash_can.url';

export class CameraInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Cameras`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  excels() {
    return `${this.basic()}/Excels`;
  }
  files(id: string, begin: string, end: string) {
    return `${this.item(id)}/Files?BeginTime=${begin}&EndTime=${end}`;
  }
  trashcan(id: string) {
    return new TrashCanInnerUrl(this.item(id));
  }
}
