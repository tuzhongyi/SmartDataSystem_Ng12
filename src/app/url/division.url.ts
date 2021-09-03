import { garbage } from './base.url';

export class DivisionUrl {
  static basic() {
    return `${garbage}Divisions`;
  }
  static list(): string {
    return this.basic() + '/List';
  }
}
