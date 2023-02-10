import { EventEmitter, Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';

@Injectable()
export class MediaSingleWindowBusiness extends WindowViewModel {
  constructor() {
    super();
  }
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };
  camera: Array<Camera | ImageControlModel> = [];
  index: number = -1;
  autoplay = false;

  eventType?: EventType;

  get page() {
    switch (this.eventType) {
      case EventType.IllegalDrop:
      case EventType.MixedInto:
        return true;

      default:
        return false;
    }
  }

  closing: EventEmitter<void> = new EventEmitter();
  playing = false;

  onclosing() {
    try {
      if (this.playing) return;
      this.show = false;
    } finally {
      this.closing.emit();
    }
  }

  onplay() {
    this.playing = true;
  }
  onstop() {
    this.playing = false;
  }

  onnext() {}
  onprev() {}
}
