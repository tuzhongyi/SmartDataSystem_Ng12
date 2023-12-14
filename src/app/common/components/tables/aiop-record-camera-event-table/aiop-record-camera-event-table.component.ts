import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { CameraAIEventRecord } from 'src/app/network/model/garbage-station/camera-ai-event-record.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AIOPRecordCameraEventTableBusiness } from './aiop-record-camera-event-table.business';
import {
  AIOPRecordCameraEventTableArgs,
  AIOPRecordCameraEventTableItem,
} from './aiop-record-camera-event-table.model';

@Component({
  selector: 'aiop-record-camera-event-table',
  templateUrl: './aiop-record-camera-event-table.component.html',
  styleUrls: [
    '../table.less',
    './aiop-record-camera-event-table.component.less',
  ],
  providers: [AIOPRecordCameraEventTableBusiness],
})
export class AIOPRecordCameraEventTableComponent
  extends PagedTableAbstractComponent<AIOPRecordCameraEventTableItem>
  implements OnInit
{
  @Input() load?: EventEmitter<AIOPRecordCameraEventTableArgs>;
  @Input() args: AIOPRecordCameraEventTableArgs =
    new AIOPRecordCameraEventTableArgs();
  @Input() business: IBusiness<
    IModel,
    PagedList<AIOPRecordCameraEventTableItem>
  >;
  @Output() video: EventEmitter<CameraAIEventRecord> = new EventEmitter();
  @Output() image: EventEmitter<CameraAIEventRecord> = new EventEmitter();

  constructor(business: AIOPRecordCameraEventTableBusiness) {
    super();
    this.business = business;
  }

  widths = [];
  selected?: CameraAIEventRecord;
  ngOnInit(): void {
    this.pageSize = 10;
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData(this.args.tofirst ? 1 : this.page.PageIndex);
      });
    }
    this.loadData(1);
  }

  loadData(index: number, size: number = this.pageSize): void {
    this.loading = true;
    this.business.load(index, size, this.args).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;
      this.loading = false;
    });
  }
  onvideo(e: Event, item: CameraAIEventRecord) {
    this.video.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
  onimage(e: Event, item: CameraAIEventRecord) {
    this.image.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
  onselect(item: CameraAIEventRecord) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }
}
