export type DropListModel = {
  id: string;
  name: string;
};

export type DropListObj = {
  status: boolean; // 关闭/打开
  data: Array<DropListModel>; // 下拉内容
  index: number; //selectedIndex
};

// 排行榜视图数据
export class RankModel {
  id: string = '';
  name: string = '';
  statistic: string = '';
  unit?: string = '';
}
