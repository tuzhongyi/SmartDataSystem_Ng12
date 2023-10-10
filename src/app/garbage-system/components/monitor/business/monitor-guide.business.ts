import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';
import { UserConfigGuide } from 'src/app/view-model/user-config-guide.model';
import { MonitorVideoControlWindowBusiness } from './windows/monitor-video-control-window.business';

@Injectable()
export class MonitorGuideBusiness {
  constructor(
    private user: UserRequestService,
    private local: LocalStorageService,
    private video: MonitorVideoControlWindowBusiness
  ) {
    this.init();
  }
  show = false;
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

  private async init() {
    this.user.config
      .get(this.local.user.Id, UserConfigType.Guide)
      .then((base64) => {
        if (base64) {
          let str = base64decode(base64);
          if (str) {
            let guide = JSON.parse(str);
            this.show = guide.show;
          }
        } else {
          this.show = true;
        }
      });
  }

  open() {
    this.show = true;
    this.index = MonitorGuideIndex.division_list;
  }

  finish() {
    let guide: UserConfigGuide = {
      show: false,
    };
    let base64 = base64encode(JSON.stringify(guide));
    this.user.config.update(this.local.user.Id, UserConfigType.Guide, base64);
    this.video.show = false;
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
