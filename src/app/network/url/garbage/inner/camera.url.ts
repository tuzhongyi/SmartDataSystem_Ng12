import { AbstractUrl } from '../../abstract.url';
import { TrashCanInnerUrl } from './trash_can.url';

export class CameraInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Cameras`);
  }

  excels() {
    return `${this.basic()}/Excels`;
  }
  files(id: string, begin: string, end: string) {
    return `${this.item(id)}/Files?BeginTime=${encodeURIComponent(
      begin
    )}&EndTime=${encodeURIComponent(end)}`;
  }
  trashcan(id: string) {
    return new TrashCanInnerUrl(this.item(id));
  }
}
