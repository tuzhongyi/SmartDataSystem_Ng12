import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import {
  AuditCameraDetailsTableArgs,
  AuditCameraDetailsTableConfig,
  AuditCameraDetailsTableConfigLanguage,
  AuditCameraDetailsTableItem,
  IAuditCameraDetailsTableArgs,
  IAuditCameraDetailsTableBusiness,
} from './audit-camera-details-table.model';
import { AuditCameraDetailsTableProviders } from './audit-camera-details-table.provider';
import { AuditCameraDetailsTableBusiness } from './business/audit-camera-details-table.business';

@Component({
  selector: 'audit-camera-details-table',
  templateUrl: './audit-camera-details-table.component.html',
  styleUrls: [
    '../table-sticky.less',
    './audit-camera-details-table.component.less',
  ],
  providers: [...AuditCameraDetailsTableProviders],
})
export class AuditCameraDetailsTableComponent
  extends PagedTableAbstractComponent<AuditCameraDetailsTableItem>
  implements OnInit
{
  @Input() business: IAuditCameraDetailsTableBusiness;
  @Input() pageSize: number = 10;
  @Input() args: IAuditCameraDetailsTableArgs =
    new AuditCameraDetailsTableArgs();
  @Input() load?: EventEmitter<IAuditCameraDetailsTableArgs>;
  @Input() config = new AuditCameraDetailsTableConfig();
  @Output() configChange = new EventEmitter<AuditCameraDetailsTableConfig>();
  @Output() video = new EventEmitter<Camera>();
  constructor(business: AuditCameraDetailsTableBusiness) {
    super(true);
    this.business = business;
  }
  columns: string[] = [];
  widths = [];
  selected?: AuditCameraDetailsTableItem;
  Color = ColorTool;
  ConfigLanguage = AuditCameraDetailsTableConfigLanguage;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(1, this.pageSize);
      });
    }

    this.loadConfig().finally(() => {
      this.loadData(1, this.pageSize);
    });
  }

  loadData(index: number, size: number, ...args: any[]): void {
    this.loading = true;
    this.business
      .load(index, size, this.args, this.config)
      .then((paged) => {
        this.page = paged.Page;
        this.datas = paged.Data;
      })
      .finally(() => {
        this.loading = false;
      });
  }
  async loadConfig() {
    return await this.business.config.load(this.args).then((x) => {
      this.config = x;
      this.configChange.emit(this.config);
      this.columns = Object.keys(this.config).sort((a, b) => {
        return this.config[a].index - this.config[b].index;
      });
    });
  }

  onselect(item: AuditCameraDetailsTableItem) {
    if (item === this.selected) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }

  onvideo(e: Event, item: AuditCameraDetailsTableItem) {
    e.stopImmediatePropagation();
    this.video.emit(item);
  }
}
