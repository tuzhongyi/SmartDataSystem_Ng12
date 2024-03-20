import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { AIGarbageStationDeviceDetailsBusiness } from './ai-garbage-station-device-details.business';

@Component({
  selector: 'app-ai-garbage-station-device-details',
  templateUrl: './ai-garbage-station-device-details.component.html',
  styleUrls: ['./ai-garbage-station-device-details.component.less'],
  providers: [AIGarbageStationDeviceDetailsBusiness],
})
export class AIGarbageStationDeviceDetailsComponent implements OnInit {
  @Input()
  model?: AIGarbageDevice;
  @Output()
  ok: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  constructor(private business: AIGarbageStationDeviceDetailsBusiness) {}
  ngOnInit(): void {}

  oncancel() {
    this.cancel.emit();
  }
  onok() {
    if (this.model) {
      this.business.update(this.model);
      this.ok.emit(this.model);
    }
  }
}
