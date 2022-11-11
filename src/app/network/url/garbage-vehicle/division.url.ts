import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../base.url';

export class GarbageVehicleDivisionUrl extends AbstractUrl {
  private static url = new GarbageVehicleDivisionUrl(
    `${BasicUrl.garbage.vehicle}/Divisions`
  );
  static basic() {
    return this.url.basic();
  }

  static item(id: string) {
    return this.url.item(id);
  }
  static list() {
    return this.url.list();
  }
  static excles() {
    return `${this.basic()}/Excels`;
  }
  static tree() {
    return `${this.basic()}/Tree`;
  }
  static garbage(id?: string) {
    let base: string = id ? this.item(id) : this.basic();
    return new GarbageUrl(base);
  }
}
class GarbageUrl extends AbstractUrl {
  weight = new WeightUrl(this.basic());
  score = new ScoreUrl(this.basic());

  constructor(base: string) {
    super(`${base}/Garbages`);
  }
}

class WeightUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Weight`);
  }
}

class ScoreUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Score`);
  }
}
