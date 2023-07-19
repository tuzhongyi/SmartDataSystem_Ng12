export class VideoPresetPointControlModel {
  constructor(index: number, name = '') {
    this.index = index;
    this.name = name;
  }
  index: number;
  name: string;
}
