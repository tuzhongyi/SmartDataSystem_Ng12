import { EventHandleCompleteConverter } from './converter/event-handle-complete.converter';
import { EventHandleCompleteBusiness } from './event-handle-complete.business';

import { EventHandleCompleteService } from './service/event-handle-complete.service';

export const EventHandleCompleteProvider = [
  EventHandleCompleteService,
  EventHandleCompleteBusiness,
  EventHandleCompleteConverter,
];
