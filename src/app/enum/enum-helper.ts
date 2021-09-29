import { DivisionType } from './division-type.enum';
import { UserResourceType } from './user-resource-type.enum';

export class EnumHelper {
  constructor() {}

  static Convert(type: UserResourceType) {
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
}
