import { EventType } from 'src/app/enum/event-type.enum';
import { StationType } from 'src/app/enum/station-type.enum';

export class IconTool {
  static StationType(type: StationType) {
    switch (type) {
      case StationType.Garbage:
        return 'howell-icon-garbage';
      case StationType.Smart:
      case StationType.Plus:
        return 'howell-icon-smart_garbage';
      case StationType.Construction:
        return 'howell-icon-construction_waste';
      default:
        return '';
    }
  }

  static EventType(type: EventType) {
    switch (type) {
      case EventType.IllegalDrop:
        return 'howell-icon-nolittering';
      case EventType.MixedInto:
        return 'howell-icon-mixlittering';

      case EventType.GarbageFull:
        return 'howell-icon-fullgarbage';
      case EventType.Smoke:
        return 'howell-icon-smoke';
      case EventType.GarbageDrop:
        return 'howell-icon-garbage_ground';
      case EventType.PanicButton:
        return 'howell-icon-alarm3';
      default:
        return '';
    }
  }
  static Signal(value?: number) {
    if (!value) {
      return 'howell-icon-no_signal';
    } else {
      return 'howell-icon-signal2';
    }
  }
}
