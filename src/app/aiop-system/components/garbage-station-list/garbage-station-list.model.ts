import { SearchConditionKey } from 'src/app/enum/search-condition.enum';
import { StationState } from 'src/app/enum/station-state.enum';

/**垃圾落地事件 */
export class GarbageStationListModel<T = any> {
  Id!: string; /**图片地址 */
  ImageUrls!: string[];
  StationName!: string;
  CommunityId?: string;
  CommunityName!: string;
  CommitteeId?: string;
  CommitteeName!: string;
  CountyId?: string;
  CountyName!: string;
  State!: string;
  StateCls!: string;
  RawData?: T;
}
export interface GarbageStationListSearchInfo {
  SearchConditionKey: SearchConditionKey;
  Condition: string;
  DivisionId: string;
  PageIndex: number;
  PageSize: number;

  //   StationId: string;
  //   CameraId: string;
  //   Filter: boolean;
  //   PageIndex: number;
  //   PageSize: number;
  //   State: 'open' | 'close';
}
/**
 * 0 正常
 * 1 满溢
 * 2 异常
 */
