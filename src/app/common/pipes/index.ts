import { EventTypePipe } from './event-type.pipe';
import { HowellTimePipe } from './howell-time.pipe';
import { KeepHtmlPipe } from './keep-html.pipe';
import { StationStatePipe } from './station-state.pipe';

export const CUSTOM_PIPES = [
  HowellTimePipe,
  KeepHtmlPipe,
  EventTypePipe,
  StationStatePipe,
];
