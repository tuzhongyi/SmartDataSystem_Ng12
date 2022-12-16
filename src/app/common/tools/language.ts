/*
 * @Author: pmx
 * @Date: 2022-11-03 15:03:31
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-12 17:15:17
 */
import { formatDate } from '@angular/common';
import { Flags } from 'src/app/common/tools/flags';
import { CameraState } from 'src/app/enum/camera-state.enum';
import { CameraType } from 'src/app/enum/camera-type.enum';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { ChartType } from 'src/app/enum/chart-type.enum';
import {
  CollectionDeviceStateCountType,
  CollectionDeviceStateRatioType,
} from 'src/app/enum/collection-device-state.enum';
import {
  DeviceStateCountType,
  DeviceStateRatioType,
} from 'src/app/enum/device-state-count.enum';
import { DisposalCountType } from 'src/app/enum/disposal-count.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { VehiclePositionNo } from 'src/app/enum/position-no.enum';
import { RelayState } from 'src/app/enum/relay-state.enum';
import {
  ResourceType,
  VehicleResourceType,
} from 'src/app/enum/resource-type.enum';
import { RetentionType } from 'src/app/enum/retention-type.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { StatisticType } from 'src/app/enum/statistic-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { VehicleRelayOperator } from 'src/app/enum/vehicle-relay.enum';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { SearchOptionKey } from 'src/app/view-model/search-options.model';
import language from './language.json';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { Gender } from 'src/app/enum/gender.enum';
import { CollectionMemberType } from 'src/app/enum/member-type.enum';

export class Language {
  static StationState(state: StationState) {
    switch (state) {
      case StationState.Full:
        return Language.json.full;
      case StationState.Error:
        return Language.json.error;
      default:
        return Language.json.normal;
    }
  }

  static StatisticType(type: StatisticType) {
    switch (type) {
      case StatisticType.avgGarbageTime:
        return Language.json.StatisticType.AvgGarbageTime;
      case StatisticType.maxGarbageTime:
        return Language.json.StatisticType.MaxGarbageTime;
      case StatisticType.garbageDuration:
        return Language.json.StatisticType.GarbageDuration;
      case StatisticType.illegalDrop:
        return Language.EventType(EventType.IllegalDrop);
      case StatisticType.mixedInto:
        return Language.EventType(EventType.MixedInto);
      case StatisticType.garde:
      default:
        return Language.json.StatisticType.Garde;
    }
  }

  static TimeUnit(unit: TimeUnit) {
    switch (unit) {
      case TimeUnit.Hour:
        return Language.json.Date.day + Language.json.report;
      case TimeUnit.Day:
        return Language.json.Date.month + Language.json.report;
      default:
        return Language.json.unknow;
    }
  }

  static Week(day: number) {
    let name = ['日', '一', '二', '三', '四', '五', '六', '日'];
    return `周${name[day]}`;
  }

  static Date(date: Date) {
    return formatDate(date, 'yyyy年MM月dd日', 'en');
  }

  static Duration(begin: Date, end: Date) {
    return `${Language.Date(begin)} 至 ${Language.Date(end)}`;
  }

  static StationStateFlags(flags: Flags<StationState>) {
    if (flags.contains(StationState.Error)) {
      return Language.StationState(StationState.Error);
    } else if (flags.contains(StationState.Full)) {
      return Language.StationState(StationState.Full);
    } else {
      return Language.StationState(0);
    }
  }

  static CameraType(type: CameraType) {
    switch (type) {
      case CameraType.Gun:
        return Language.json.CameraType.Gun;
      case CameraType.Ball:
        return Language.json.CameraType.Ball;
      case CameraType.HalfBall:
        return Language.json.CameraType.HalfBall;
      case CameraType.AIO:
        return Language.json.CameraType.AIO;
      default:
        return Language.json.unknow;
    }
  }
  static CameraUsage(usage: CameraUsage) {
    switch (usage) {
      case CameraUsage.Volume:
        return Language.json.CameraUsage.Volume;
      case CameraUsage.MixedInto:
        return Language.json.CameraUsage.MixedInto;
      case CameraUsage.IllegalDrop:
        return Language.json.CameraUsage.IllegalDrop;
      case CameraUsage.GarbageFull:
        return Language.json.CameraUsage.GarbageFull;
      default:
        return Language.json.unknow;
    }
  }

  static EventType(type: EventType) {
    switch (type) {
      case EventType.None:
        return Language.json.EventType.None;
      case EventType.IllegalDrop:
        return Language.json.EventType.IllegalDrop;
      case EventType.MixedInto:
        return Language.json.EventType.MixedInto;
      case EventType.GarbageVolume:
        return Language.json.EventType.GarbageVolume;
      case EventType.GarbageFull:
        return Language.json.EventType.GarbageFull;
      case EventType.GarbageDrop:
        return Language.json.EventType.GarbageDrop;
      case EventType.GarbageDropTimeout:
        return Language.json.EventType.GarbageDropTimeout;
      case EventType.GarbageDropHandle:
        return Language.json.EventType.GarbageDropHandle;
      default:
        return Language.json.EventType.Default;
    }
  }

  static GarbageDropEventType(type: EventType, isTimeout?: boolean) {
    switch (type) {
      case EventType.GarbageDrop:
        return Language.json.wait + Language.json.handle;
      case EventType.GarbageDropTimeout:
        return (
          Language.json.timeout + Language.json.wait + Language.json.handle
        );

      case EventType.GarbageDropHandle:
        if (isTimeout) {
          return Language.json.timeout + Language.json.handle;
        } else {
          return Language.json.did + Language.json.handle;
        }
      // case EventType.GarbageDropTimeoutHandle:
      //   return Language.json.timeout + Language.json.handle;
      default:
        return Language.json.unknow;
    }
  }

  static GarbageDropEventTypeClassName(type: EventType, isTimeout?: boolean) {
    switch (type) {
      case EventType.GarbageDrop:
        return 'orange-text';
      case EventType.GarbageDropTimeout:
        return 'powder-red-text';
      case EventType.GarbageDropHandle:
        if (isTimeout) {
          return 'sky-blue-text2';
        } else {
          return 'green-text';
        }

      default:
        return Language.json.unknow;
    }
  }

  static CameraState(state: CameraState) {
    switch (state) {
      case CameraState.DeviceError:
        return Language.json.device + Language.json.fault;
      case CameraState.PlatformError:
        return Language.json.platform + Language.json.fault;
      default:
        return Language.json.unknow;
    }
  }

  static ResourceType(type: ResourceType) {
    switch (type) {
      case ResourceType.Camera:
        return Language.json.monitor + Language.json.point;
      case ResourceType.EncodeDevice:
        return Language.json.encode + Language.json.device;

      case ResourceType.IoTSensor:
        return Language.json.IoT + Language.json.sensor;
      case ResourceType.GarbageStation:
        return Language.json.garbage + Language.json.room;
      default:
        return Language.json.unknow;
    }
  }
  static SearchOption(key: SearchOptionKey) {
    switch (key) {
      case SearchOptionKey.name:
        return '投放点';
      case SearchOptionKey.community:
        return '社区';
      default:
        return Language.json.unknow;
    }
  }
  static StationType(type: StationType) {
    switch (type) {
      case StationType.Garbage:
        return Language.json.StationType.Garbage;
      case StationType.Construction:
        return '建筑垃圾';
      default:
        return Language.json.unknow;
    }
  }
  static DivisionType(type: DivisionType) {
    switch (type) {
      case DivisionType.Province:
        return Language.json.DivisionType.Province;
      case DivisionType.City:
        return Language.json.DivisionType.City;
      case DivisionType.County:
        return Language.json.DivisionType.County;
      case DivisionType.Committees:
        return Language.json.DivisionType.Committees;
      default:
        throw new Error(type.toString());
    }
  }

  static Time(time: Date | number, full = true) {
    let result = '';
    if (typeof time === 'number') {
      const hours = parseInt((time / 60).toString());
      const minutes = parseInt((Math.ceil(time) % 60).toString());

      result = hours ? hours + Language.json.Time.hour : '';

      if (full || !result) {
        result += minutes ? minutes + Language.json.Time.minute : '';
      }
    } else {
      let t = new Date(time.getTime());
      let offset = t.getTimezoneOffset() / 60;
      t.setHours(t.getHours() + offset);

      if (t.getHours() > 0) {
        result = `${t.getHours()}${Language.json.Time.hour}${result}`;
      }
      if (full || !result) {
        let minutes = t.getMinutes();
        if (t.getSeconds() > 0) {
          minutes++;
        }
        if (minutes > 0) {
          result = `${result}${minutes}${Language.json.Time.minute}`;
        }
      }
    }
    if (!result) {
      result = `0${Language.json.Time.minute}`;
    }
    return result;
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
        return Language.json.unknow;
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
      case UserResourceType.City:
        return '行政区';
      case UserResourceType.County:
        return '街道';
      case UserResourceType.Committees:
        return '居委会';
      case UserResourceType.Station:
        return '投放点';
      default:
        return Language.json.unknow;
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
        return Language.json.unknow;
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
        return Language.json.unknow;
    }
  }

  static OnlineStatus(status?: OnlineStatus) {
    switch (status) {
      case OnlineStatus.Online:
        return Language.json.OnlineStatus.online;
      case OnlineStatus.Offline:
        return Language.json.OnlineStatus.Offline;
      default:
        return Language.json.unknow;
    }
  }

  static ChartType(type: ChartType) {
    switch (type) {
      case ChartType.bar:
        return '柱状图';
      case ChartType.line:
        return '折线图';
      default:
        return Language.json.unknow;
    }
  }

  static VehicleType(type: VehicleType) {
    switch (type) {
      case VehicleType.Tricycle:
        return Language.json.VehicleType.Tricycle;
      case VehicleType.Car:
        return Language.json.VehicleType.Car;
      default:
        return Language.json.VehicleType.Default;
    }
  }

  static VehiclePositionNo(type?: VehiclePositionNo) {
    switch (type) {
      case VehiclePositionNo.CarFront:
        return Language.json.VehiclePositionNo.CarFront;
      case VehiclePositionNo.CarEnd:
        return Language.json.VehiclePositionNo.CarEnd;
      case VehiclePositionNo.TrashCan:
        return Language.json.VehiclePositionNo.TrashCan;
      default:
        return Language.json.unknow;
    }
  }

  static RelayState(type: RelayState) {
    switch (type) {
      case RelayState.Closed:
        return Language.json.RelayState.Closed;
      case RelayState.Opened:
        return Language.json.RelayState.Opened;
      default:
        return Language.json.RelayState.Default;
    }
  }

  static VehicleResourceType(type: VehicleResourceType) {
    switch (type) {
      case VehicleResourceType.Camera:
        return Language.json.VehicleResourceType.Camera;
      case VehicleResourceType.GarbageVehicle:
        return Language.json.VehicleResourceType.GarbageVehicle;
      default:
        return Language.json.VehicleResourceType.Default;
    }
  }

  static CollectionPointScore(type: CollectionPointScore) {
    switch (type) {
      case CollectionPointScore.Poor:
        return Language.json.CollectionPointScore.Poor;
      case CollectionPointScore.Average:
        return Language.json.CollectionPointScore.Average;
      case CollectionPointScore.Good:
        return Language.json.CollectionPointScore.Good;
      default:
        return Language.json.CollectionPointScore.Default;
    }
  }
  static VehicleRelayOperator(type: VehicleRelayOperator) {
    switch (type) {
      case VehicleRelayOperator.Reset:
        return Language.json.VehicleRelayOperator.Reset;
      case VehicleRelayOperator.Open:
        return Language.json.VehicleRelayOperator.Open;
      case VehicleRelayOperator.Close:
        return Language.json.VehicleRelayOperator.Close;
      default:
        return Language.json.VehicleRelayOperator.Default;
    }
  }

  /**
   *  车辆在线比
   * @param type
   * @returns
   */
  static CollectionDeviceStateRatioType(type: CollectionDeviceStateRatioType) {
    switch (type) {
      case CollectionDeviceStateRatioType.Bad:
        return Language.json.CollectionDeviceStateRatioType.Bad;
      case CollectionDeviceStateRatioType.Mild:
        return Language.json.CollectionDeviceStateRatioType.Mild;
      case CollectionDeviceStateRatioType.Good:
        return Language.json.CollectionDeviceStateRatioType.Good;
      default:
        return Language.json.CollectionDeviceStateRatioType.Default;
    }
  }
  static CollectionDeviceStateRatioTypeColor(
    type: CollectionDeviceStateRatioType
  ) {
    switch (type) {
      case CollectionDeviceStateRatioType.Bad:
        return Language.json.CollectionDeviceStateRatioTypeColor.Bad;
      case CollectionDeviceStateRatioType.Mild:
        return Language.json.CollectionDeviceStateRatioTypeColor.Mild;
      case CollectionDeviceStateRatioType.Good:
        return Language.json.CollectionDeviceStateRatioTypeColor.Good;
      default:
        return Language.json.CollectionDeviceStateRatioTypeColor.Default;
    }
  }

  /**
   *  车辆在线数量
   * @param type
   * @returns
   */
  static CollectionDeviceStateCountType(type: CollectionDeviceStateCountType) {
    switch (type) {
      case CollectionDeviceStateCountType.All:
        return Language.json.CollectionDeviceStateCountType.All;
      case CollectionDeviceStateCountType.Online:
        return Language.json.CollectionDeviceStateCountType.Online;
      case CollectionDeviceStateCountType.Offline:
        return Language.json.CollectionDeviceStateCountType.Offline;
      default:
        return Language.json.CollectionDeviceStateCountType.Default;
    }
  }
  static TrashCanType(type?: TrashCanType) {
    switch (type) {
      case TrashCanType.Dry:
        return Language.json.TrashCanType.Dry;
      case TrashCanType.Wet:
        return Language.json.TrashCanType.Wet;
      case TrashCanType.Recycle:
        return Language.json.TrashCanType.Recycle;
      case TrashCanType.Hazard:
        return Language.json.TrashCanType.Hazard;
      default:
        return Language.json.unknow;
    }
  }

  static VehicleStateFlags(type?: Flags<VehicleState>) {
    if (type) {
      if (type.contains(VehicleState.Offline)) {
        return Language.json.VehicleState.Offline;
      }
      return Language.json.VehicleState.Online;
    }
    return Language.json.unknow;
  }

  static VehicleState(type?: VehicleState) {
    switch (type) {
      case VehicleState.Offline:
        return Language.json.OnlineStatus.Offline;

      default:
        return Language.json.unknow;
    }
  }

  /**
   *  垃圾收运点类型
   * @param type
   */
  static CollectionPointClassification(type: CollectionPointClassification) {
    switch (type) {
      case CollectionPointClassification.Other:
        return Language.json.CollectionPointClassification.Other;
      case CollectionPointClassification.Shop:
        return Language.json.CollectionPointClassification.Shop;
      case CollectionPointClassification.Building:
        return Language.json.CollectionPointClassification.Building;
      case CollectionPointClassification.Residence:
        return Language.json.CollectionPointClassification.Residence;
      case CollectionPointClassification.Unit:
        return Language.json.CollectionPointClassification.Unit;
      case CollectionPointClassification.PublicPlace:
        return Language.json.CollectionPointClassification.PublicPlace;
      default:
        return Language.json.CollectionPointClassification.Default;
    }
  }

  static Gender(gender?: Gender) {
    switch (gender) {
      case Gender.Male:
        return Language.json.Gender.Male;
      case Gender.Female:
        return Language.json.Gender.Female;
      default:
        return Language.json.unknow;
    }
  }

  static CollectionMemberType(value?: CollectionMemberType): string {
    switch (value) {
      case CollectionMemberType.Collection:
        return Language.json.CollectionMemberType.Collection;
      case CollectionMemberType.Other:
      default:
        return Language.json.other;
    }
  }

  static json = language;
}
