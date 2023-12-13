import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../table-abstract.component';
import { AIGarbageStationRegionTableBusiness } from './ai-garbage-station-region-table.business';
import { AIGarbageStationRegionTableArgs } from './ai-garbage-station-region-table.model';

@Component({
  selector: 'ai-garbage-station-region-table',
  templateUrl: './ai-garbage-station-region-table.component.html',
  styleUrls: [
    '../../table.less',
    './ai-garbage-station-region-table.component.less',
  ],
  providers: [AIGarbageStationRegionTableBusiness],
})
export class AIGarbageStationRegionTableComponent
  extends PagedTableAbstractComponent<AIGarbageRegion>
  implements OnInit
{
  @Input()
  args: AIGarbageStationRegionTableArgs = new AIGarbageStationRegionTableArgs();
  @Input()
  load?: EventEmitter<AIGarbageStationRegionTableArgs>;
  @Input()
  selecteds: AIGarbageRegion[] = [];
  @Output()
  selectedsChange: EventEmitter<AIGarbageRegion[]> = new EventEmitter();
  @Output()
  loaded: EventEmitter<PagedList<AIGarbageRegion>> = new EventEmitter();
  @Output()
  details: EventEmitter<AIGarbageRegion> = new EventEmitter();
  @Output()
  delete: EventEmitter<AIGarbageRegion> = new EventEmitter();
  @Output()
  building: EventEmitter<AIGarbageRegion> = new EventEmitter();
  @Output()
  station: EventEmitter<AIGarbageRegion> = new EventEmitter();

  constructor(private business: AIGarbageStationRegionTableBusiness) {
    super();
    this.pageSize = 10;
  }
  @ViewChild('body') bodyElement?: ElementRef<HTMLDivElement>;
  widths: string[] = ['20%', '20%'];
  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        if (x) {
          this.args = x;
        }
        this.loadData(
          this.args.tofirst ? 1 : this.page.PageIndex,
          this.pageSize,
          this.args
        );
      });
    }
    this.loadData(1);
  }

  loadData(index: number, size: number = this.pageSize, ...args: any[]): void {
    this.selecteds = [];
    this.selectedsChange.emit(this.selecteds);
    this.business.load(index, size, this.args).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;
      this.loaded.emit(x);
    });
  }
  sortData(sort: Sort) {
    const isAsc = sort.direction === 'asc';
    this.args.desc = undefined;
    this.args.asc = undefined;
    if (isAsc) {
      this.args.asc = sort.active;
    } else {
      this.args.desc = sort.active;
    }
    this.loadData(this.page.PageIndex);
  }

  ondetails(e: Event, item: AIGarbageRegion) {
    e.stopImmediatePropagation();
    this.details.emit(item);
  }
  onremove(e: Event, item: AIGarbageRegion) {
    e.stopImmediatePropagation();
    this.delete.emit(item);
  }

  onbuilding(e: Event, item: AIGarbageRegion) {
    e.stopImmediatePropagation();
    this.building.emit(item);
  }
  onstation(e: Event, item: AIGarbageRegion) {
    e.stopImmediatePropagation();
    this.station.emit(item);
  }
  onselected(item: AIGarbageRegion) {
    let index = this.selecteds.indexOf(item);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }
    this.selectedsChange.emit(this.selecteds);
  }

  toselect(type: TableSelectType) {
    switch (type) {
      case TableSelectType.All:
        this.selecteds = [...this.datas];
        break;
      case TableSelectType.Cancel:
        this.selecteds = [];
        break;
      case TableSelectType.Reverse:
        this.selecteds = this.datas.filter((x) => !this.selecteds.includes(x));
        break;

      default:
        break;
    }
    this.selectedsChange.emit(this.selecteds);
  }
}
