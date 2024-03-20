import { formatDate } from '@angular/common';
import {
  plainToInstance,
  TransformationType,
  TransformFnParams,
} from 'class-transformer';
import { Flags } from 'src/app/common/tools/flags';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageDropEventData } from './garbage-station/event-record/garbage-drop-event-record.model';
import { EventRecordData } from './garbage-station/event-record/garbage-event-record.model';
import { GarbageFullEventData } from './garbage-station/event-record/garbage-full-event-record.model';
import { IllegalDropEventData } from './garbage-station/event-record/illegal-drop-event-record.model';
import { MixedIntoEventData } from './garbage-station/event-record/mixed-into-event-record.model';
import { SewageEventData } from './garbage-station/event-record/sewage-event-record.model';
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
    if (typeof params.value === 'number') {
      let values = [];
      while (params.value > 0) {
        let item = params.value & 255;
        params.value >>= 8;
        values.push(item);
      }
      while (values.length < 4) {
        values.push(0);
      }
      return values.join('.');
    } else {
      return params.value;
    }
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    if (params.value) {
      let result = 0;
      let values = params.value.split('.');
      for (let i = 0; i < values.length; i++) {
        result += parseInt(values[i]) << (8 * i);
      }
      return result;
    }
    return 0;
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return params.value;
  }
}

export function transformBinary(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    if (typeof params.value === 'number') {
      if (params.value === 0) {
        return [0];
      }
      let str = params.value.toString(2).split('').reverse().join('');
      let value = [];
      for (let i = 0; i < str.length; i++) {
        let item = parseInt(str[i]);
        if (item) {
          value.push(i + 1);
        }
      }
      return value;
    }
    return params.value;
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
export function transformEventRecordData(params: TransformFnParams) {
  let record = params.obj as EventRecordData<any>;
  switch (record.EventType) {
    case EventType.GarbageDrop:
    case EventType.GarbageDropHandle:
    case EventType.GarbageDropTimeout:
    case EventType.GarbageDropSuperTimeout:
      return plainToInstance(GarbageDropEventData, params.value);
    case EventType.GarbageFull:
      return plainToInstance(GarbageFullEventData, params.value);
    case EventType.IllegalDrop:
      return plainToInstance(IllegalDropEventData, params.value);
    case EventType.MixedInto:
      return plainToInstance(MixedIntoEventData, params.value);
    case EventType.Sewage:
      return plainToInstance(SewageEventData, params.value);
    default:
      throw new Error('EventRecordDataTransformer unknow eventtype');
  }
}
