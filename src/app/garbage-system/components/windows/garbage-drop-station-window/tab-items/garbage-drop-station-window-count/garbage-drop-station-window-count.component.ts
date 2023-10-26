import { formatDate } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { ExportBusiness } from 'src/app/common/business/export.business';
import {
  GarbageDropStationCountTableArgs,
  GarbageDropStationCountTableModel,
} from 'src/app/common/components/tables/garbage-drop-station-count-table/garbage-drop-station-count-table.model';
import {
  DateTimePickerConfig,
  DateTimePickerView,
} from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Language } from 'src/app/common/tools/language';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { ExportType } from 'src/app/enum/export-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageDropStationWindowCountExportConverter } from './garbage-drop-station-window-count-export.converter';
import { GarbageDropStationWindowCountBusiness } from './garbage-drop-station-window-count.business';

@Component({
  selector: 'howell-garbage-drop-station-window-count',
  templateUrl: './garbage-drop-station-window-count.component.html',
  styleUrls: ['./garbage-drop-station-window-count.component.less'],
  providers: [GarbageDropStationWindowCountBusiness],
})
export class GarbageDropStationWindowCountComponent implements OnInit {
  constructor(
    private local: LocalStorageService,
    private exports: ExportBusiness,
    public store: GlobalStorageService,
    private changeDetector: ChangeDetectorRef,
    private business: GarbageDropStationWindowCountBusiness
  ) {}

  dateTimePickerConfig: DateTimePickerConfig = new DateTimePickerConfig();

  date: Date = new Date();

  args = new GarbageDropStationCountTableArgs();
  load: EventEmitter<GarbageDropStationCountTableArgs> = new EventEmitter();
  datas?: GarbageDropStationCountTableModel[];
  divisions: Division[] = [];
  parent?: Division;
  DateTimePickerView = DateTimePickerView;
  DivisionType = DivisionType;
  UserResourceType = UserResourceType;
  TimeUnit = TimeUnit;
  Language = Language;

  type = {
    default: DivisionType.None,
    parent: DivisionType.None,
  };

  async ngOnInit() {
    this.args.type = EnumHelper.GetDivisionChildType(
      this.store.defaultDivisionType
    );
    this.type.default = this.args.type;
    this.divisions = await this.business.getDivisionsByType(this.args.type);
    this.dateTimePickerConfig.format = 'yyyy年MM月dd日';
  }
  ontimeunit() {
    switch (this.args.unit) {
      case TimeUnit.Week:
        this.dateTimePickerConfig.view = DateTimePickerView.month;
        this.dateTimePickerConfig.format = 'yyyy年MM月dd日';
        this.dateTimePickerConfig.week = true;
        break;
      case TimeUnit.Month:
        this.dateTimePickerConfig.view = DateTimePickerView.year;
        this.dateTimePickerConfig.format = 'yyyy年MM月';
        this.dateTimePickerConfig.week = false;
        break;
      case TimeUnit.Hour:
      case TimeUnit.Day:
        this.dateTimePickerConfig.view = DateTimePickerView.month;
        this.dateTimePickerConfig.format = 'yyyy年MM月dd日';
        this.dateTimePickerConfig.week = false;
        break;
      default:
        break;
    }
  }

  async onTypeChange() {
    this.parent = undefined;
  }

  search() {
    this.args.parentId = undefined;
    if (this.parent) {
      this.args.parentId = this.parent.Id;
    }
    this.load.emit(this.args);
  }

  loaded(datas: GarbageDropStationCountTableModel[]) {
    this.datas = datas;
  }

  getTitle() {
    let title = formatDate(this.date, 'yyyy年MM月dd日', 'en');
    let type = EnumHelper.ConvertDivisionToUserResource(this.args.type);
    title += ' ' + Language.UserResourceType(type);
    title += ' 垃圾滞留总数据';
    return title;
  }

  toExport(type: ExportType) {
    if (!this.datas) return;
    let title = this.getTitle();
    let headers = [
      '序号',
      '名称',
      '行政区',
      '垃圾滞留',
      '垃圾滞留超时',
      '达标率',
    ];
    let converter = new GarbageDropStationWindowCountExportConverter();
    this.exports.export(type, title, headers, this.datas, converter);
  }

  exportExcel() {
    this.toExport(ExportType.excel);
  }
  exportCSV() {
    this.toExport(ExportType.csv);
  }
}
