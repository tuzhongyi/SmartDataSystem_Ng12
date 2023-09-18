import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { ExportType } from 'src/app/enum/export-type.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { DaPuQiaoGarbageDropStationCountTableBusiness } from './dapuqiao-garbage-drop-station-count-table.business';
import { DaPuQiaoGarbageDropStationCountTableDownload } from './dapuqiao-garbage-drop-station-count-table.download';
import {
  DaPuQiaoGarbageDropStationCountTableArgs,
  NumberStatisticModel,
} from './dapuqiao-garbage-drop-station-count-table.model';
import { DaPuQiaoGarbageDropStationCountTableService } from './dapuqiao-garbage-drop-station-count-table.service';

@Component({
  selector: 'dapuqiao-garbage-drop-station-count-table',
  templateUrl: './dapuqiao-garbage-drop-station-count-table.component.html',
  styleUrls: [
    '../../table-overflow.less',
    './dapuqiao-garbage-drop-station-count-table.component.less',
  ],
  providers: [
    DaPuQiaoGarbageDropStationCountTableService,
    DaPuQiaoGarbageDropStationCountTableBusiness,
    DaPuQiaoGarbageDropStationCountTableDownload,
  ],
})
export class DaPuQiaoGarbageDropStationCountTableComponent
  implements IComponent<IModel, NumberStatisticModel[]>, OnInit
{
  @Input() business: DaPuQiaoGarbageDropStationCountTableBusiness;
  @Input() args: DaPuQiaoGarbageDropStationCountTableArgs =
    new DaPuQiaoGarbageDropStationCountTableArgs();
  @Input() load?: EventEmitter<DaPuQiaoGarbageDropStationCountTableArgs>;
  @Input() download?: EventEmitter<ExportType>;
  constructor(business: DaPuQiaoGarbageDropStationCountTableBusiness) {
    this.business = business;
  }
  widths = [
    undefined,
    '180px',
    '150px',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  datas: NumberStatisticModel[] = [];
  loading = false;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData();
      });
    }
    if (this.download) {
      this.download.subscribe((x) => {
        this.business.download.download(x, this.args, this.datas);
      });
    }
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.business.load(this.args).then((x) => {
      this.datas = x;
      this.loading = false;
    });
  }
}
