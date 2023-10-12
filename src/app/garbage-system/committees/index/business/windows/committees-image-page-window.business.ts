import { EventEmitter, Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { CommitteesVideoWindowBusiness } from './committees-video-window.business';

@Injectable()
export class CommitteesIndexImagePageWindowBusiness extends WindowViewModel {
  constructor(private video: CommitteesVideoWindowBusiness) {
    super();
  }
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };

  model?: ImageControlModel;
  page?: Page;

  getData: EventEmitter<Page> = new EventEmitter();
  gotData(paged: PagedList<EventRecordViewModel>) {
    this.page = paged.Page;
    if (paged.Data && paged.Data.length > 0) {
      if (paged.Data[0].images && paged.Data[0].images.length > 0)
        this.model = paged.Data[0].images[0];
    }
  }

  get first() {
    if (this.page) {
      return this.page.PageIndex === 1;
    }
    return false;
  }
  get last() {
    if (this.page) {
      return this.page.PageIndex === this.page.TotalRecordCount;
    }
    return false;
  }

  onvideo() {
    if (this.model) {
      this.video.title = this.model.name;
      this.video.mask = false;
      if (this.model.eventTime) {
        this.video.playback(
          this.model.id,
          DateTimeTool.beforeOrAfter(this.model.eventTime)
        );
      } else {
        this.video.preview(this.model.id);
      }
    }
  }

  onnext() {
    if (this.page) {
      this.page.PageIndex++;
      this.getData.emit(this.page);
    }
  }
  onprev() {
    if (this.page) {
      this.page.PageIndex--;
      this.getData.emit(this.page);
    }
  }
}
