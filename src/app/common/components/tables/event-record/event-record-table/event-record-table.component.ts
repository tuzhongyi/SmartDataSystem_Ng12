import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { EventRecordBusiness } from '../event-record.business';
import {
  EventRecordConverter,
  EventRecordPagedConverter
} from '../event-record.converter';
import { EventRecordFilter } from '../event-record.model';
import { VideoDownloadPanelBusiness } from '../video-download-panel.business';

@Component({
  selector: 'howell-event-record-table',
  templateUrl: './event-record-table.component.html',
  providers: [
    EventRecordBusiness,
    EventRecordConverter,
    EventRecordPagedConverter,
    DownloadBusiness,
    VideoDownloadPanelBusiness
  ]
})
export class EventRecordTableComponent {
  @Input() type: EventType = EventType.Sewage;
  @Input() load?: EventEmitter<EventRecordFilter>;
  @Input() filter: EventRecordFilter = new EventRecordFilter();
  @Input() get?: EventEmitter<Page>;
  @Output() got = new EventEmitter<PagedList<EventRecordViewModel>>();
  @Output() video = new EventEmitter<EventRecordViewModel>();
  @Output() image = new EventEmitter<PagedArgs<EventRecordViewModel>>();
  @Output() card = new EventEmitter<EventRecordViewModel>();
  @Output() allvideo = new EventEmitter<EventRecordViewModel>();
  @Output() complete = new EventEmitter<PagedArgs<EventRecordViewModel>>();
  @Output() find = new EventEmitter<EventRecordViewModel>();
  @Input() findable = false;

  EventType = EventType;

  constructor(
    public business: EventRecordBusiness,
    private download: DownloadBusiness,
    public panel: VideoDownloadPanelBusiness
  ) {}

  ongot(args: PagedList<EventRecordViewModel>) {
    this.got.emit(args);
  }
  onvideo(args: EventRecordViewModel) {
    this.video.emit(args);
  }
  onimage(args: PagedArgs<EventRecordViewModel>) {
    this.image.emit(args);
  }
  oncard(model: EventRecordViewModel) {
    this.card.emit(model);
  }

  downloadVideo(model: EventRecordViewModel) {
    this.panel.record = model;
    this.panel.show = true;
  }
  async downloadImage(model: EventRecordViewModel) {
    if (model.images && model.images.length > 0) {
      let src = await model.images[0].src;
      this.download.image(src, model.ResourceName ?? '', model.EventTime);
    }
  }
  onallvideo(model: EventRecordViewModel) {
    this.allvideo.emit(model);
  }
  oncomplete(model: PagedArgs<EventRecordViewModel>) {
    this.complete.emit(model);
  }
  onfind(data: EventRecordViewModel) {
    this.find.emit(data);
  }
}
