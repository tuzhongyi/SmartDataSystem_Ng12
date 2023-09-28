import { formatDate } from '@angular/common';
import { TransformationType, TransformFnParams } from 'class-transformer';
import { Flags } from 'src/app/common/tools/flags';
import { IdNameModel } from './model.interface';
import { Time } from './time.model';

export function transformArraySort(params: TransformFnParams) {
  if (params.value === undefined || params.value === null) return undefined;
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return params.value.sort((a: IdNameModel, b: IdNameModel) => {
      return a.Name.length - b.Name.length || a.Name.localeCompare(b.Name);
    });
  } else {
    return params.value;
  }
}

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
  if (Array.isArray(params.value)) {
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      return params.value.map((x) => new Time(x));
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      return params.value.map((x: Time) => {
        let value = x as Time;
        let date = new Date(0, 0, 0, value.hour, value.minute, value.second);
        return formatDate(date, 'HH:mm:ss', 'en');
      });
    } else if (params.type === TransformationType.CLASS_TO_CLASS) {
      return params.value.map((x) => new Time(x));
    }
  } else {
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      return new Time(params.value);
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      let value = params.value as Time;
      let date = new Date(0, 0, 0, value.hour, value.minute, value.second);
      return formatDate(date, 'HH:mm:ss', 'en');
    } else if (params.type === TransformationType.CLASS_TO_CLASS) {
      return new Time(params.value);
    }
  }
  return params.value;
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

export function transformVersion(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return params.value.toString(16);
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return parseInt(`0x${params.value}`, 16);
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return params.value;
  }
}

export function transformBinary(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    let str = params.value.toString(2);
    let value = [];
    for (let i = 0; i < str.length.length; i++) {
      value.push(parseInt(str.length[i]));
    }
    return value;
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    let str = '';
    for (let i = 0; i < params.value.length; i++) {
      str += params.value[i];
    }
    return parseInt(str, 2);
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return params.value;
  }
}
