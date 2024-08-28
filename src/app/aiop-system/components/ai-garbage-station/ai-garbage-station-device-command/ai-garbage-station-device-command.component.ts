import { Component, Input, OnInit } from '@angular/core';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';

@Component({
  selector: 'app-ai-garbage-station-device-command',
  templateUrl: './ai-garbage-station-device-command.component.html',
  styleUrls: ['./ai-garbage-station-device-command.component.less'],
})
export class AIGarbageStationDeviceCommandComponent implements OnInit {
  @Input() model?: AIGarbageDevice;

  constructor() {}

  ngOnInit(): void {}
}
