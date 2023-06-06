import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';

import { IdNameModel, IModel } from 'src/app/network/model/model.interface';
import { ConfigRequestService } from 'src/app/network/request/config/config-request.service';
import {
  TimeDurationModel,
  TimeModel,
} from '../../time-control/time-control.model';

import { VideoPlayerWindowBusiness } from '../../video-player-window/video-player-window.business';
import { PlayMode, VideoModel } from '../../video-player/video.model';
import { WindowComponent } from '../../window-control/window.component';

@Component({
  selector: 'video-multiple-player-window',
  templateUrl: './video-multiple-player-window.component.html',
  styleUrls: ['./video-multiple-player-window.component.less'],
  providers: [VideoPlayerWindowBusiness],
})
export class VideoMultiplePlayerWindowComponent
  extends WindowComponent
  implements IComponent<IModel, VideoModel>, OnInit, OnChanges, OnDestroy
{
  @Input()
  business: IBusiness<IModel, VideoModel>;
  @Input()
  models: IdNameModel[] = [];
  @Input()
  mode: PlayMode = PlayMode.live;
  @Input()
  time?: Date;
  @Input()
  autoplay: boolean = false;
  @Input()
  title: string = '';

  constructor(
    business: VideoPlayerWindowBusiness,
    private config: ConfigRequestService
  ) {
    super();
    this.business = business;
  }

  selected?: IdNameModel;

  ngOnDestroy(): void {
    this.data = undefined;
  }

  PlayMode = PlayMode;
  date: Date = new Date();
  duration!: Promise<TimeDurationModel>;
  data?: VideoModel;
  DateTimePickerView = DateTimePickerView;

  ngOnInit() {
    this.duration = this.config.getConfig().then((config) => {
      if (this.time) {
        this.date = this.time;
      }
      let duration = DateTimeTool.second(
        this.date,
        config.playback.begin,
        config.playback.end
      );
      return {
        begin: new TimeModel(duration.begin),
        end: new TimeModel(duration.end),
      };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.time) {
      this.duration = this.config.getConfig().then((config) => {
        if (this.time) {
          this.date = this.time;
        }
        let duration = DateTimeTool.second(
          this.date,
          config.playback.begin,
          config.playback.end
        );
        return {
          begin: new TimeModel(duration.begin),
          end: new TimeModel(duration.end),
        };
      });
    }
    if (this.mode === PlayMode.live) {
      this.autoplay = true;
    }
    if (this.autoplay) {
      this.loadData();
    }
  }

  async loadData() {
    if (!this.selected && this.models.length > 0) {
      this.selected = this.models[0];
    }
    if (this.selected) {
      if (this.mode == PlayMode.live) {
        this.preview();
      } else {
        this.playback();
      }
    }
  }
  changeMode(mode: PlayMode) {
    this.mode = mode;
    if (mode == PlayMode.live) {
      this.preview();
    }
  }
  async preview() {
    this.mode = PlayMode.live;
    if (this.selected) {
      this.data = await this.business.load(this.selected.Id, this.mode);
    }
  }
  webUrl?: string;
  async playback() {
    this.mode = PlayMode.vod;
    this.duration.then((x) => {
      let duration = {
        begin: x.begin.toDate(this.date),
        end: x.end.toDate(this.date),
      };
      if (this.selected) {
        this.business
          .load(this.selected.Id, this.mode, duration)
          .then((data) => {
            this.data = data;
          });
      }
    });
  }
}
