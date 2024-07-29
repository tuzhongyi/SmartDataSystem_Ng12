import { EventRecordCountTableDivisionBusiness } from './event-record-count-table-division.business';
import { EventRecordCountTableStationBusiness } from './event-record-count-table-station.business';
import { EventRecordCountTableBusiness } from './event-record-count-table.business';
import { EventRecordCountTableConverter } from './event-record-count-table.converter';

export const EventRecordCountTableBusinessProviders = [
  EventRecordCountTableBusiness,
  EventRecordCountTableStationBusiness,
  EventRecordCountTableDivisionBusiness,
  EventRecordCountTableConverter,
];
