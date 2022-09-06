import { DeviceWindowBusiness } from './device-window.business';
import { ElectricBikeIndexEventRecordWindowBusiness } from './event-record.business';
import { MediaMultipleWindowBusiness } from './media-multiple-window.business';
import { MediaSingleWindowBusiness } from './media-single-window.business';
import { MediaWindowBusiness } from './media-window.business';
import { StationWindowBusiness } from './station-window.business';

export const ElectricBikeWindowBusinesses = [
  MediaWindowBusiness,
  MediaSingleWindowBusiness,
  MediaMultipleWindowBusiness,
  DeviceWindowBusiness,
  ElectricBikeIndexEventRecordWindowBusiness,
  StationWindowBusiness,
];
