import { LanguageCameraTypePipe } from './languages/language-camera-type.pipe';
import { HowellTimePipe } from './howell-time.pipe';
import { KeepHtmlPipe } from './keep-html.pipe';
import { VehicleTypePipe } from './vehicle-type.pipe';
import { EventTypePipe } from './event-type.pipe';
import { LanguageCollectionMemberType } from './languages/language-collection-member-type.pipe';
import { LanguageCollectionPointClassification } from './languages/language-collection-point-classification.pipe';
import { LanguageGender } from './languages/language-gender.pipe';
import { LanguageOnlineStatus } from './languages/language-online-status.pipe';
import { LanguagePositionNo } from './languages/language-position-no.pipe';
import { LanguageTrashCanType } from './languages/language-trashcan-type.pipe';

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
  LanguageCollectionMemberType,
  LanguageTrashCanType,
];
