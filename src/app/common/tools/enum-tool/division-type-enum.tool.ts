import { DivisionType } from 'src/app/enum/division-type.enum';

export class DivisionTypeEnumTool {
  child(type: DivisionType) {
    switch (type) {
      case DivisionType.Province:
        return DivisionType.City;
      case DivisionType.City:
        return DivisionType.County;
      case DivisionType.County:
        return DivisionType.Committees;
      default:
        return DivisionType.None;
    }
  }
  parent(type: DivisionType) {
    switch (type) {
      case DivisionType.None:
      case DivisionType.Community:
        return DivisionType.Committees;
      case DivisionType.Committees:
        return DivisionType.County;
      case DivisionType.County:
        return DivisionType.City;
      case DivisionType.City:
      default:
        return DivisionType.Province;
    }
  }
}
