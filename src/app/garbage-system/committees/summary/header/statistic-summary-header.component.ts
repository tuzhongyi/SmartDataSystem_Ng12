import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { StatisticSummaryViewModel } from '../statistic-summary.model';
import { StatisticSummaryHeaderBusiness } from './statistic-summary-header.business';
import { StatisticSummaryHeaderViewModel } from './statistic-summary-header.model';

@Component({
  selector: 'app-statistic-summary-header',
  templateUrl: './statistic-summary-header.component.html',
  styleUrls: ['./statistic-summary-header.component.less'],
  providers: [StatisticSummaryHeaderBusiness],
})
export class StatisticSummaryHeaderComponent
  implements
    OnInit,
    OnChanges,
    IComponent<StatisticSummaryViewModel[], StatisticSummaryHeaderViewModel>
{
  @Input() DivisonStatistic: StatisticSummaryViewModel[] = [];
  @Input() EventTrigger?: EventEmitter<void>;
  @Input() operational = false;
  @Output() OnTriggerEvent: EventEmitter<StatisticSummaryHeaderViewModel> =
    new EventEmitter();
  @Output() drop: EventEmitter<StatisticSummaryHeaderViewModel> =
    new EventEmitter();
  @Output() task: EventEmitter<StatisticSummaryHeaderViewModel> =
    new EventEmitter();
  @Output() illegalDrop: EventEmitter<StatisticSummaryHeaderViewModel> =
    new EventEmitter();
  @Output() mixedInto: EventEmitter<StatisticSummaryHeaderViewModel> =
    new EventEmitter();

  @Input()
  business: IBusiness<
    StatisticSummaryViewModel[],
    StatisticSummaryHeaderViewModel
  >;

  constructor(business: StatisticSummaryHeaderBusiness) {
    this.business = business;
  }
  Language = Language;
  EventType = EventType;

  view: StatisticSummaryHeaderViewModel = new StatisticSummaryHeaderViewModel();

  ngOnChanges(changes: SimpleChanges): void {
    this.onLoaded();
  }

  async onLoaded() {
    if (this.DivisonStatistic) {
      this.view = await this.business.load(this.DivisonStatistic);
    }
  }

  ngOnInit() {
    if (this.EventTrigger) {
      this.EventTrigger.subscribe((x) => {
        // 处理数据
        this.OnTriggerEvent.emit(this.view);
      });
    }
  }

  ondrop() {
    this.drop.emit(this.view);
  }
  ontask() {
    this.task.emit(this.view);
  }
  onrecord(type: EventType) {
    switch (type) {
      case EventType.IllegalDrop:
        this.illegalDrop.emit(this.view);
        break;
      case EventType.MixedInto:
        this.mixedInto.emit(this.view);
        break;

      default:
        break;
    }
  }
}
