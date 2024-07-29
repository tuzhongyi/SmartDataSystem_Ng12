import { EventType } from 'src/app/enum/event-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { EventRecordWindowDetailsBusiness } from '../../../event-record-window/tab-items/event-record-window-details/business/event-record-window-details.business';

export interface HowellGarbageDropStationWindowItemDetailsController {
  business: EventRecordWindowDetailsBusiness;
  types: EventType[];
  division?: Division;
}
