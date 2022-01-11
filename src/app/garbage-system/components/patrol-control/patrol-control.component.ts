import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';

import { PatrolControlBusiness } from './patrol-control.business';
import {
  PatrolControlModel,
  PatrolIntervalControl,
} from './patrol-control.model';

@Component({
  selector: 'app-patrol-control',
  templateUrl: './patrol-control.component.html',
  styleUrls: ['./patrol-control.component.less'],
  providers: [PatrolControlBusiness],
})
export class PatrolControlComponent implements OnInit {
  OnlineStatus = OnlineStatus;

  selected?: PatrolControlModel;

  models?: PatrolControlModel[];
  index = 0;

  manualCaptureing = false;

  interval = new PatrolIntervalControl();

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  @Output()
  fullscreen: EventEmitter<void> = new EventEmitter();

  constructor(private business: PatrolControlBusiness) {}

  async ngOnInit() {
    for (let i = 1; i <= 4; i++) {
      let time = 30 * i;
      let item = new SelectItem({
        key: time.toString(),
        value: time,
        language: time + 's',
      });
      this.interval.times.push(item);
    }

    this.business.manualCaptureEvent.subscribe((x) => {
      this.manualCaptureing = x;
    });
    this.models = await this.business.load();
    if (this.models.length > 0) {
      this.selected = this.models[this.index];
    }

    this.run();
  }

  async prev(event?: Event) {
    if (this.models) {
      this.index--;
      if (this.index < 0) {
        this.index = this.models.length - 1;
      }
      this.selected = this.models[this.index];
      this.selected.media = await this.business.manualCapture(this.selected);
    }
  }
  async next(event?: Event) {
    if (this.models) {
      this.index++;
      if (this.index >= this.models.length) {
        this.index = 0;
      }
      this.selected = this.models[this.index];
      this.selected.media = await this.business.manualCapture(this.selected);
    }
  }

  async onreflush() {
    if (this.selected) {
      this.selected.media = await this.business.manualCapture(this.selected);
    }
  }
  onfullscreen() {
    this.fullscreen.emit();
  }
  onclose() {
    this.close.emit();
  }

  run() {
    this.interval.runing = true;
    this.interval.handle = setInterval(() => {
      this.next();
    }, this.interval.time * 1000);
  }
  stop() {
    this.interval.runing = false;
    if (this.interval.handle) {
      clearInterval(this.interval.handle);
    }
  }

  timeSelect(item: SelectItem) {
    this.interval.time = item.value;
    this.stop();
    this.run();
  }
}
