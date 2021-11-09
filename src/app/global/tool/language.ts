import { CameraState } from 'src/app/enum/camera_state.enum';
import { CameraType } from 'src/app/enum/camera_type.enum';
import {
  DeviceStateCountType,
  DeviceStateRatioType,
} from 'src/app/enum/device-state-count.enum';
import { DisposalCountType } from 'src/app/enum/disposal-count.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { RetentionType } from 'src/app/enum/retention-type.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';

export class Language {
  static StationState(state: StationState) {
    switch (state) {
      case StationState.Full:
        return '满溢';
      case StationState.Error:
        return '异常';
      default:
        return '正常';
    }
  }

  static EventType(type: EventType) {
    switch (type) {
      case EventType.IllegalDrop:
        return '乱丢垃圾';
      case EventType.MixedInto:
        return '混合投放';
      case EventType.GarbageVolume:
        return '垃圾容量';
      case EventType.GarbageFull:
        return '垃圾满溢';
      case EventType.GarbageRetention:
        return '小包垃圾待处置';
      case EventType.GarbageRetentionTimeout:
        return '小包垃圾超时待处置';
      case EventType.GarbageRetentionHandled:
        return '小包垃圾已处置';
      default:
        return '';
    }
  }

  static GarbageDropEventType(type: EventType) {
    switch (type) {
      case EventType.GarbageRetention:
        return '待处置';
      case EventType.GarbageRetentionTimeout:
        return '超时待处置';
      case EventType.GarbageRetentionHandled:
        return '已处置';
      default:
        return '';
    }
  }
  static CameraType(type: CameraType) {
    switch (type) {
      case CameraType.Gun:
        return '枪机';
      case CameraType.Ball:
        return '球机';
      case CameraType.HalfBall:
        return '半球';
      case CameraType.AIO:
        return '一体机';
      default:
        return '';
    }
  }
  static CameraState(state: CameraState) {
    switch (state) {
      case CameraState.DeviceError:
        return '设备故障';
      case CameraState.PlatformError:
        return '平台故障';

      default:
        return '';
    }
  }
  static ResourceType(type: ResourceType) {
    switch (type) {
      case ResourceType.Camera:
        return '监控点';
      case ResourceType.EncodeDevice:
        return '编码设备';
      case ResourceType.IoTSensor:
        return '物联网传感器';
      case ResourceType.GarbageStation:
        return '垃圾房';

      default:
        return '';
    }
  }
  static DivisionType(type: DivisionType) {
    switch (type) {
      case DivisionType.Province:
        return '省';
      case DivisionType.City:
        return '行政区划';
      case DivisionType.County:
        return '街道';
      case DivisionType.Committees:
        return '居委会';
      default:
        return '';
    }
  }
  static RetentionType(type: RetentionType) {
    switch (type) {
      case RetentionType.RetentionTime:
        return '滞留时长';
      case RetentionType.RetentionStationNumber:
        return '滞留数量';
    }
  }
  static UserResourceType(type: UserResourceType) {
    switch (type) {
      case UserResourceType.County:
        return '街道';
      case UserResourceType.Committees:
        return '居委';
      case UserResourceType.Station:
        return '投放点';
      case UserResourceType.City:
        return '行政区';
      default:
        return '';
    }
  }
  static DeviceStateCountType(type: DeviceStateCountType) {
    switch (type) {
      case DeviceStateCountType.all:
        return '全部设备数量';
      case DeviceStateCountType.onLine:
        return '在线设备数量';
      case DeviceStateCountType.offLine:
        return '离线设备数量';
      default:
        return '';
    }
  }
  static DeviceStateRatioType(type: DeviceStateRatioType) {
    switch (type) {
      case DeviceStateRatioType.bad:
        return '严重';
      case DeviceStateRatioType.mild:
        return '中度';
      case DeviceStateRatioType.good:
        return '正常';
      default:
        return '';
    }
  }
  static DisposalCountType(type: DisposalCountType) {
    switch (type) {
      case DisposalCountType.total:
        return '全部任务';
      case DisposalCountType.handled:
        return '已完成任务';
      case DisposalCountType.unhandled:
        return '未完成任务';
      case DisposalCountType.timeout:
        return '超时任务';
      default:
        return '';
    }
  }
}
