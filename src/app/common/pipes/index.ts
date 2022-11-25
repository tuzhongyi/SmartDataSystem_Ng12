import { LanguageCameraTypePipe } from './language-camera-type.pipe';
import { HowellTimePipe } from './howell-time.pipe';
import { KeepHtmlPipe } from './keep-html.pipe';
import { VehicleTypePipe } from './vehicle-type.pipe';
import { EventTypePipe } from './event-type.pipe';

export const CUSTOM_PIPES = [
  HowellTimePipe,
  KeepHtmlPipe,
  VehicleTypePipe,
  EventTypePipe,
  LanguageCameraTypePipe,
];
