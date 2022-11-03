/*
 * @Author: pmx
 * @Date: 2022-11-03 14:46:22
 * @Last Modified by:   pmx
 * @Last Modified time: 2022-11-03 14:46:22
 */
import { BaseGarbageVehicleUrl, InnerUrl } from '../base.url';

export abstract class GarbageVehicleCollectionPointUrl {
  static basic() {
    return `${BaseGarbageVehicleUrl}/CollectionPoints`;
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
class TrashCanUrl implements InnerUrl {
  constructor(private base: string) {}
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

class StatisticUrl implements InnerUrl {
  constructor(private base: string) {}

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
