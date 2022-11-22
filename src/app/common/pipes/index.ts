import { EventTypePipe } from './Event-type.pipe';
import { HowellTimePipe } from './howell-time.pipe';
import { KeepHtmlPipe } from './keep-html.pipe';
import { VehicleTypePipe } from './vehicle-type.pipe';

export const CUSTOM_PIPES = [
  HowellTimePipe,
  KeepHtmlPipe,
  VehicleTypePipe,
  EventTypePipe,
];
