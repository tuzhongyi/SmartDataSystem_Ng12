import { Component, Input, OnInit } from '@angular/core';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';

@Component({
  selector: 'app-image-control',
  templateUrl: './image-control.component.html',
  styleUrls: ['./image-control.component.less'],
})
export class ImageControlComponent implements OnInit {
  OnlineStatus = OnlineStatus;

  @Input()
  camera?: Camera;

  src: string = '';

  constructor() {}

  ngOnInit(): void {
    if (this.camera) {
      this.src = MediumRequestService.jpg(this.camera.ImageUrl);
    }
  }

  onError(event: Event) {
    (event.target as HTMLImageElement).src = MediumRequestService.default;
  }
}
