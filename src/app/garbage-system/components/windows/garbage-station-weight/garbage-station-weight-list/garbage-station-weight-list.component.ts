import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { GarbageStationWeightTableArgs } from 'src/app/common/components/tables/garbage-station-weight-table/garbage-station-weight-table.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { IdNameModel } from 'src/app/network/model/model.interface';
import { GarbageStationWeightListDivisionBusiness } from './business/garbage-station-weight-list-division.business';
import { GarbageStationWeightListStationBusiness } from './business/garbage-station-weight-list-station.business';
import { GarbageStationWeightListBusiness } from './garbage-station-weight-list.business';
import {
  GarbageStationWeightListDateArgs,
  GarbageStationWeightListSelected,
} from './garbage-station-weight-list.model';
import { GarbageStationWeightListService } from './garbage-station-weight-list.service';
import { GarbageStationWeightListDivisionService } from './service/garbage-station-weight-list-division.service';

@Component({
  selector: 'garbage-station-weight-list',
  templateUrl: './garbage-station-weight-list.component.html',
  styleUrls: ['./garbage-station-weight-list.component.less'],
  providers: [
    GarbageStationWeightListDivisionService,
    GarbageStationWeightListService,
    GarbageStationWeightListDivisionBusiness,
    GarbageStationWeightListStationBusiness,
    GarbageStationWeightListBusiness,
  ],
})
export class GarbageStationWeightListComponent
  implements OnInit, AfterViewInit
{
  constructor(
    private business: GarbageStationWeightListBusiness,
    public global: GlobalStorageService
  ) {
    this.selected.typeChange.subscribe((x) => {
      this.args.type = EnumHelper.ConvertUserResourceToDivision(x);
    });
    this.selected.child = EnumHelper.GetResourceChildType(this.resourceType);
    this.selected.type = this.selected.child;
  }

  get resourceType() {
    return EnumHelper.ConvertDivisionToUserResource(this.global.divisionType);
  }

  args: GarbageStationWeightTableArgs = new GarbageStationWeightTableArgs();
  load = new EventEmitter<GarbageStationWeightTableArgs>();
  DateTimePickerView = DateTimePickerView;
  TimeUnit = TimeUnit;
  Language = Language;
  UserResourceType = UserResourceType;
  dateArgs = new GarbageStationWeightListDateArgs();
  source: IdNameModel[] = [];
  excel: EventEmitter<string> = new EventEmitter();
  csv: EventEmitter<string> = new EventEmitter();

  selected: GarbageStationWeightListSelected =
    new GarbageStationWeightListSelected();

  ngOnInit(): void {
    this.loadsource(this.resourceType);
  }

  ngAfterViewInit(): void {
    this.loadData(this.global.divisionId);
  }

  loadsource(type: UserResourceType) {
    this.business.list(type).then((x) => {
      this.source = x;
    });
  }

  loadData(divisionId?: string) {
    this.args.divisionId = divisionId;
    this.load.emit(this.args);
  }

  onchange() {
    switch (this.args.unit) {
      case TimeUnit.Month:
        this.dateArgs.format = 'yyyy年MM月';
        this.dateArgs.view = DateTimePickerView.year;
        this.dateArgs.isweek = false;
        break;
      case TimeUnit.Week:
        this.dateArgs.format = 'yyyy年MM月dd日';
        this.dateArgs.view = DateTimePickerView.month;
        this.dateArgs.isweek = true;
        break;
      case TimeUnit.Year:
        this.dateArgs.format = 'yyyy年';
        this.dateArgs.view = DateTimePickerView.year;
        this.dateArgs.isweek = false;
        break;
      case TimeUnit.Day:
        this.dateArgs.format = 'yyyy年MM月dd日';
        this.dateArgs.view = DateTimePickerView.month;
        this.dateArgs.isweek = false;
        break;
      default:
        break;
    }
    this.load.emit(this.args);
  }

  onsearch() {
    this.load.emit(this.args);
  }

  ontreeselected(item: IdNameModel) {
    this.loadData(item.Id);
  }
  onroot() {
    this.loadData();
  }
  onfilter() {
    this.args.divisionId = undefined;
    if (this.selected.division) {
      this.args.divisionId = this.selected.division.Id;
    }
  }
  onexcel() {
    this.excel.emit('垃圾称重');
  }
  oncsv() {
    this.csv.emit('垃圾称重');
  }
}
