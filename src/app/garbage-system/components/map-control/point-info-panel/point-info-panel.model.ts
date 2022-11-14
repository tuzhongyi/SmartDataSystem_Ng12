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
  state?: PointInfoPanelModelState;
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
