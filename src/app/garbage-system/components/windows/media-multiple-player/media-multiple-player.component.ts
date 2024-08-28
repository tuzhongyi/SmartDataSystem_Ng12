import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { Language } from 'src/app/common/tools/language';
import { IModel } from 'src/app/network/model/model.interface';
import { MediaMultiplePlayerBusiness } from './media-multiple-player.business';
import {
  MediaMultiplePlayerArgs,
  MediaMultiplePlayerModel,
} from './media-multiple-player.model';

@Component({
  selector: 'media-multiple-player',
  templateUrl: './media-multiple-player.component.html',
  styleUrls: ['./media-multiple-player.component.less'],
  providers: [MediaMultiplePlayerBusiness],
})
export class MediaMultiplePlayerComponent
  implements OnInit, IComponent<IModel, MediaMultiplePlayerModel>
{
  @Input() title = '';
  @Input('args') input_args?: MediaMultiplePlayerArgs;
  @Input() business: IBusiness<IModel, MediaMultiplePlayerModel>;
  @Input() fullplay = true;
  @Input() option = false;
  @Input() isplayback = true;

  constructor(business: MediaMultiplePlayerBusiness) {
    this.business = business;
  }

  args?: MediaMultiplePlayerArgs;

  model?: MediaMultiplePlayerModel;

  Language = Language;
  DateTimePickerView = DateTimePickerView;

  date = new Date();
  duration = DateTimeTool.before(this.date);
  loading = false;
  playings: boolean[] = [];
  get playing() {
    return this.playings.some((x) => x);
  }

  async ngOnInit() {
    if (this.input_args) {
      let plain = instanceToPlain(this.input_args);
      this.args = plainToInstance(MediaMultiplePlayerArgs, plain);
      if (this.isplayback) {
        this.toplayback();
      } else {
        this.topreview();
      }
    }
  }

  load(args: MediaMultiplePlayerArgs) {
    this.loading = true;
    this.business
      .load(args)
      .then((x) => {
        this.model = x;
        this.playings = this.model.medias.map((x) => false);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  topreview() {
    if (this.args) {
      this.args.duration = undefined;
      this.load(this.args);
    }
  }
  toplayback() {
    if (this.args) {
      this.duration.begin.setFullYear(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate()
      );
      this.duration.end.setFullYear(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate()
      );
      this.args.duration = this.duration;
      this.load(this.args);
    }
  }

  formatDate(date: Date, formatter: string) {
    return formatDate(date, formatter, 'en');
  }

  onoptionchange(isplayback: boolean) {
    this.isplayback = isplayback;

    if (isplayback) {
      this.toplayback();
    } else {
      this.topreview();
    }
  }

  onplayed(item: ImageVideoControlModel) {
    if (this.model) {
      let index = this.model.medias.findIndex(
        (x) => x.cameraId === item.cameraId
      );
      if (index >= 0) {
        this.playings[index] = true;
      }
    }
  }
  onstoped(item: ImageVideoControlModel) {
    if (this.model) {
      let index = this.model.medias.findIndex(
        (x) => x.cameraId === item.cameraId
      );
      if (index >= 0) {
        this.playings[index] = false;
      }
    }
  }

  onplayback() {
    this.toplayback();
  }
}
