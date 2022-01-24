import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';
import { ImageControlModel } from './image-control.model';

@Component({
  selector: 'app-image-control',
  templateUrl: './image-control.component.html',
  styleUrls: ['./image-control.component.less'],
})
export class ImageControlComponent implements OnInit {
  OnlineStatus = OnlineStatus;

  @Input()
  model?: ImageControlModel;

  @Output()
  Click: EventEmitter<ImageControlModel> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onError(event: Event) {
    if (this.model) {
      (event.target as HTMLImageElement).src = this.model.onerror;
    }
  }

  onClick(event: Event) {
    this.Click.emit(this.model);
    event.stopPropagation();
  }
}
