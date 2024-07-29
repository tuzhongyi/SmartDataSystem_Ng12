import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  DapuqiaoGarbageDropEventRecordModel,
  DapuqiaoGarbageDropRecordTableArgs,
} from 'src/app/common/components/tables/daqupiao/dapuqiao-garbage-drop-record-table/dapuqiao-garbage-drop-record-table.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IIdNameModel, PagedArgs } from 'src/app/network/model/model.interface';
import { DapuqiaoGarbageStationWindowRecordBusiness } from './dapuqiao-garbage-station-window-record.business';
import { DapuqiaoGarbageStationWindowRecordModel } from './dapuqiao-garbage-station-window-record.model';

@Component({
  selector: 'dapuqiao-garbage-station-window-record',
  templateUrl: './dapuqiao-garbage-station-window-record.component.html',
  styleUrls: ['./dapuqiao-garbage-station-window-record.component.less'],
  providers: [DapuqiaoGarbageStationWindowRecordBusiness],
})
export class DapuqiaoGarbageStationWindowRecordComponent implements OnInit {
  @Input() isFilter = true;
  @Input() level?: number;
  @Output() image: EventEmitter<
    PagedArgs<DapuqiaoGarbageDropEventRecordModel>
  > = new EventEmitter();
  @Output() details: EventEmitter<DapuqiaoGarbageDropEventRecordModel> =
    new EventEmitter();
  @Output() picture: EventEmitter<DapuqiaoGarbageDropEventRecordModel> =
    new EventEmitter();
  @Output() process: EventEmitter<DapuqiaoGarbageDropEventRecordModel> =
    new EventEmitter();

  constructor(private business: DapuqiaoGarbageStationWindowRecordBusiness) {}

  args = new DapuqiaoGarbageDropRecordTableArgs();
  load: EventEmitter<DapuqiaoGarbageDropRecordTableArgs> = new EventEmitter();
  model = new DapuqiaoGarbageStationWindowRecordModel();
  DateTimePickerView = DateTimePickerView;

  ngOnInit(): void {
    this.model.station.select.subscribe((x) => {
      this.args.stationId = x?.Id;
    });
    if (this.level !== undefined) {
      this.args.level = this.level;
    }
  }

  onsearch() {
    this.load.emit(this.args);
  }

  ondivision(item?: IIdNameModel) {
    this.args.divisionId = undefined;
    this.model.station.selected = undefined;
    this.model.station.datas = [];
    if (item) {
      this.args.divisionId = item.Id;
    }
    this.business.stations(this.args.divisionId).then((x) => {
      this.model.station.datas = x;
    });
  }

  ondetails(item: DapuqiaoGarbageDropEventRecordModel) {
    this.details.emit(item);
  }
  onimage(model: PagedArgs<DapuqiaoGarbageDropEventRecordModel>) {
    this.image.emit(model);
  }
  onpicture(item: DapuqiaoGarbageDropEventRecordModel) {
    this.picture.emit(item);
  }
  onprocess(item: DapuqiaoGarbageDropEventRecordModel) {
    this.process.emit(item);
  }
}
