import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OnlineStatus } from 'src/app/enum/online-status.enum';

import { PatrolControlBusiness } from './patrol-control.business';
import { PatrolControlModel } from './patrol-control.model';

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

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  @Output()
  fullscreen: EventEmitter<void> = new EventEmitter();

  constructor(private business: PatrolControlBusiness) {}

  async ngOnInit() {
    this.models = await this.business.load();
    if (this.models.length > 0) {
      this.selected = this.models[this.index];
    }
  }

  prev(event: Event) {
    if (this.models) {
      this.index--;
      if (this.index < 0) {
        this.index = this.models.length - 1;
      }
      this.selected = this.models[this.index];
    }
  }
  next(event: Event) {
    if (this.models) {
      this.index++;
      if (this.index >= this.models.length) {
        this.index = 0;
      }
      this.selected = this.models[this.index];
    }
  }

  onreflush() {}
  onfullscreen() {
    this.fullscreen.emit();
  }
  onclose() {
    this.close.emit();
  }
}
