import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EncodeDeviceManageModel } from 'src/app/aiop-system/components/encode-device-manage/encode-device-manage.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { IIdNameModel } from 'src/app/network/model/model.interface';
import { Page } from 'src/app/network/model/page_list.model';
import {
  TableCellEvent,
  TableColumnModel,
  TableOperateModel,
} from 'src/app/view-model/table.model';

export class EncodeDeviceManageTableConfig {
  constructor() {
    this.operates.push(
      new TableOperateModel(
        'edit',
        ['howell-icon-modification'],
        '编辑',
        (e: EncodeDeviceManageModel) => {
          this.edit.emit(e);
        }
      )
    );
    this.page.PageIndex = 1;
    this.page.PageSize = 9;
  }
  columns: TableColumnModel[] = [
    {
      columnDef: 'Name',
      header: '名称',
      cell: (element: EncodeDeviceManageModel) => `${element.Name}`,
      flexBasis: '8%',
    },
    {
      columnDef: 'IPAddress',
      header: '地址',
      cell: (element: EncodeDeviceManageModel) => `${element.IPAddress}`,
      flexBasis: '20%',
    },
    {
      columnDef: 'ProtocolType',
      header: '协议类型',
      cell: (element: EncodeDeviceManageModel) => `${element.ProtocolType}`,
    },
    {
      columnDef: 'OnlineStatus',
      header: '状态',
      cell: (element: EncodeDeviceManageModel) => `${element.OnlineStatus}`,
    },

    {
      columnDef: 'DeviceType',
      header: '设备类型',
      cell: (element: EncodeDeviceManageModel) => `${element.DeviceType}`,
    },
    {
      columnDef: 'Labels',
      header: '标签',
      cell: (element: EncodeDeviceManageModel) =>
        `【${element.Labels.length}】`,
      stopPropogate: true,
      title: '点击以管理标签',
    },
  ];
  ids = this.columns.map((x) => x.columnDef);
  operates: TableOperateModel[] = [];
  selectStrategy = SelectStrategy.Multiple;
  edit: EventEmitter<EncodeDeviceManageModel> = new EventEmitter();
  dataSubject = new BehaviorSubject<EncodeDeviceManageModel[]>([]);

  selected: EncodeDeviceManageModel[] = [];
  page = new Page();
  pagerCount = 4;

  delete: EventEmitter<EncodeDeviceManageModel[]> = new EventEmitter();
  select: EventEmitter<TableSelectType> = new EventEmitter();
  labelclick: EventEmitter<IIdNameModel> = new EventEmitter();
  onselect(rows: EncodeDeviceManageModel[]) {
    this.selected = rows;
  }
  onclick(e: TableCellEvent<EncodeDeviceManageModel>) {
    if (e.column.columnDef == 'Labels') {
      this.labelclick.emit({
        Id: e.row.Id,
        Name: e.row.Name,
      });
    }
  }
}
