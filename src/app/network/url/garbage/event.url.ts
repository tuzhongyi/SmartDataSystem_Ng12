import { BaseGarbageUrl } from '../base.url';

export class EventUrl {
  static basic() {
    return `${BaseGarbageUrl}/Events`;
  }
  static get info() {
    return new InfoUrl(this.basic());
  }
  static get record() {
    return new RecordUrl(this.basic());
  }
}

class InfoUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Infos`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  item(id: string | number) {
    return `${this.basic()}/${id}`;
  }
}

class IllegalDropUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/IllegalDrop`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}
class MixedIntoUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/MixedInto`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}

class GarbageFullUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/GarbageFull`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}

class GarbageDropUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/GarbageDrop`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}
class SmokeUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Smoke`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}
class RecordUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Records`;
  }
  illegaldrop = new IllegalDropUrl(this.basic());
  mixedinto = new MixedIntoUrl(this.basic());
  garbagefull = new GarbageFullUrl(this.basic());
  garbagedrop = new GarbageDropUrl(this.basic());
  smoke = new SmokeUrl(this.basic());
}
