import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommitteesStatisticBusiness } from './committees-statistic.business';
import { CommitteesStatisticViewModel } from './committees-statistic.model';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { Division } from 'src/app/network/model/division.model';
import { Language } from 'src/app/common/tools/language';
import { GlobalStoreService } from 'src/app/common/service/global-store.service';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';

@Component({
  selector: 'app-committees-statistic',
  templateUrl: './committees-statistic.component.html',
  styleUrls: ['./committees-statistic.component.css'],
  providers: [CommitteesStatisticBusiness],
})
export class CommitteesStatisticComponent
  implements
  OnInit,
  OnChanges,
  IComponent<DivisionNumberStatistic, CommitteesStatisticViewModel>
{
  Language = Language;

  @Input()
  Committees?: Division;
  @Input()
  business: IBusiness<DivisionNumberStatistic, CommitteesStatisticViewModel>;

  @Output()
  OnAllDeviceCountClicked: EventEmitter<void> = new EventEmitter();
  @Output()
  OnOnlineDeviceCountClicked: EventEmitter<void> = new EventEmitter();
  @Output()
  OnOfflineDeviceCountClicked: EventEmitter<void> = new EventEmitter();
  @Output()
  OnGarbageStationCountClicked: EventEmitter<void> = new EventEmitter();
  @Output()
  OnGarbageDropEventCountClicked: EventEmitter<void> = new EventEmitter();
  @Output()
  OnGarbageFullEventCountClicked: EventEmitter<void> = new EventEmitter();
  @Output()
  OnIllegalDropEventCountClicked: EventEmitter<void> = new EventEmitter();
  @Output()
  OnMixedIntoEventCountClicked: EventEmitter<void> = new EventEmitter();

  constructor(
    business: CommitteesStatisticBusiness,
    private store: GlobalStoreService
  ) {
    this.business = business;
  }

  view = new CommitteesStatisticViewModel();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Committees) {
      if (this.Committees) {
        this.onLoaded();
      }
    }
  }
  onLoaded(): void {
    this.show();
  }

  ngOnInit() {
    this.store.interval.subscribe(() => {
      this.show();
    });
  }

  show() {
    if (this.Committees) {
      this.business
        .load(this.Committees.Id)
        .then((model: CommitteesStatisticViewModel) => {
          this.view = model;
        });
    }
  }

  AllDeviceCountClicked(event: Event) {
    this.OnAllDeviceCountClicked.emit();
  }
  OnlineDeviceCountClicked(event: Event) {
    this.OnOnlineDeviceCountClicked.emit();
  }
  OfflineDeviceCountClicked(event: Event) {
    this.OnOfflineDeviceCountClicked.emit();
  }
  GarbageStationCountClicked(event: Event) {
    this.OnGarbageStationCountClicked.emit();
  }
  GarbageDropEventCountClicked(event: Event) {
    this.OnGarbageDropEventCountClicked.emit();
  }
  GarbageFullEventCountClicked(event: Event) {
    this.OnGarbageFullEventCountClicked.emit();
  }
  IllegalDropEventCountClicked(event: Event) {
    this.OnIllegalDropEventCountClicked.emit();
  }
  MixedIntoEventCountClicked(event: Event) {
    this.OnMixedIntoEventCountClicked.emit();
  }
}
