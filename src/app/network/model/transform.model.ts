import { TransformationType, TransformFnParams } from 'class-transformer';
import { formatDate } from '@angular/common';
import { Flags } from 'src/app/common/tools/flags';
import { Time } from './time.model';

export function transformDateTime(params: TransformFnParams) {
  if (params.value === undefined || params.value === null) return undefined;
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Date(params.value);
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return formatDate(params.value as Date, 'yyyy-MM-ddTHH:mm:ssZZZZZ', 'en');
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
export function transformTimespan(params: TransformFnParams) {
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

export function transformTime(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Time(params.value);
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    let value = params.value as Time;
    let date = new Date(0, 0, 0, value.hour, value.minute, value.second);
    return formatDate(date, 'HH:mm:ss', 'en');
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Time(params.value);
  } else {
    return '';
  }
}

export function transformFlags(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    if (params.value != undefined) {
      if (typeof params.value === 'number') {
        return new Flags(params.value);
      }
      return params.value;
    }
    return undefined;
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    if (!params.value) return 0;
    return (params.value as Flags<any>).value;
  } else {
    return params.value;
  }
}
