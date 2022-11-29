import { LanguageCameraTypePipe } from './language-camera-type.pipe';
import { HowellTimePipe } from './howell-time.pipe';
import { KeepHtmlPipe } from './keep-html.pipe';
import { VehicleTypePipe } from './vehicle-type.pipe';
import { EventTypePipe } from './event-type.pipe';
import { LanguagePositionNo } from './language-position-no.pipe';
import { LanguageOnlineStatus } from './language-online-status';
import { LanguageCollectionPointClassification } from './language-collection-point-classification.pipe';
import { LanguageGender } from './language-gender';

export const CUSTOM_PIPES = [
  HowellTimePipe,
  KeepHtmlPipe,
  VehicleTypePipe,
  EventTypePipe,
  LanguageCameraTypePipe,
  LanguagePositionNo,
  LanguageOnlineStatus,
  LanguageCollectionPointClassification,
  LanguageGender,
];
