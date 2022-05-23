import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecordCardModel } from './event-record-card.model';

@Component({
  selector: 'howell-event-record-card',
  templateUrl: './event-record-card.component.html',
  styleUrls: ['./event-record-card.component.less']
})
export class EventRecordCardComponent implements OnInit {

  @Input()
  model: EventRecordCardModel = new EventRecordCardModel()

  @Output()
  playVideo: EventEmitter<EventRecordCardModel> = new EventEmitter();
  @Output()
  downloadImage: EventEmitter<EventRecordCardModel> = new EventEmitter();
  @Output()
  downloadVideo: EventEmitter<EventRecordCardModel> = new EventEmitter();
@Output()
cardClick: EventEmitter<EventRecordCardModel> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }

  private _dateFormat = ""
  get dateFormat() {
    if (!this._dateFormat) {
      this._dateFormat = formatDate(this.model.time, "HH:mm", "en");
    }
    return this._dateFormat;


  }
  onCardClick(event:Event){
    this.cardClick.emit(this.model);
    event.cancelBubble = true;
  }
  onPlayVideo(event:Event) {
    this.playVideo.emit(this.model);
    event.cancelBubble = true;
  }
  onDownloadImage(event:Event) {
    this.downloadImage.emit(this.model);
    event.cancelBubble = true;
  }
  onDownloadVideo(event:Event) {
    this.downloadVideo.emit(this.model);
    event.cancelBubble = true;
  }


}
