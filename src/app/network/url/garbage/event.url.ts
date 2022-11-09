import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../base.url';

export class EventUrl {
  static basic() {
    return `${BasicUrl.garbage.management}/Events`;
  }
  static get info() {
    return new InfoUrl(this.basic());
  }
  static get record() {
    return new RecordUrl(this.basic());
  }
}

class InfoUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Infos`);
  }
  override item<T = string | number>(id: T) {
    return `${this.basic()}/${id}`;
  }
}

class IllegalDropUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/IllegalDrop`);
  }
}
class MixedIntoUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/MixedInto`);
  }
}

class GarbageFullUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/GarbageFull`);
  }
}

class GarbageDropUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/GarbageDrop`);
  }
}
class RecordUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Records`);
  }
  illegaldrop = new IllegalDropUrl(this.basic());
  mixedinto = new MixedIntoUrl(this.basic());
  garbagefull = new GarbageFullUrl(this.basic());
  garbagedrop = new GarbageDropUrl(this.basic());
}
