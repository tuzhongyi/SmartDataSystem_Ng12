import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { timer } from 'rxjs';
import {
  ImageVideoControlModel,
  PlaybackInterval,
} from 'src/app/common/components/image-video-control/image-video-control.model';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';

import { PatrolControlBusiness } from './patrol-control.business';
import {
  PatrolControlConfig,
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
export class PatrolControlComponent implements OnInit, OnChanges, OnDestroy {
  @Input() load?: EventEmitter<void>;
  // @Input() id?: string;
  @Input() config: PatrolControlConfig = new PatrolControlConfig();
  @Output() close: EventEmitter<void> = new EventEmitter();

  @Output() fullscreen: EventEmitter<void> = new EventEmitter();
  @Output() onselected: EventEmitter<PatrolControlModel> = new EventEmitter();

  constructor(private business: PatrolControlBusiness) {}

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.id && this.id) {
    //   if (this.models && this.models.length > 0) {
    //     let index = this.models.findIndex((x) => x.id == this.id);
    //     if (index >= 0) {
    //       this.selected = this.models[index];
    //       this.onselected.emit(this.selected);
    //     }
    //   }
    // }
    if (changes.config) {
      if (this.config.autoplay) {
        this.run();
      } else {
        this.stop();
      }
    }
  }

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
    for (let i = 1; i <= 4; i++) {
      let time = 30 * i;
      let item = new SelectItem(time.toString(), time, time + 's');
      this.interval.times.push(item);
    }

    this.business.manualCaptureEvent.subscribe((x) => {
      this.captureing = x;
    });

    if (this.load) {
      this.load.subscribe((x) => {
        let index = this.page ? this.page.PageIndex : 1;
        this.loadData(index);
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

  async loadData(index: number) {
    let paged = await this.business.load(index);
    this.selected = paged.Data;
    this.page = paged.Page;
    this.onselected.emit(this.selected);
    timer(1000).subscribe((x) => {
      this.onreflush();
    });
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
    this.interval.runing = true;
    this.interval.handle = setInterval(() => {
      this.next(true);
    }, this.interval.time * 1000);
  }
  stop() {
    this.interval.runing = false;
    if (this.interval.handle) {
      clearInterval(this.interval.handle);
    }
  }

  timeSelect(item: SelectItem) {
    if (this.config.autoplay) {
      this.interval.time = item.value;
      this.stop();
      this.run();
    }
  }

  openplayback() {
    this.playback.show = true;
  }

  onvideoplayed(video: ImageVideoControlModel) {
    this.playing = video;
    this.playing.fulled = true;
  }
  onvideostoped(video: ImageVideoControlModel) {
    if (this.playing) {
      this.playing.fulled = false;
      this.playing = undefined;
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
