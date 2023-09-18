import { Component, EventEmitter, OnInit } from '@angular/core';
import { DaPuQiaoGarbageDropStationCountTableArgs } from 'src/app/common/components/tables/daqupiao/dapuqiao-garbage-drop-station-count-table/dapuqiao-garbage-drop-station-count-table.model';
import {
  DateTimePickerConfig,
  DateTimePickerView,
} from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Language } from 'src/app/common/tools/language';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { ExportType } from 'src/app/enum/export-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { DapuqiaoGarbageDropStationWindowCountBusiness } from './dapuqiao-garbage-drop-station-window-count.business';

@Component({
  selector: 'dapuqiao-garbage-drop-station-window-count',
  templateUrl: './dapuqiao-garbage-drop-station-window-count.component.html',
  styleUrls: ['./dapuqiao-garbage-drop-station-window-count.component.less'],
  providers: [DapuqiaoGarbageDropStationWindowCountBusiness],
})
export class DapuqiaoGarbageDropStationWindowCountComponent implements OnInit {
  constructor(
    private business: DapuqiaoGarbageDropStationWindowCountBusiness,
    private local: LocalStorageService
  ) {}
  defaultType?: UserResourceType;
  dateTimePickerConfig: DateTimePickerConfig = new DateTimePickerConfig();
  args = new DaPuQiaoGarbageDropStationCountTableArgs();
  load: EventEmitter<DaPuQiaoGarbageDropStationCountTableArgs> =
    new EventEmitter();
  download: EventEmitter<ExportType> = new EventEmitter();
  TimeUnit = TimeUnit;
  Language = Language;
  ExportType = ExportType;
  UserResourceType = UserResourceType;
  datas: Division[] = [];
  parent?: Division;
  ngOnInit(): void {
    if (this.local.user.Resources && this.local.user.Resources.length > 0) {
      this.defaultType = this.local.user.Resources[0].ResourceType;
      this.args.type = EnumHelper.GetResourceChildType(this.defaultType);
    }
  }

  loadData(type: UserResourceType) {
    this.business.load(type).then((x) => {
      this.datas = x;
    });
  }
  search() {
    this.args.parentId = undefined;
    if (this.parent) {
      this.args.parentId = this.parent.Id;
    }
    this.load.emit(this.args);
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
  onTypeChange() {
    this.loadData(this.args.type);
  }

  ondownload(type: ExportType) {
    this.download.emit(type);
  }
}
