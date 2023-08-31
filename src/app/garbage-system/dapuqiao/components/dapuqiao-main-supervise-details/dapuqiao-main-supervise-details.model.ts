import { GarbageDropEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';

export class GarbageDropEventRecordModel extends GarbageDropEventRecord {
  GarbageStation!: Promise<GarbageStation>;
  Image!: GarbageDropEventRecordImage;
  LevelTime!: Date;
  Minutes?: number;
}

export class GarbageDropEventRecordImage {
  private _models: ImageControlModel[] = [];
  public get models(): ImageControlModel[] {
    return this._models;
  }
  public set models(v: ImageControlModel[]) {
    this._models = v;
    if (this._models && this.models.length > 0) {
      this.current = this._models[this.index];
    }
  }
  current?: ImageControlModel;
  index: number = 0;
  get first() {
    return this.index === 0;
  }
  get last() {
    return this.index === this.models.length - 1;
  }
  onnext() {
    this.index++;
    if (this.index < this.models.length) {
      this.current = this.models[this.index];
    }
  }
  onprev() {
    this.index--;
    if (this.index >= 0) {
      this.current = this.models[this.index];
    }
  }
}
