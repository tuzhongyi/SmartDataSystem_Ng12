import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { MonitorVideoControlWindowBusiness } from './windows/monitor-video-control-window.business';

@Injectable()
export class MonitorGuideBusiness {
  constructor(
    private local: LocalStorageService,
    private cookie: CookieService,
    private video: MonitorVideoControlWindowBusiness
  ) {
    this.init();
  }
  get show() {
    return !this.local.guide;
  }
  set show(value: boolean) {
    this.local.guide = !value;
  }
  index: number = MonitorGuideIndex.division_list;
  first: number = MonitorGuideIndex.division_list;
  last: number = MonitorGuideIndex.map_video_playback;
  Index = MonitorGuideIndex;
  get src() {
    return `assets/img/guide/${this.index}.png`;
  }

  get x() {
    if (this.index <= MonitorGuideIndex.today_illegal_drop) {
      return '30%';
    } else if (
      MonitorGuideIndex.today_illegal_drop < this.index &&
      this.index <= MonitorGuideIndex.station_count
    ) {
      return '50%';
    } else if (
      MonitorGuideIndex.station_count < this.index &&
      this.index < this.last
    ) {
      return 'calc(50% - 110px)';
    } else if (this.index === this.last) {
      return 'calc(50% - 69px)';
    } else {
      return '0';
    }
  }
  get y() {
    if (this.index <= MonitorGuideIndex.station_count) {
      return 'calc(50% + 90px)';
    } else if (this.index === MonitorGuideIndex.statistic_number) {
      return '52%';
    } else if (
      MonitorGuideIndex.map_point_filter <= this.index &&
      this.index <= this.last
    ) {
      return '91%';
    } else {
      return '0';
    }
  }

  private async init() {}

  open() {
    this.show = true;
    this.index = MonitorGuideIndex.division_list;
  }

  finish() {
    this.show = false;
  }
  next() {
    this.index++;
  }
  prev() {
    this.index--;
    if (this.video.show && this.index < MonitorGuideIndex.map_video_preview) {
      this.video.show = false;
    }
  }
}

enum MonitorGuideIndex {
  division_list = 1,
  illegal_drop_rank,
  mixed_into_rank,
  score_rank,
  ratio_rank,
  today_illegal_drop,
  today_mixed_into,
  today_task,
  today_retention_time,
  today_retention_number,
  device_status,
  station_count,
  statistic_number,
  map_point_filter,
  map_point_state,
  map_point_mune,
  map_point_info,
  map_point_cameras,
  map_video_preview,
  map_video_playback,
}
