import { CommonSelectDirective } from './common-select.directive';
import { CommonOptionDirective } from './common-select.option.directive';
import { DateTimePickerDirective } from './date-time-picker/date-time-picker.directive';
import { TouchSpinDirective } from './touch-spin/touch-spin.directive';

export const CUSTOM_DIRECTIVES = [
  DateTimePickerDirective,
  TouchSpinDirective,
  CommonSelectDirective,
  CommonOptionDirective
];
