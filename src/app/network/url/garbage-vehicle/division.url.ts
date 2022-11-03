/*
 * @Author: pmx 
 * @Date: 2022-11-03 14:46:19 
 * @Last Modified by:   pmx 
 * @Last Modified time: 2022-11-03 14:46:19 
 */
import { BaseGarbageVehicleUrl, InnerUrl } from '../base.url';

export abstract class GarbageVehicleDivisionUrl {
  static basic() {
    return `${BaseGarbageVehicleUrl}/Divisions`;
  }

  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static excles() {
    return `${this.basic()}/Excels`;
  }
  static garbage(id?: string) {
    let base: string = id ? this.item(id) : this.basic();
    return new GarbageUrl(base);
  }
}
class GarbageUrl implements InnerUrl {
  weight = new WeightUrl(this.basic());
  score = new ScoreUrl(this.basic());

  constructor(private base: string) {}

  basic() {
    return `${this.base}/Garbages`;
  }
}

class WeightUrl implements InnerUrl {
  constructor(private base: string) {}

  basic() {
    return `${this.base}/Weight`;
  }
}

class ScoreUrl implements InnerUrl {
  constructor(private base: string) {}

  basic() {
    return `${this.base}/Score`;
  }
}
