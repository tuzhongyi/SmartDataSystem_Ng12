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

  static GetChildType(type: DivisionType) {
    switch (type) {
      case DivisionType.City:
        return UserResourceType.County;
      case DivisionType.County:
        return UserResourceType.Committees;
      case DivisionType.Committees:
        return UserResourceType.Station;
      default:
        throw new Error('this is not divisiontype');
    }
  }
}
