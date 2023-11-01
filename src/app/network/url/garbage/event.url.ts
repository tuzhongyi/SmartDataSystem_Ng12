import { AbstractUrl } from '../abstract.url';
import { BaseUrl } from '../base.url';

export class EventUrl {
  static basic() {
    return `${BaseUrl.garbage.garbage_management}/Events`;
  }
  static get info() {
    return new EventInfoUrl(this.basic());
  }
  static get record() {
    return new EventRecordUrl(this.basic());
  }
}

class EventInfoUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Infos`);
  }
  override item<T = string | number>(id: T) {
    return `${this.basic()}/${id}`;
  }
}

class EventRecordIllegalDropUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/IllegalDrop`);
  }
}
class EventRecordMixedIntoUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/MixedInto`);
  }
}

class EventRecordGarbageFullUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/GarbageFull`);
  }
}

class EventRecordGarbageDropUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/GarbageDrop`);
  }
}
class EventRecordSewageUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Sewage`);
  }
}
class EventRecordUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Records`);
  }
  illegaldrop = new EventRecordIllegalDropUrl(this.basic());
  mixedinto = new EventRecordMixedIntoUrl(this.basic());
  garbagefull = new EventRecordGarbageFullUrl(this.basic());
  garbagedrop = new EventRecordGarbageDropUrl(this.basic());
  sewage = new EventRecordSewageUrl(this.basic());
}
