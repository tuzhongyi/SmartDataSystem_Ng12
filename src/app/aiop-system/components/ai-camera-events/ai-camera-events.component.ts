import { Component, OnInit } from '@angular/core';
import { AiCameraEventsBusiness } from './ai-camera-events.business';

@Component({
  selector: 'howell-ai-camera-events',
  templateUrl: './ai-camera-events.component.html',
  styleUrls: ['./ai-camera-events.component.less'],
  providers: [
    AiCameraEventsBusiness
  ]
})
export class AiCameraEventsComponent implements OnInit {

  constructor(private _business: AiCameraEventsBusiness) { }

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let res = await this._business.init();
    console.log(res)
  }

}
