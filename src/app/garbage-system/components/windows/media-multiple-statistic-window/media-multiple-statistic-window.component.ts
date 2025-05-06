import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { IMediaMultipleControlBusiness } from '../media-multiple-control/media-multiple-control.model';
import { MediaMultipleStatisticWindowBusiness } from './media-multiple-statistic-window.business';
import {
  MediaMultipleStatisticWindowArgs,
  MediaMultipleStatisticWindowModel,
} from './media-multiple-statistic-window.model';

@Component({
  selector: 'media-multiple-statistic-window',
  templateUrl: './media-multiple-statistic-window.component.html',
  styleUrls: ['./media-multiple-statistic-window.component.less'],
  providers: [MediaMultipleStatisticWindowBusiness],
})
export class MediaMultipleStatisticWindowComponent
  implements OnInit, IComponent<IModel, MediaMultipleStatisticWindowModel>
{
  @Input() args?: MediaMultipleStatisticWindowArgs;
  @Input() business: IMediaMultipleControlBusiness;
  @Input() fullplay = true;

  constructor(business: MediaMultipleStatisticWindowBusiness) {
    this.business = business;
  }

  model?: MediaMultipleStatisticWindowModel;
  async ngOnInit() {
    if (this.args) {
      this.model = await this.business.load(this.args);
    }
  }

  formatDate(date: Date, formatter: string) {
    return formatDate(date, formatter, 'en');
  }
}
