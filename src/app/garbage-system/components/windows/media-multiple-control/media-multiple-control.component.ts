import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { MediaMultipleControlBusiness } from './media-multiple-control.business';
import {
  MediaMultipleControlArgs,
  MediaMultipleControlModel,
} from './media-multiple-control.model';

@Component({
  selector: 'howell-media-multiple-control',
  templateUrl: './media-multiple-control.component.html',
  styleUrls: ['./media-multiple-control.component.less'],
  providers: [MediaMultipleControlBusiness],
})
export class MediaMultipleControlComponent
  implements OnInit, IComponent<IModel, MediaMultipleControlModel>
{
  @Input() args?: MediaMultipleControlArgs;
  @Input() business: IBusiness<IModel, MediaMultipleControlModel>;
  @Input() fullplay = true;

  constructor(business: MediaMultipleControlBusiness) {
    this.business = business;
  }

  model?: MediaMultipleControlModel;

  async ngOnInit() {
    if (this.args) {
      this.model = await this.business.load(this.args);
    }
  }

  formatDate(date: Date, formatter: string) {
    return formatDate(date, formatter, 'en');
  }
}
