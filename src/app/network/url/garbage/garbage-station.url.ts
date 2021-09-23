import { BaseGarbageUrl } from '../base.url';
import { CameraUrl } from './inner/camera.url';
import { EventNumberUrl } from './inner/event-number.url';
import { MemberUrl } from './inner/member.url';
import { StatisticUrl } from './inner/statistic.url';
import { TaskUrl } from './inner/task.url';
import { TrashCanUrl } from './inner/trash-can.url';
import { TypeUrl } from './inner/type.url';
import { VolumeUrl } from './inner/volume.url';

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
    return new CameraUrl(base);
  }
  static trashcan(id?: string) {
    const base = id ? this.item(id) : this.basic();
    return new TrashCanUrl(base);
  }
  static statistic(id?: string) {
    const base = id ? this.item(id) : this.basic();
    return new StatisticUrl(base);
  }
  static eventnumber(id?: string) {
    const base = id ? this.item(id) : this.basic();
    return new EventNumberUrl(base);
  }

  static type = new TypeUrl(this.basic());

  static member(id: string) {
    return new MemberUrl(this.item(id));
  }
  static task(id: string) {
    return new TaskUrl(this.item(id));
  }
  static volume(id: string) {
    return new VolumeUrl(this.item(id));
  }
}
