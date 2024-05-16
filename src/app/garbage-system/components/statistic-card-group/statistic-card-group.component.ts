import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DisposalCountArgs } from '../disposal-count/disposal-count.model';
import { StatisticCardGroupBussiness } from './statistic-card-group.business';
import { StatisticCardItem, StatisticType } from './statistic-card-group.model';

@Component({
  selector: 'statistic-card-group',
  templateUrl: './statistic-card-group.component.html',
  styleUrls: ['./statistic-card-group.component.less'],
  providers: [StatisticCardGroupBussiness],
})
export class StatisticCardGroupComponent implements OnInit {
  @Input() types = [
    StatisticType.stationcount,
    StatisticType.stationdrop,
    StatisticType.stationfull,
    StatisticType.recordillegaldrop,
    StatisticType.recordmixedinto,
  ];
  @Output() stationcount = new EventEmitter();
  @Output() stationdrop = new EventEmitter();
  @Output() stationfull = new EventEmitter();
  @Output() recordillegaldrop = new EventEmitter();
  @Output() recordmixedinto = new EventEmitter();
  @Output() task = new EventEmitter<DisposalCountArgs>();

  @Input() load?: EventEmitter<void>;

  constructor(
    private business: StatisticCardGroupBussiness,
    private global: GlobalStorageService
  ) {}

  cards: StatisticCardItem[] = [];

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
    this.cards = this.business.init();
    this.loadData();
  }

  loadData() {
    return this.business.load().then((x) => {
      this.cards = x;
    });
  }

  onclick(index: number) {
    switch (index) {
      case 0:
        this.stationcount.emit();
        break;
      case 1:
        this.stationdrop.emit();
        break;
      case 2:
        this.stationfull.emit();
        break;
      case 3:
        this.recordillegaldrop.emit();
        break;
      case 4:
        this.recordmixedinto.emit();
        break;
      case 5:
        let args: DisposalCountArgs = {
          divisionId: this.global.divisionId,
        };
        this.task.emit(args);
        break;
      default:
        break;
    }
  }
}
