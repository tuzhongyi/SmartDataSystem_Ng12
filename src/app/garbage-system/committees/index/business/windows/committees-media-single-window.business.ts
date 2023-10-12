import { EventEmitter, Injectable } from '@angular/core';
import { ImageVideoControlOperation } from 'src/app/common/components/image-video-control/image-video-control.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/view-model/image-control.model';

@Injectable()
export class CommitteesMediaSingleWindowBusiness extends WindowViewModel {
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };
  camera: Array<Camera | ImageControlModel> = [];
  index: number = -1;
  autoplay = false;
  operation = new ImageVideoControlOperation();

  eventType?: EventType;

  pageChange: EventEmitter<Page> = new EventEmitter();

  get showPage() {
    switch (this.eventType) {
      case EventType.IllegalDrop:
      case EventType.MixedInto:
        return true;

      default:
        return false;
    }
  }

  paged?: Page;

  closing: EventEmitter<void> = new EventEmitter();
  playing = false;

  onclosing() {
    try {
      if (this.playing) return;
      this.paged = undefined;
      this.eventType = undefined;
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

  onnext() {
    if (this.paged) {
      this.paged.PageIndex++;
      if (this.paged.PageIndex > this.paged.PageCount) {
        this.paged.PageIndex = 1;
      }
      this.pageChange.emit(this.paged);
    }
  }
  onprev() {
    if (this.paged) {
      this.paged.PageIndex--;
      if (this.paged.PageIndex < 0) {
        this.paged.PageIndex = this.paged.PageCount;
      }
      this.pageChange.emit(this.paged);
    }
  }

  got(record: PagedList<EventRecordViewModel>) {
    if (record.Data && record.Data.length) {
      let data = record.Data[0];
      let array = new ImageControlModelArray(data.images, 0, record);
      this.camera = array.models;
    }
    console.log(record.Page);
  }
}
