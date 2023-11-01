import { Component, Input, OnInit } from '@angular/core';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';

@Component({
  selector: 'ai-garbage-station-device-status',
  templateUrl: './ai-garbage-station-device-status.component.html',
  styleUrls: ['./ai-garbage-station-device-status.component.less'],
})
export class AiGarbageStationDeviceStatusComponent implements OnInit {
  @Input() model?: AIGarbageDevice;
  constructor() {}

  ngOnInit(): void {}
}
