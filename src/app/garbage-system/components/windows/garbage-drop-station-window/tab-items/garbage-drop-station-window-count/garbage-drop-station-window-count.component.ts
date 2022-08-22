import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { ExportBusiness } from 'src/app/common/business/export.business';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { GarbageDropStationCountTableModel } from 'src/app/common/components/tables/garbage-drop-station-count-table/garbage-drop-station-count-table.model';
import {
  DateTimePickerConfig,
  DateTimePickerView,
} from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { ExportType } from 'src/app/enum/export-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Language } from 'src/app/common/tools/language';
import { GarbageDropStationWindowCountExportConverter } from './garbage-drop-station-window-count-export.converter';
import { GarbageDropStationWindowCountBusiness } from './garbage-drop-station-window-count.business';
import { GlobalStoreService } from 'src/app/common/service/global-store.service';
import { Division } from 'src/app/network/model/division.model';

@Component({
  selector: 'howell-garbage-drop-station-window-count',
  templateUrl: './garbage-drop-station-window-count.component.html',
  styleUrls: ['./garbage-drop-station-window-count.component.less'],
  providers: [
    GarbageDropStationWindowCountBusiness
  ]
})
export class GarbageDropStationWindowCountComponent implements OnInit {
  constructor(
    private local: LocalStorageService,
    private exports: ExportBusiness,
    private store: GlobalStoreService,
    private changeDetector: ChangeDetectorRef,
    private business: GarbageDropStationWindowCountBusiness
  ) { }

  UserResourceType = UserResourceType;
  DateTimePickerView = DateTimePickerView;
  dateTimePickerConfig: DateTimePickerConfig = new DateTimePickerConfig();
  TimeUnit = TimeUnit;
  units: SelectItem[] = [];
  unit: TimeUnit = TimeUnit.Day;
  date: Date = new Date();
  types: SelectItem[] = [];
  type: UserResourceType = UserResourceType.County;
  load: EventEmitter<void> = new EventEmitter();
  datas?: GarbageDropStationCountTableModel[];
  typeSelected?: SelectItem;

  counties: SelectItem[] = [];
  parentId: string = '';

  initUnits() {
    this.units.push(
      new SelectItem(TimeUnit.Hour.toString(), TimeUnit.Hour, '日报表')
    );
    this.units.push(
      new SelectItem(TimeUnit.Week.toString(), TimeUnit.Week, '周报表')
    );
    this.units.push(
      new SelectItem(TimeUnit.Month.toString(), TimeUnit.Month, '月报表')
    );
  }
  initUserResourceTypes() {
    if (this.local.user.Resources && this.local.user.Resources.length > 0) {
      if (this.local.user.Resources[0].ResourceType === UserResourceType.City) {
        this.types.push(
          new SelectItem(
            UserResourceType.County.toString(),
            UserResourceType.County,
            Language.UserResourceType(UserResourceType.County)
          )
        );
      }
    }
    this.types.push(
      new SelectItem(
        UserResourceType.Committees.toString(),
        UserResourceType.Committees,
        Language.UserResourceType(UserResourceType.Committees)
      )
    );

    this.types.push(
      new SelectItem(
        UserResourceType.Station.toString(),
        UserResourceType.Station,
        Language.UserResourceType(UserResourceType.Station)
      )
    );

  }

  async ngOnInit() {
    let { Data } = await this.business.getCommittees(this.store.divisionId)

    this.counties = Data.map(division => {
      return new SelectItem(division.Id, division.Id, division.Name)
    })
    this.counties.unshift(new SelectItem("", '', '全部'));
    this.initUnits();
    this.initUserResourceTypes();

    this.typeSelected = this.types[0];
  }
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ontimeunit(unit: SelectItem) {
    this.unit = unit.value;
    switch (this.unit) {
      case TimeUnit.Week:
        this.dateTimePickerConfig.view = DateTimePickerView.month;
        this.dateTimePickerConfig.format = 'yyyy-MM-dd';
        this.dateTimePickerConfig.week = true;
        break;
      case TimeUnit.Day:
        this.dateTimePickerConfig.view = DateTimePickerView.month;
        this.dateTimePickerConfig.format = 'yyyy-MM-dd';
        this.dateTimePickerConfig.week = false;
        break;
      case TimeUnit.Month:
        this.dateTimePickerConfig.view = DateTimePickerView.year;
        this.dateTimePickerConfig.format = 'yyyy-MM';
        this.dateTimePickerConfig.week = false;
        break;
      default:
        break;
    }
  }

  changeDate(date: Date) {
    this.date = date;
  }

  onTypeChange(item: SelectItem) {
    this.type = item.value;
    console.log(item)
    this.parentId = ''
  }

  onCountyChange(item: SelectItem) {
    this.parentId = item.value;
  }
  search() {
    this.load.emit();
  }

  loaded(datas: GarbageDropStationCountTableModel[]) {
    this.datas = datas;
  }

  converter = new GarbageDropStationWindowCountExportConverter();

  getTitle() {
    let title = formatDate(this.date, 'yyyy年MM月dd日', 'en');
    title += ' ' + Language.UserResourceType(this.type);
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
      '超时率',
    ];
    this.exports.export(type, title, headers, this.datas, this.converter);
  }

  exportExcel() {
    this.toExport(ExportType.excel);
  }
  exportCSV() {
    this.toExport(ExportType.csv);
  }
}
