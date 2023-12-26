import { StationType } from 'src/app/enum/station-type.enum';
import { ConstructionData } from 'src/app/network/model/garbage-station/construction-data';
import { GarbageDeviceData } from 'src/app/network/model/garbage-station/garbage-device-data.model';
import { Member } from 'src/app/network/model/garbage-station/member.model';
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
  device?: GarbageDeviceData;
  dryWeight = 0;
  wetWeight = 0;
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
