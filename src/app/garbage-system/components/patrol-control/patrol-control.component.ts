import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ImageVideoControlModel,
  PlaybackInterval,
} from 'src/app/common/components/image-video-control/image-video-control.model';
import { Enum } from 'src/app/enum/enum-helper';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';

import { PatrolControlBusiness } from './patrol-control.business';
import {
  PatrolControlConfig,
  PatrolControlInterval,
  PatrolControlModel,
  PatrolIntervalControl,
} from './patrol-control.model';
import { PlaybackConfigWindowViewModel } from './playback-config-window.model';

@Component({
  selector: 'app-patrol-control',
  templateUrl: './patrol-control.component.html',
  styleUrls: ['./patrol-control.component.less'],
  providers: [PatrolControlBusiness],
})
export class PatrolControlComponent implements OnInit, OnDestroy {
  @Input() load?: EventEmitter<void>;
  @Input() toselect?: EventEmitter<number>;
  @Input() config: PatrolControlConfig = new PatrolControlConfig();
  @Output() close: EventEmitter<void> = new EventEmitter();

  @Output() fullscreen: EventEmitter<void> = new EventEmitter();
  @Output() onselected: EventEmitter<PatrolControlModel> = new EventEmitter();

  constructor(private business: PatrolControlBusiness) {}

  OnlineStatus = OnlineStatus;
  selected?: PatrolControlModel;
  page?: Page;
  captureing = false;
  interval = new PatrolIntervalControl();
  playback = new PlaybackConfigWindowViewModel();
  playing?: ImageVideoControlModel;
  toPlayback: EventEmitter<PlaybackInterval> = new EventEmitter();
  change: EventEmitter<ImageVideoControlModel[]> = new EventEmitter();

  async ngOnInit() {
    this.init();

    this.business.manualCaptureEvent.subscribe((x) => {
      this.captureing = x;
    });

    if (this.load) {
      this.load.subscribe((x) => {
        let index = this.page ? this.page.PageIndex : 1;
        this.loadData(index);
      });
    }
    if (this.toselect) {
      this.toselect.subscribe((x) => {
        this.loadData(x + 1);
      });
    }
    this.loadData(1);

    // if (this.config.autoplay) {
    //   this.run();
    // }

    this.playback.onOkClicked.subscribe((x) => {
      this.onplayback(x);
    });
  }
  ngOnDestroy(): void {
    if (this.interval.handle) {
      clearInterval(this.interval.handle);
    }
    this.interval.runing = false;
  }

  init() {
    this.initInterval();
    this.initConfig();
    this.subscribe();
  }
  initInterval() {
    let _enum = new Enum(PatrolControlInterval);
    console.log(_enum.getValues());
    this.interval.times = _enum.getValues().map((x) => parseInt(x));
    this.interval.time = PatrolControlInterval.s30;
  }
  initConfig() {
    if (this.config.autoplay) {
      this.run();
    } else {
      this.stop();
    }
  }
  subscribe() {
    this.interval.trigger.subscribe((x) => {
      this.next(true);
    });
  }
  async loadData(index: number) {
    let paged = await this.business.load(index);
    this.selected = paged.Data;
    this.page = paged.Page;
    this.onselected.emit(this.selected);
    this.onreflush();
  }

  async prev(event?: Event) {
    if (this.selected && this.page) {
      this.page.PageIndex--;
      if (this.page.PageIndex <= 0) {
        this.page.PageIndex = this.page.TotalRecordCount;
      }
      this.loadData(this.page.PageIndex);
    }
    this.stop();
    this.run();
  }
  async next(fromrun: boolean = false) {
    if (this.selected && this.page) {
      this.page.PageIndex++;
      if (this.page.PageIndex > this.page.TotalRecordCount) {
        this.page.PageIndex = 1;
      }
      this.loadData(this.page.PageIndex);
    }
    if (!fromrun) {
      this.stop();
      this.run();
    }
  }

  async onreflush() {
    if (this.selected) {
      this.business
        .manualCapture(this.selected.id, this.selected.media)
        .then((x) => {
          this.change.emit(x);
        });
    }
  }
  onfullscreen() {
    this.fullscreen.emit();
  }
  onclose() {
    this.close.emit();
  }

  run() {
    this.interval.run();
  }
  stop() {
    this.interval.stop();
  }

  timeSelect() {
    if (this.config.autoplay) {
      this.stop();
      this.run();
    }
  }

  openplayback() {
    this.playback.show = true;
  }

  onvideoplayed(video: ImageVideoControlModel) {
    this.playing = video;
    this.stop();
  }
  onvideostoped(video: ImageVideoControlModel) {
    if (this.playing) {
      this.playing = undefined;
      if (this.config.autoplay) {
        this.interval.run();
      }
    }
  }

  onplayback(params: DurationParams) {
    if (this.playing) {
      this.toPlayback.emit({
        CameraId: this.playing.cameraId,
        BeginTime: params.BeginTime,
        EndTime: params.EndTime,
      });
    }
  }
}
