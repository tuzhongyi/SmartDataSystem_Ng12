import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Flags } from 'src/app/common/tools/flags';
import { Language } from 'src/app/common/tools/language';
import { isEmpty } from 'src/app/common/tools/tool';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';
import {
  AuditGarbageStationDetailsTableItem,
  AuditGarbageStationDetailsTableOperationConfig,
  AuditGarbageStationDetailsTableConfig as TableConfig,
  AuditGarbageStationDetailsTableItemData as TableItemData,
} from './audit-garbage-station-details-table.model';

@Injectable()
export class AuditGarbageStationDetailsTableConverter {
  constructor(private converter: GarbageStationModelConverter) {}

  private dataConverter = new TableItemDataConverter();

  convert(
    data: GarbageStation,
    config: TableConfig
  ): AuditGarbageStationDetailsTableItem {
    let model = this.converter.Convert(
      data,
      AuditGarbageStationDetailsTableItem
    );

    let flags = new Flags(model.StationState);
    model.States = flags.getValues();
    if (!model.States || model.States.length == 0) {
      model.States = [0];
    }
    for (let key in config) {
      let _item = config[key];
      if (this.dataConverter[key]) {
        model.Datas[key] = this.dataConverter[key](model);
      } else {
        console.warn(`${key} not found in dataConverter`);
      }
    }

    model.Operation = this.operation(model);

    return model;
  }

  operation(data: GarbageStationModel) {
    let config = new AuditGarbageStationDetailsTableOperationConfig();
    config.device.enabled = false;
    config.construction.show = false;

    if (
      !isEmpty(data.GarbageDeviceData) ||
      !isEmpty(data.ConstructionData) ||
      !isEmpty(data.NBState)
    ) {
      config.device.enabled = true;
    }

    if (isEmpty(data.GarbageDeviceData) && isEmpty(data.NBState)) {
      config.command.enabled = false;
    }

    if (isEmpty(data.GarbageDeviceData)) {
      config.schedule.enabled = false;
    }

    return config;
  }
}

class TableItemDataConverter {
  [key: keyof TableConfig]: (data: GarbageStationModel) => TableItemData;
  Community(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      resolve(data.CommunityName ?? '-');
    });
    let item = new TableItemData('Community', text);
    return item;
  }
  Committees(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.Division) {
        data.Division.then((division) => {
          resolve(division.Name);
        });
      }
    });
    let item = new TableItemData('Committees', text);
    return item;
  }
  County(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.Division) {
        data.Division.then((division) => {
          if (division.Parent) {
            division.Parent.then((parent) => {
              resolve(parent.Name);
            });
          }
        });
      }
    });

    let item = new TableItemData('County', text);
    return item;
  }
  StationType(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      resolve(Language.StationType(data.StationType));
    });

    let item = new TableItemData('StationType', text);
    return item;
  }
  Address(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      resolve(data.Address ?? '-');
    });

    let item = new TableItemData('Address', text);
    return item;
  }
  StationState(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      let flags = new Flags(data.StationState);
      let states = flags.getValues().map((x) => {
        return Language.StationState(x);
      });

      resolve(states.join('/'));
    });

    let item = new TableItemData('StationState', text);
    return item;
  }
  DropWindows(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      resolve(`【${data.DropWindows ? data.DropWindows.length : 0}】`);
    });

    let item = new TableItemData('DropWindows', text);
    return item;
  }
  Cameras(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      resolve(`【${data.Cameras ? data.Cameras.length : 0}】`);
    });

    let item = new TableItemData('Cameras', text);
    return item;
  }
  TrashCans(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      resolve(`【${data.TrashCans ? data.TrashCans.length : 0}】`);
    });

    let item = new TableItemData('TrashCans', text);
    return item;
  }
  Members(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      resolve(`【${data.Members ? data.Members.length : 0}】`);
    });

    let item = new TableItemData('Members', text);
    return item;
  }
  IMEI(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      resolve(data.IMEI ?? '-');
    });

    let item = new TableItemData('IMEI', text);
    return item;
  }
  NBState(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      resolve(Language.NBState(data.NBState));
    });

    let item = new TableItemData('NBState', text);
    if (isEmpty(data.NBState)) {
      item.class = 'gray-text';
    } else {
      item.class = `td-icon ${
        data.NBState == 0 ? 'green-text' : 'powder-red-text'
      }`;
      item.event = new EventEmitter<GarbageStation>();
    }

    return item;
  }
  NBHeartbeatTime(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.NBHeartbeatTime) {
        resolve(
          formatDate(data.NBHeartbeatTime, Language.yyyyMMddHHmmss, 'en')
        );
      } else {
        resolve('-');
      }
    });

    let item = new TableItemData('NBHeartbeatTime', text);
    return item;
  }
  CreateTime(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.CreateTime) {
        resolve(formatDate(data.CreateTime, Language.yyyyMMddHHmmss, 'en'));
      } else {
        resolve('-');
      }
    });

    let item = new TableItemData('CreateTime', text);
    return item;
  }
  UpdateTime(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.UpdateTime) {
        resolve(formatDate(data.UpdateTime, Language.yyyyMMddHHmmss, 'en'));
      } else {
        resolve('-');
      }
    });

    let item = new TableItemData('UpdateTime', text);
    return item;
  }
  Device(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (isEmpty(data.GarbageDeviceData?.OnlineState)) {
        resolve('-');
      } else {
        resolve(Language.OnlineStatus(data.GarbageDeviceData?.OnlineState));
      }
    });

    let item = new TableItemData('Device', text);
    if (isEmpty(data.GarbageDeviceData?.OnlineState)) {
      item.class = 'gray-text';
    } else {
      item.class = `td-icon ${ColorTool.OnlineState(
        data.GarbageDeviceData?.OnlineState
      )}`;
      item.event = new EventEmitter<GarbageStation>();
    }
    return item;
  }
  GCHA(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (isEmpty(data.GarbageDeviceData?.GCHAStatus?.OnlineState)) {
        resolve('-');
      } else {
        resolve(
          Language.OnlineStatus(data.GarbageDeviceData?.GCHAStatus?.OnlineState)
        );
      }
    });
    let item = new TableItemData('GCHA', text);
    if (isEmpty(data.GarbageDeviceData?.GCHAStatus?.OnlineState)) {
      item.class = 'gray-text';
    } else {
      item.class = `td-icon ${ColorTool.OnlineState(
        data.GarbageDeviceData?.GCHAStatus?.OnlineState
      )}`;
      item.event = new EventEmitter<GarbageStation>();
    }
    return item;
  }
  CountSchedule(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.CountSchedule && data.CountSchedule.length > 0) {
        let first = data.CountSchedule[0];

        resolve(
          `${Language.Time(first.BeginTime)} - ${Language.Time(first.EndTime)}`
        );
      } else {
        resolve('-');
      }
    });

    let item = new TableItemData('CountSchedule', text);
    return item;
  }

  ChipTemperature(data: GarbageStationModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (
        data.GarbageDeviceData &&
        Number.isFinite(data.GarbageDeviceData.ChipTemperature)
      ) {
        resolve(`${data.GarbageDeviceData.ChipTemperature}℃`);
      } else {
        resolve('-');
      }
    });

    let item = new TableItemData('ChipTemperature', text);
    return item;
  }

  DumpPointType(data: GarbageStationModel) {
    let text = new Promise<string>((resolve) => {
      if (data.DumpPointType) {
        resolve(Language.DumpPointType(data.DumpPointType));
      } else {
        resolve('-');
      }
    });

    let item = new TableItemData('DumpPointType', text);
    return item;
  }
  DisableEventTypes(data: GarbageStationModel) {
    let text = new Promise<string>((resolve) => {
      resolve(
        `【${data.DisableEventTypes ? data.DisableEventTypes.length : 0}】`
      );
    });

    let item = new TableItemData('DisableEventTypes', text);
    return item;
  }
}
