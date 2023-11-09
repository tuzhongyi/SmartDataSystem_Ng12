import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { AIGarbageRfidCard } from 'src/app/network/model/ai-garbage/rfid-card.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../table-abstract.component';
import { AIGarbageStationRfidCardTableBusiness } from './ai-garbage-station-rfid-card-table.business';
import { AIGarbageStationRfidCardTableArgs } from './ai-garbage-station-rfid-card-table.model';

@Component({
  selector: 'ai-garbage-station-rfid-card-table',
  templateUrl: './ai-garbage-station-rfid-card-table.component.html',
  styleUrls: [
    '../../table.less',
    './ai-garbage-station-rfid-card-table.component.less',
  ],
  providers: [AIGarbageStationRfidCardTableBusiness],
})
export class AIGarbageStationRfidCardTableComponent
  extends PagedTableAbstractComponent<AIGarbageRfidCard>
  implements OnInit
{
  @Input()
  args: AIGarbageStationRfidCardTableArgs =
    new AIGarbageStationRfidCardTableArgs();
  @Input()
  load?: EventEmitter<AIGarbageStationRfidCardTableArgs>;
  @Input()
  selecteds: AIGarbageRfidCard[] = [];
  @Output()
  selectedsChange: EventEmitter<AIGarbageRfidCard[]> = new EventEmitter();
  @Output()
  loaded: EventEmitter<PagedList<AIGarbageRfidCard>> = new EventEmitter();
  @Output()
  details: EventEmitter<AIGarbageRfidCard> = new EventEmitter();
  @Output()
  delete: EventEmitter<AIGarbageRfidCard> = new EventEmitter();

  constructor(private business: AIGarbageStationRfidCardTableBusiness) {
    super();
  }
  widths: string[] = [];
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

  loadData(index: number, size: number = 10, ...args: any[]): void {
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

  ondetails(e: Event, item: AIGarbageRfidCard) {
    e.stopImmediatePropagation();
    this.details.emit(item);
  }
  onremove(e: Event, item: AIGarbageRfidCard) {
    e.stopImmediatePropagation();
    this.delete.emit(item);
  }
  onselected(item: AIGarbageRfidCard) {
    let index = this.selecteds.indexOf(item);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }
    this.selectedsChange.emit(this.selecteds);
  }
}
