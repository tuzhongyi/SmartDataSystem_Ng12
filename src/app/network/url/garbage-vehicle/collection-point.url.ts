/*
 * @Author: pmx
 * @Date: 2022-11-03 14:46:22
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-06 16:10:51
 */
import { BasicUrl.garbage.vehicle, InnerUrl } from '../base.url';

export abstract class GarbageVehicleCollectionPointUrl {
  static basic() {
    return `${BasicUrl.garbage.vehicle}/CollectionPoints`;
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
  static trashcan(id?: string) {
    const base = id ? this.item(id) : this.basic();
    return new TrashCanUrl(base);
  }

  static get statistics() {
    return new StatisticUrl(this.basic());
  }
}
class TrashCanUrl extends AbstractUrl {
  constructor(private base: string) { }
  basic() {
    return `${this.base}/TrashCans`;
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
}

class StatisticUrl extends AbstractUrl {
  constructor(private base: string) { }

  basic() {
    return `${this.base}/Statistics`;
  }

  number() {
    return `${this.basic()}/Number`;
  }
  scoreTopList() {
    return `${this.basic()}/ScoreTopList`;
  }
  weightTopList() {
    return `${this.basic()}/WeightTopList`;
  }
}
