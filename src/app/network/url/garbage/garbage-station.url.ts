import { BaseGarbageUrl } from '../base.url';
import { CameraInnerUrl } from './inner/camera.url';
import { EventNumberInnerUrl } from './inner/event-number.url';
import { MemberInnerUrl } from './inner/member.url';
import { StatisticInnerUrl } from './inner/statistic.url';
import { TaskInnerUrl } from './inner/task.url';
import { TrashCanInnerUrl } from './inner/trash-can.url';
import { TypeInnerUrl } from './inner/type.url';
import { VolumeInnerUrl } from './inner/volume.url';

export class GarbageStationUrl {
  static basic() {
    return `${BaseGarbageUrl}/GarbageStations`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static excels() {
    return `${this.basic()}/Excels`;
  }
  static manualcapture(id: string) {
    return `${this.item(id)}/ManualCapture`;
  }

  static camera(id?: string) {
    const base = id ? this.item(id) : this.basic();
    return new CameraInnerUrl(base);
  }
  static trashcan(id?: string) {
    const base = id ? this.item(id) : this.basic();
    return new TrashCanInnerUrl(base);
  }
  static statistic(id?: string) {
    const base = id ? this.item(id) : this.basic();
    return new StatisticInnerUrl(base);
  }
  static eventnumber(id?: string) {
    const base = id ? this.item(id) : this.basic();
    return new EventNumberInnerUrl(base);
  }

  static type = new TypeInnerUrl(this.basic());

  static member(id: string) {
    return new MemberInnerUrl(this.item(id));
  }
  static task(id: string) {
    return new TaskInnerUrl(this.item(id));
  }
  static volume(id: string) {
    return new VolumeInnerUrl(this.item(id));
  }
}
