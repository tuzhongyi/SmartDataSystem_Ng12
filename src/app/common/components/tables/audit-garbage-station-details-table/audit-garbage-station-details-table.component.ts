import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import {
  AuditGarbageStationDetailsTableArgs,
  AuditGarbageStationDetailsTableConfig,
  AuditGarbageStationDetailsTableConfigLanguage,
  AuditGarbageStationDetailsTableItem,
  IAuditGarbageStationDetailsTableArgs,
  IAuditGarbageStationDetailsTableBusiness,
} from './audit-garbage-station-details-table.model';
import { AuditGarbageStationDetailsTableProviders } from './audit-garbage-station-details-table.provider';
import { AuditGarbageStationDetailsTableBusiness } from './business/audit-garbage-station-details-table.business';

@Component({
  selector: 'audit-garbage-station-details-table',
  templateUrl: './audit-garbage-station-details-table.component.html',
  styleUrls: [
    '../table-sticky.less',
    './audit-garbage-station-details-table.component.less',
  ],
  providers: [...AuditGarbageStationDetailsTableProviders],
})
export class AuditGarbageStationDetailsTableComponent
  extends PagedTableAbstractComponent<AuditGarbageStationDetailsTableItem>
  implements OnInit, OnChanges
{
  @Input() pageSize: number = 10;
  @Input() business: IAuditGarbageStationDetailsTableBusiness;
  @Input() args: IAuditGarbageStationDetailsTableArgs =
    new AuditGarbageStationDetailsTableArgs();
  @Input() load?: EventEmitter<IAuditGarbageStationDetailsTableArgs>;
  @Input() config = new AuditGarbageStationDetailsTableConfig();
  @Output() configChange =
    new EventEmitter<AuditGarbageStationDetailsTableConfig>();
  @Output() command = new EventEmitter<GarbageStation>();
  @Output() videomultiple = new EventEmitter<GarbageStation>();
  @Output() schedule = new EventEmitter<GarbageStation>();
  @Output() dropwindows = new EventEmitter<GarbageStation>();
  @Output() cameras = new EventEmitter<GarbageStation>();
  @Output() trashcans = new EventEmitter<GarbageStation>();
  @Output() members = new EventEmitter<GarbageStation>();
  @Output() eventdisabled = new EventEmitter<GarbageStation>();
  @Output() status = new EventEmitter<GarbageStation>();
  @Output() gcha = new EventEmitter<GarbageStation>();
  @Output() nb = new EventEmitter<GarbageStation>();
  @Output() door = new EventEmitter<GarbageStation>();

  constructor(business: AuditGarbageStationDetailsTableBusiness) {
    super(true);
    this.business = business;
  }

  selected?: AuditGarbageStationDetailsTableItem;
  Color = ColorTool;
  StationState = StationState;
  StationType = StationType;
  ConfigLanguage = AuditGarbageStationDetailsTableConfigLanguage;

  columns: string[] = [];
  widths = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && !changes.config.firstChange) {
      this.columns = Object.keys(this.config).sort((a, b) => {
        return this.config[a].index - this.config[b].index;
      });
    }
  }

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(1);
      });
    }

    this.loadConfig().finally(() => {
      this.loadData(1);
    });
  }

  loadData(index: number, size: number = this.pageSize, ...args: any[]): void {
    this.loading = true;
    this.business
      .load(index, size, this.args, this.config)
      .then((paged) => {
        this.page = paged.Page;
        this.datas = paged.Data;
        this.regist(this.datas);
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

  regist(items: AuditGarbageStationDetailsTableItem[]) {
    items.forEach((item) => {
      Object.keys(item.Datas).forEach((key) => {
        let data = item.Datas[key];
        if (data.event) {
          data.event.subscribe((x) => {
            switch (key) {
              case 'GCHA':
                this.gcha.emit(x);
                break;
              case 'NBState':
                this.nb.emit(x);
                break;
              case 'Device':
                this.door.emit(x);
                break;

              default:
                break;
            }
          });
        }
      });
    });
  }

  onselect(item: AuditGarbageStationDetailsTableItem) {
    if (item === this.selected) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }

  ondropwindows(e: Event, item: AuditGarbageStationDetailsTableItem) {
    e.stopImmediatePropagation();
    this.dropwindows.emit(item);
  }
  oncameras(e: Event, item: AuditGarbageStationDetailsTableItem) {
    e.stopImmediatePropagation();
    this.cameras.emit(item);
  }
  ontrashcans(e: Event, item: AuditGarbageStationDetailsTableItem) {
    e.stopImmediatePropagation();
    this.trashcans.emit(item);
  }
  onmembers(e: Event, item: AuditGarbageStationDetailsTableItem) {
    e.stopImmediatePropagation();
    this.members.emit(item);
  }

  onschedule(e: Event, item: AuditGarbageStationDetailsTableItem) {
    e.stopImmediatePropagation();
    this.schedule.emit(item);
  }
  oncommand(e: Event, item: AuditGarbageStationDetailsTableItem) {
    e.stopImmediatePropagation();
    this.command.emit(item);
  }
  onvideomultiple(e: Event, item: AuditGarbageStationDetailsTableItem) {
    e.stopImmediatePropagation();
    this.videomultiple.emit(item);
  }
  onstatus(e: Event, item: AuditGarbageStationDetailsTableItem) {
    e.stopImmediatePropagation();
    this.status.emit(item);
  }
  oneventdisabled(e: Event, item: AuditGarbageStationDetailsTableItem) {
    e.stopImmediatePropagation();
    this.eventdisabled.emit(item);
  }

  onclick(e: Event, key: string, item: AuditGarbageStationDetailsTableItem) {
    e.stopImmediatePropagation();
    let event = item.Datas[key].event;
    if (event) {
      event.emit(item);
    }
  }
}
