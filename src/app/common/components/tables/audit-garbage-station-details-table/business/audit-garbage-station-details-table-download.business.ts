import { Injectable } from '@angular/core';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { ExportTool } from 'src/app/common/tools/export.tool';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';
import { Language } from 'src/app/common/tools/language';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import {
  AuditGarbageStationDetailsTableConfig,
  AuditGarbageStationDetailsTableConfigLanguage,
  AuditGarbageStationDetailsTableItem,
} from '../audit-garbage-station-details-table.model';

@Injectable()
export class AuditGarbageStationDetailsTableDownloadBusiness {
  constructor(private service: ExportTool) {}

  download(
    title: string,
    datas: AuditGarbageStationDetailsTableItem[],
    config: AuditGarbageStationDetailsTableConfig
  ) {
    let heads = this.heads(config);
    this.service.excel(title, heads, datas, new Converter(), config);
  }

  heads(config: AuditGarbageStationDetailsTableConfig) {
    let items: {
      key: string;
      enabled: boolean;
      index: number;
    }[] = [];
    for (const key in config) {
      items.push({ key, ...config[key] });
    }
    items = items
      .filter((x) => x.enabled)
      .sort((a, b) => LocaleCompare.compare(a.index, b.index));
    let heads = items.map((x) => {
      return AuditGarbageStationDetailsTableConfigLanguage[x.key];
    });
    return ['投放点名称', ...heads];
  }
}

class Converter
  implements IExportConverter<AuditGarbageStationDetailsTableItem[]>
{
  async Convert(
    source: AuditGarbageStationDetailsTableItem<GarbageStation>[],
    config: AuditGarbageStationDetailsTableConfig
  ): Promise<HowellExportModel> {
    let model = new HowellExportModel();

    model.rowValues = [];

    for (let i = 0; i < source.length; i++) {
      const element = source[i];
      let values = await this.columns(element, config);
      model.rowValues.push(values);
    }

    return model;
  }

  private async columns(
    source: AuditGarbageStationDetailsTableItem<GarbageStation>,
    config: AuditGarbageStationDetailsTableConfig
  ): Promise<string[]> {
    let items: {
      key: string;
      enabled: boolean;
      index: number;
    }[] = [];
    for (const key in config) {
      items.push({ key, ...config[key] });
    }
    items = items
      .filter((x) => x.enabled)
      .sort((a, b) => LocaleCompare.compare(a.index, b.index));

    let columns = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let data = source.Datas[item.key];
      switch (item.key) {
        case 'DropWindows':
          columns.push(this.DropWindows(source));
          break;
        case 'Cameras':
          columns.push(this.Cameras(source));
          break;
        case 'TrashCans':
          columns.push(this.TrashCans(source));
          break;
        case 'Members':
          columns.push(this.Members(source));
          break;
        case 'DisableEventTypes':
          columns.push(this.DisableEventTypes(source));
          break;
        default:
          columns.push(`${await data.text}`);
          break;
      }
    }
    return [source.Name, ...columns];
  }
  DropWindows(source: AuditGarbageStationDetailsTableItem<GarbageStation>) {
    if (source.DropWindows && source.DropWindows.length > 0) {
      let items = source.DropWindows.map((x) => {
        let values = [
          Language.DropWindowType(x.DropType),
          x.GarbageFull ? '满溢' : '未满',
          Language.DropWindowState(x.WindowState),
        ];
        return values.join('|');
      });
      return items.join('\n');
    }
    return '-';
  }
  Cameras(source: AuditGarbageStationDetailsTableItem<GarbageStation>) {
    if (source.Cameras && source.Cameras.length > 0) {
      let items = source.Cameras.map((x) => {
        let values = [
          x.Name,
          x.CameraType,
          Language.CameraClassification(x.Classification),
          Language.CameraUsageList(x.CameraUsage),
          `${x.PositionNo}(${Language.CameraPosition(x.PositionNo)})`,
          Language.OnlineStatus(x.OnlineStatus),
          `场景变换：${Language.SceneChange(x.SceneChange)}`,
          `清晰度：${Language.ImageQuality(x.ImageQuality)}`,
          `视频亮度：${Language.Brightness(x.Brightness)}`,
          `色差/偏色：${Language.Aberration(x.Aberration)}`,
          `视频干扰：${Language.Disturbance(x.Disturbance)}`,
        ].filter((x) => !!x);
        return values.join('|');
      });
      return items.join('\n');
    }
    return '-';
  }
  TrashCans(source: AuditGarbageStationDetailsTableItem<GarbageStation>) {
    if (source.TrashCans && source.TrashCans.length > 0) {
      let items = source.TrashCans.map((x) => {
        let value = ((x.CurrentVolume ?? 0) / x.MaxVolume) * 100;
        return `${Language.TrashCanType(x.CanType)}:${value.toFixed(2)}%`;
      });
      return items.join('\n');
    }
    return '-';
  }
  Members(source: AuditGarbageStationDetailsTableItem<GarbageStation>) {
    if (source.Members && source.Members.length > 0) {
      let items = source.Members.map((x) => {
        return `${x.Name}：${x.MobileNo}`;
      });
      return items.join('\n');
    }
    return '-';
  }
  DisableEventTypes(
    source: AuditGarbageStationDetailsTableItem<GarbageStation>
  ) {
    if (source.DisableEventTypes && source.DisableEventTypes.length > 0) {
      let items = source.DisableEventTypes.map((x) => {
        return Language.EventType(x);
      });
      return items.join('\n');
    }
    return '-';
  }
}
