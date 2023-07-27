import { Member } from 'src/app/network/model/member.model';
import { IModel } from 'src/app/network/model/model.interface';

export class PointInfoPanelModel<T = IModel> {
  data?: T;
  id: string = '';
  name: string = '';
  address: string = '';
  members?: Member[];
  committeeName?: Promise<string>;
  roadName?: Promise<string>;
  GarbageStationGrade?: Promise<string>;
  statistic?: Promise<PointInfoPanelModelStatistic>;
  state: PointInfoPanelModelState[] = [];
  powerTime?: Date;
  signal?: number;
  heartbeatTime?: Date;
  powerOn?: boolean;
  options: PointInfoPanelModelOption<T>[] = [];
}

export interface PointInfoPanelModelStatistic {
  GarbageStationGrade: string;
  GarbageInterval: string;
  GarbageCount: number;
  IllegalDropCount: number;
  MixedIntoCount: number;
}

export interface PointInfoPanelModelState {
  language: string;
  className: string;
}
export interface PointInfoPanelModelOption<T = any>
  extends PointInfoPanelModelState {
  command: string;
  title: string;
  data: T;
}
