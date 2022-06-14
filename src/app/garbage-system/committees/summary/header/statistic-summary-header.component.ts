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
import { Language } from 'src/app/global/tool/language';
import { StatisticSummaryViewModel } from '../statistic-summary.model';
import { StatisticSummaryHeaderBusiness } from './statistic-summary-header.business';
import { StatisticSummaryHeaderConverter } from './statistic-summary-header.converter';
import { StatisticSummaryHeaderViewModel } from './statistic-summary-header.model';

@Component({
  selector: 'app-statistic-summary-header',
  templateUrl: './statistic-summary-header.component.html',
  styleUrls: ['./statistic-summary-header.component.css'],
  providers: [StatisticSummaryHeaderBusiness],
})
export class StatisticSummaryHeaderComponent
  implements
    OnInit,
    OnChanges,
    IComponent<StatisticSummaryViewModel[], StatisticSummaryHeaderViewModel>
{
  Language = Language;

  view: StatisticSummaryHeaderViewModel = new StatisticSummaryHeaderViewModel();

  @Input()
  DivisonStatistic: StatisticSummaryViewModel[] = [];

  @Input()
  EventTrigger?: EventEmitter<void>;

  @Output()
  OnTriggerEvent: EventEmitter<StatisticSummaryHeaderViewModel> = new EventEmitter();

  @Input()
  business: IBusiness<
    StatisticSummaryViewModel[],
    StatisticSummaryHeaderViewModel
  >;

  constructor(business: StatisticSummaryHeaderBusiness) {
    this.business = business;
  }

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
}
