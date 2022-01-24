import { EventType } from '../enum/event-type.enum';
import { UserResourceType } from '../enum/user-resource-type.enum';

export type DropListModel = {
  id: number;
  name: string;
};

export type DropListObj = {
  status: boolean; // 关闭/打开
  data: Array<DropListModel>; // 下拉内容
  index: number; //selectedIndex
  type: RankDropListType;
};

// 排行榜视图数据
export class RankModel {
  constructor(type?: EventType) {
    this.type = type;
  }
  id: string = '';
  name: string = '';
  statistic: string = '';
  type?: EventType;
  value: number = 0;
  unit?: string = '';
}

export interface RankEventModel {
  data: DropListModel;
  type: RankDropListType;
}

export enum RankDropListType {
  EventType = 0,
  UserResourceType = 1,
  RetentionType = 2,
}

export enum RankResourceType {
  Committees = UserResourceType.Committees,
  County = UserResourceType.County,
  Station = UserResourceType.Station,
}
export enum RankEventType {
  IllegalDrop = EventType.IllegalDrop,
  MixedInto = EventType.MixedInto,
}
