import { EventEmitter, Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { IEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-event-record.model';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { Paged } from 'src/app/view-model/paged.model';

@Injectable()
export class MonitorRecordHandleCompleteWindowBusiness extends WindowViewModel {
  constructor() {
    super();
  }
  style = {
    height: '822px',
    width: '60%',
    padding: '10px 20px',

    transform: 'translate(-50%, -48%)',
  };

  load = new EventEmitter<IEventRecord>();

  paged = new Paged<IEventRecord>();

  data = {
    get: new EventEmitter<Page>(),
    got: (paged: PagedList<IEventRecord>) => {
      this.paged.Page = paged.Page;
      if (paged.Data && paged.Data.length > 0) {
        this.paged.Data = paged.Data[0];
      }
    },
  };
  get first() {
    if (this.paged.Page) {
      return this.paged.Page.PageIndex === 1;
    }
    return false;
  }
  get last() {
    if (this.paged.Page) {
      return this.paged.Page.PageIndex === this.paged.Page.TotalRecordCount;
    }
    return false;
  }
  onnext() {
    if (this.paged.Page) {
      this.paged.Page.PageIndex++;
      this.data.get.emit(this.paged.Page);
    }
  }
  onprev() {
    if (this.paged.Page) {
      this.paged.Page.PageIndex--;
      this.data.get.emit(this.paged.Page);
    }
  }
}
