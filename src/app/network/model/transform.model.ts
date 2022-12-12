import { TransformationType, TransformFnParams } from 'class-transformer';
import { formatDate } from '@angular/common';
import { Flags } from 'src/app/common/tools/flags';

export function transformDateTime(params: TransformFnParams) {
  if (params.value === undefined || params.value === null) return undefined;
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Date(params.value);
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return (params.value as Date).toISOString();
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Date(params.value);
  } else {
    return '';
  }
}
export function transformDate(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Date(params.value);
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return formatDate(params.value as Date, 'yyyy-MM-dd', 'en');
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Date(params.value);
  } else {
    return '';
  }
}
export function transformTime(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Date(params.value);
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return formatDate(params.value as Date, 'HH!:mm!:ss', 'en');
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Date(params.value);
  } else {
    return '';
  }
}
export function transformFlags(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    if (params.value) {
      return new Flags(params.value);
    }
    return undefined;
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    if (!params.value) return 0;
    return (params.value as Flags<any>).value;
  } else {
    return params.value;
  }
}
