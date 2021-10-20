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
  id: string = '';
  name: string = '';
  statistic: string = '';
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
