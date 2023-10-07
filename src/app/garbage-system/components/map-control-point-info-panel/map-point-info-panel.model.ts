import { StationType } from 'src/app/enum/station-type.enum';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { ConstructionData } from 'src/app/network/model/construction-data';
import { Member } from 'src/app/network/model/member.model';
import { IModel } from 'src/app/network/model/model.interface';

export class MapPointInfoPanelModel<T = IModel> {
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
  largeWaste?: LargeWastePointInfoPanelModel;
  type: StationType = StationType.Garbage;
  location: string = '';
  device?: Promise<AIGarbageDevice>;
}

export class LargeWastePointInfoPanelModel extends ConstructionData {}

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
  command: PointInfoPanelModelOptionCommand;
  title: string;
  data: T;
}

export enum PointInfoPanelModelOptionCommand {
  device_window_power_on = 'DeviceWindowPowerOn',
  collection_power_on = 'CollectionPowerOn',
  collection_power_off = 'CollectionPowerOff',
}
