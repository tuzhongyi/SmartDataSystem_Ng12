import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Language } from 'src/app/common/tools/language';
import { IModel, IndexArgs } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../table-abstract.component';
import { DaPuQiaoGarbageDropRecordTableBusiness } from './dapuqiao-garbage-drop-record-table.business';
import {
  DapuqiaoGarbageDropRecordTableArgs,
  GarbageDropEventRecordModel,
} from './dapuqiao-garbage-drop-record-table.model';
import { DaPuQiaoGarbageDropRecordTableService } from './dapuqiao-garbage-drop-record-table.service';

@Component({
  selector: 'dapuqiao-garbage-drop-record-table',
  templateUrl: './dapuqiao-garbage-drop-record-table.component.html',
  styleUrls: [
    '../../table-sticky.less',
    './dapuqiao-garbage-drop-record-table.component.less',
  ],
  providers: [
    DaPuQiaoGarbageDropRecordTableService,
    DaPuQiaoGarbageDropRecordTableBusiness,
  ],
})
export class DapuqiaoGarbageDropRecordTableComponent
  extends PagedTableAbstractComponent<GarbageDropEventRecordModel>
  implements OnInit, IComponent<IModel, PagedList<GarbageDropEventRecordModel>>
{
  @Input() business: IBusiness<IModel, PagedList<GarbageDropEventRecordModel>>;
  @Input() args = new DapuqiaoGarbageDropRecordTableArgs();
  @Input() load?: EventEmitter<DapuqiaoGarbageDropRecordTableArgs>;
  widths = [];

  @Output() process: EventEmitter<GarbageDropEventRecordModel> =
    new EventEmitter();
  @Output() image: EventEmitter<IndexArgs> = new EventEmitter();
  @Output() details: EventEmitter<GarbageDropEventRecordModel> =
    new EventEmitter();
  @Output() picture: EventEmitter<GarbageDropEventRecordModel> =
    new EventEmitter();

  constructor(business: DaPuQiaoGarbageDropRecordTableBusiness) {
    super();
    this.business = business;
    this.pageSize = 9;
  }

  Language = Language;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(1);
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

  onimage(item: GarbageDropEventRecordModel, index: number) {
    this.image.emit({ model: item, index: index });
  }
  ondetails(item: GarbageDropEventRecordModel) {
    this.details.emit(item);
  }
  onprocess(item: GarbageDropEventRecordModel) {
    this.process.emit(item);
  }
  onpicture(item: GarbageDropEventRecordModel) {
    this.picture.emit(item);
  }
}
