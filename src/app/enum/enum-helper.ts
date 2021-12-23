import { DivisionType } from './division-type.enum';
import { UserResourceType } from './user-resource-type.enum';

export class EnumHelper {
  constructor() {}

  static ConvertUserResourceToDivision(type: UserResourceType) {
    switch (type) {
      case UserResourceType.City:
        return DivisionType.City;
      case UserResourceType.Committees:
        return DivisionType.Committees;
      case UserResourceType.County:
        return DivisionType.County;
      case UserResourceType.Station:
      default:
        return DivisionType.None;
    }
  }
  static ConvertDivisionToUserResource(type: DivisionType) {
    switch (type) {
      case DivisionType.City:
        return UserResourceType.City;
      case DivisionType.County:
        return UserResourceType.County;
      case DivisionType.Committees:
        return UserResourceType.Committees;
      default:
        return UserResourceType.City;
    }
  }

  // 要改
  static GetResourceChildTypeByDivisionType(type: DivisionType) {
    switch (type) {
      case DivisionType.City:
        return UserResourceType.County;
      case DivisionType.County:
        return UserResourceType.Committees;
      case DivisionType.Committees:
        return UserResourceType.Station;
      default:
        throw new Error('this is no divisiontype');
    }
  }
  static GetResourceChildType(type: UserResourceType) {
    switch (type) {
      case UserResourceType.City:
        return UserResourceType.County;
      case UserResourceType.County:
        return UserResourceType.Committees;
      case UserResourceType.Committees:
        return UserResourceType.Station;
      default:
        throw new Error('There Is No UserResourceType');
    }
  }
  static GetDivisionChildType(type: DivisionType) {
    switch (type) {
      case DivisionType.Province:
        return DivisionType.City;
      case DivisionType.City:
        return DivisionType.County;
      case DivisionType.County:
        return DivisionType.Committees;
      case DivisionType.Committees:
        return DivisionType.Community;
      default:
        throw new Error('this is not divisiontype');
    }
  }
}

export class Enum {
  obj: any;
  constructor(obj: any) {
    this.obj = obj;
  }

  getName(value: any) {
    return this.obj[value];
  }

  getKeys() {
    let keys = Object.keys(this.obj);
    let count = keys.length / 2;
    keys.splice(0, count);
    return keys;
  }
  getValues() {
    let keys = Object.keys(this.obj);
    let count = keys.length / 2;
    let values = keys.splice(0, count);
    return values;
  }

  toMap<T>(creater?: (obj: any) => T) {
    let keys = this.getKeys();
    let map = new Map(
      keys.map((x) => {
        return [x, creater ? creater(this.obj[x]) : this.obj[x]];
      })
    );
    return map;
  }

  toArray<T>(creater?: (obj: any) => T) {
    let keys = this.getKeys();
    return keys.map((x) => {
      return creater ? creater(this.obj[x]) : this.obj[x];
    });
  }
}
