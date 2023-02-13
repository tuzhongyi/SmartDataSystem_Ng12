import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { IModel } from 'src/app/network/model/model.interface';
import { MediaMultipleWindowBusiness } from './media-multiple-window.business';
import { MediaMultipleWindowModel } from './media-multiple-window.model';

@Component({
  selector: 'howell-media-multiple-window',
  templateUrl: './media-multiple-window.component.html',
  styleUrls: ['./media-multiple-window.component.less'],
  providers: [MediaMultipleWindowBusiness],
})
export class MediaMultipleWindowComponent
  implements OnInit, IComponent<IModel, MediaMultipleWindowModel>
{
  @Input()
  Model: WindowViewModel = new WindowViewModel();
  @Input()
  style = {};
  @Input()
  statistic?: GarbageStationGarbageCountStatistic;
  @Input()
  business: IBusiness<IModel, MediaMultipleWindowModel>;
  @Input()
  date?: Date;

  model?: MediaMultipleWindowModel;

  constructor(business: MediaMultipleWindowBusiness) {
    this.business = business;
  }

  async ngOnInit() {
    if (this.statistic) {
      this.model = await this.business.load(this.statistic, this.date);
    }
  }

  formatDate(date: Date, formatter: string) {
    return formatDate(date, formatter, 'en');
  }
}
