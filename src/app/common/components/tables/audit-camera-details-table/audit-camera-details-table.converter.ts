import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Flags } from 'src/app/common/tools/flags';
import { Language } from 'src/app/common/tools/language';
import { CameraModelConverter } from 'src/app/converter/view-models/camera.model.converter';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { CameraModel } from 'src/app/view-model/camera-model';
import {
  AuditCameraDetailsTableItem,
  AuditCameraDetailsTableConfig as TableConfig,
  AuditCameraDetailsTableItemData as TableItemData,
} from './audit-camera-details-table.model';

@Injectable()
export class AuditCameraDetailsTableConverter {
  constructor(private converter: CameraModelConverter) {}

  private dataConverter = new TableItemDataConverter();

  convert(data: Camera, config: TableConfig): AuditCameraDetailsTableItem {
    let model = this.converter.Convert(data, AuditCameraDetailsTableItem);

    let flags = new Flags(data.CameraUsage);
    model.Usages = flags.getValues();
    for (let key in config) {
      if (this.dataConverter[key]) {
        model.Datas[key] = this.dataConverter[key](model);
      } else {
        console.warn(`${key} not found in dataConverter`);
      }
    }
    return model;
  }
}

class TableItemDataConverter {
  [key: keyof TableConfig]: (data: CameraModel) => TableItemData;
  CameraUsage(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.CameraUsage) {
        let flags = new Flags(data.CameraUsage);
        let views = flags
          .getValues()
          .map((value) => Language.CameraUsage(value))
          .join('/');
        resolve(views);
      } else {
        resolve('-');
      }
    });

    let item = new TableItemData('CameraUsage', text);
    return item;
  }
  CreateTime(data: CameraModel): TableItemData {
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
  UpdateTime(data: CameraModel): TableItemData {
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
  GarbageStation(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      data.GarbageStation.then((station) => {
        resolve(station.Name);
      });
    });
    let item = new TableItemData('GarbageStation', text);
    return item;
  }
  PositionNo(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.PositionNo) {
        resolve(
          `${data.PositionNo}(${Language.CameraPosition(data.PositionNo)})`
        );
      } else {
        resolve('-');
      }
    });
    let item = new TableItemData('PositionNo', text);
    return item;
  }
  GarbageFullTime(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.IsFull && data.GarbageFullTime) {
        resolve(formatDate(data.UpdateTime, Language.yyyyMMddHHmmss, 'en'));
      } else {
        resolve('-');
      }
    });
    let item = new TableItemData('GarbageFullTime', text);
    return item;
  }
  IsFull(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.IsFull === undefined) {
        resolve('-');
      } else {
        resolve(`${data.IsFull ? '已' : '未'}满溢`);
      }
    });
    let item = new TableItemData('IsFull', text);
    if (data.IsFull != undefined) {
      item.color = data.IsFull ? 'yellow-text' : 'green-text';
    } else {
      item.color = 'gray-text';
    }

    return item;
  }
  OnlineStatus(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.OnlineStatus === undefined) {
        resolve('-');
      } else {
        resolve(Language.OnlineStatus(data.OnlineStatus));
      }
    });

    let item = new TableItemData('OnlineStatus', text);
    let color = ColorTool.OnlineState(data.OnlineStatus);
    if (color) {
      item.color = color;
    } else {
      item.color = 'gray-text';
    }
    return item;
  }
  SceneChange(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.SceneChange === undefined) {
        resolve('-');
      } else {
        resolve(Language.SceneChange(data.SceneChange));
      }
    });
    let item = new TableItemData('SceneChange', text);
    let color = ColorTool.SceneChange(data.SceneChange);
    if (color) {
      item.color = color;
    } else {
      item.color = 'gray-text';
    }
    return item;
  }
  ImageQuality(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.ImageQuality === undefined) {
        resolve('-');
      } else {
        resolve(Language.ImageQuality(data.ImageQuality));
      }
    });
    let item = new TableItemData('ImageQuality', text);
    let color = ColorTool.ImageQuality(data.ImageQuality);
    if (color) {
      item.color = color;
    } else {
      item.color = 'gray-text';
    }
    return item;
  }
  Brightness(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.Brightness === undefined) {
        resolve('-');
      } else {
        resolve(Language.Brightness(data.Brightness));
      }
    });
    let item = new TableItemData('Brightness', text);
    let color = ColorTool.Brightness(data.Brightness);
    if (color) {
      item.color = color;
    } else {
      item.color = 'gray-text';
    }
    return item;
  }
  Aberration(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.Aberration === undefined) {
        resolve('-');
      } else {
        resolve(Language.Aberration(data.Aberration));
      }
    });
    let item = new TableItemData('Aberration', text);
    let color = ColorTool.Aberration(data.Aberration);
    if (color) {
      item.color = color;
    } else {
      item.color = 'gray-text';
    }
    return item;
  }
  Disturbance(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.Disturbance === undefined) {
        resolve('-');
      } else {
        resolve(Language.Disturbance(data.Disturbance));
      }
    });
    let item = new TableItemData('Disturbance', text);
    let color = ColorTool.Disturbance(data.Disturbance);
    if (color) {
      item.color = color;
    } else {
      item.color = 'gray-text';
    }
    return item;
  }
  CameraType(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.CameraType) {
        resolve(data.CameraType);
      } else {
        resolve('-');
      }
    });
    let item = new TableItemData('CameraType', text);
    return item;
  }
  Classification(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.Classification === undefined) {
        resolve('-');
      } else {
        resolve(Language.CameraClassification(data.Classification));
      }
    });
    let item = new TableItemData('Classification', text);
    return item;
  }
  RecordState(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.RecordState === undefined) {
        resolve('-');
      } else {
        resolve(Language.RecordState(data.RecordState));
      }
    });
    let item = new TableItemData('RecordState', text);
    let color = ColorTool.RecordState(data.RecordState);
    if (color) {
      item.color = color;
    } else {
      item.color = 'gray-text';
    }
    return item;
  }
  AbnormalTime(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (data.AbnormalTime === undefined) {
        resolve('-');
      } else {
        resolve(formatDate(data.AbnormalTime, Language.yyyyMMddHHmmss, 'en'));
      }
    });
    let item = new TableItemData('AbnormalTime', text);
    return item;
  }
  OfflineTime(data: CameraModel): TableItemData {
    let text = new Promise<string>((resolve) => {
      if (
        data.OnlineStatus &&
        data.OnlineStatus == OnlineStatus.Offline &&
        data.OfflineTime
      ) {
        resolve(formatDate(data.OfflineTime, Language.yyyyMMddHHmmss, 'en'));
      } else {
        resolve('-');
      }
    });
    let item = new TableItemData('OfflineTime', text);
    return item;
  }
}
