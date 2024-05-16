import { StationType } from 'src/app/enum/station-type.enum';

export class IconTool {
  static StationType(type: StationType) {
    switch (type) {
      case StationType.Garbage:
        return 'howell-icon-garbage';
      case StationType.Smart:
      case StationType.Rfid:
        return 'howell-icon-smart_garbage';
      case StationType.Construction:
        return 'howell-icon-construction_waste';
      default:
        return '';
    }
  }
}
