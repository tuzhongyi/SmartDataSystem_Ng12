import { Injectable } from '@angular/core';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { ExportTool } from 'src/app/common/tools/export.tool';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import {
  AuditCameraDetailsTableConfig,
  AuditCameraDetailsTableConfigLanguage,
  AuditCameraDetailsTableItem,
} from '../audit-camera-details-table.model';

@Injectable()
export class AuditCameraDetailsTableDownloadBusiness {
  constructor(private service: ExportTool) {}

  download(
    title: string,
    datas: AuditCameraDetailsTableItem[],
    config: AuditCameraDetailsTableConfig
  ) {
    let heads = this.heads(config);
    this.service.excel(title, heads, datas, new Converter(), config);
  }

  heads(config: AuditCameraDetailsTableConfig) {
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
      return AuditCameraDetailsTableConfigLanguage[x.key];
    });
    return ['摄像机名称', ...heads];
  }
}

class Converter implements IExportConverter<AuditCameraDetailsTableItem[]> {
  async Convert(
    source: AuditCameraDetailsTableItem[],
    config: AuditCameraDetailsTableConfig
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
    source: AuditCameraDetailsTableItem,
    config: AuditCameraDetailsTableConfig
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

      columns.push(`${await data.text}`);
    }
    return [source.Name, ...columns];
  }
}
