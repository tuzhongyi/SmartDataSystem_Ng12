import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { MediaVideoControlBussiness } from './media-image-control.business';

@Component({
  selector: 'app-media-image-control',
  templateUrl: './media-image-control.component.html',
  styleUrls: ['./media-image-control.component.less'],
  providers: [MediaVideoControlBussiness, DownloadBusiness],
})
export class MediaImageControlComponent implements OnInit {
  @Input() model?: ImageControlModel;
  @Input('first') isfirst = true;
  @Input('last') islast = true;
  @Input() captureing = false;
  @Output() next: EventEmitter<ImageControlModel> = new EventEmitter();
  @Output() prev: EventEmitter<ImageControlModel> = new EventEmitter();
  @Output() play: EventEmitter<ImageControlModel> = new EventEmitter();
  @Output() videodownload: EventEmitter<ImageControlModel> = new EventEmitter();
  @Input() operation = true;
  @Input() contain = false;

  constructor(protected download: DownloadBusiness) {}

  img?: string;
  title?: string;
  draw = true;
  display = {
    object: true,
    capture: true,
    download: {
      image: true,
      video: true,
    },
  };

  ngOnInit(): void {
    if (this.model) {
      this.display.object = !!(this.model.polygon && this.model.rules);
      this.display.download.video = !!(
        this.model.stationId && this.model.eventTime
      );
      this.display.capture = !(this.model.stationId && this.model.eventTime);
    }
  }

  displayConfig(model?: ImageControlModel) {
    if (model) {
      this.display.object = !!(model.polygon || model.rules);
      this.display.download.image = true;
      if (model.eventTime) {
        this.display.download.video = true;
      } else {
      }
    } else {
      this.display.object = false;
      this.display.download.image = false;
      this.display.download.video = false;
    }
  }

  onplay(event: Event) {
    this.play.emit(this.model);
  }

  async onimagedownload() {
    if (this.model) {
      if (this.model) {
        let time = this.model.eventTime ?? new Date();
        let src = await this.model.src;
        this.download.image(src, this.model.name, time);
      }
    }
  }

  async onvideodownload() {
    if (this.model) {
      if (this.model && this.model && this.model.eventTime) {
        let interval = DurationParams.beforeAndAfter(this.model.eventTime);
        if (this.model.stationId) {
          this.download.video(this.model.stationId, this.model.id, interval);
        }
      }
    }
  }

  onprev() {
    this.prev.emit();
  }
  onnext() {
    this.next.emit();
  }

  ondrawchange(draw: any) {
    this.draw = draw;
  }
}
