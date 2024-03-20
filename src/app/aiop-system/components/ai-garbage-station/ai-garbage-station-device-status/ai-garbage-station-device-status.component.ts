import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { isEmpty } from 'src/app/common/tools/tool';
import { DeviceError } from 'src/app/network/model/ai-garbage/device-error.model';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { GCHAStatus } from 'src/app/network/model/ai-garbage/gcha-status.model';
import { RobotStatus } from 'src/app/network/model/ai-garbage/robot-status.model';

@Component({
  selector: 'ai-garbage-station-device-status',
  templateUrl: './ai-garbage-station-device-status.component.html',
  styleUrls: ['./ai-garbage-station-device-status.component.less'],
})
export class AiGarbageStationDeviceStatusComponent implements OnInit {
  @Input() model?: AIGarbageDevice;
  constructor() {}

  robots?: Selection<RobotStatus>;
  get robot() {
    if (this.robots) {
      return this.robots.selected;
    }
    return undefined;
  }
  gcha?: GCHAStatus;
  errors?: Selection<DeviceError>;
  get error() {
    if (this.errors) {
      return this.errors.selected;
    }
    return undefined;
  }

  Color = ColorTool;
  Language = Language;
  isEmpty = isEmpty;

  ngOnInit(): void {
    // this.test();
    console.log(this.model);
    this.robots = new Selection(this.model?.Status?.Robots);
    this.robots.change.subscribe((x) => {
      if (x) {
        this.errors = new Selection(x.Errors);
      } else {
        this.errors = undefined;
      }
    });

    this.gcha = this.model?.Status?.GCHAStatus;
  }

  test() {
    if (
      this.model &&
      this.model.Status &&
      this.model.Status.Robots &&
      this.model.Status.Robots.length > 0
    ) {
      let plain = instanceToPlain(this.model.Status.Robots[0]);
      let model = plainToInstance(RobotStatus, plain);
      model.Model = 'test01';
      model.Errors = [];
      for (let i = 0; i < 5; i++) {
        model.Errors.push({
          Code: 400 + i,
          Desc:
            'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' +
            i,
        });
      }
      this.model.Status.Robots.push(model);
    }
  }
}

class Selection<T> {
  constructor(items: T[] = []) {
    this.items = items;
    if (items.length > 0) {
      this.selected = items[0];
    }
  }
  items: T[] = [];
  index = 0;
  private _selected?: T;
  get selected() {
    return this._selected;
  }
  private set selected(value: T | undefined) {
    this._selected = value;
    this.change.emit(value);
  }
  onclick(index: number) {
    this.index = index;
    this.selected = this.items[index];
  }
  change: EventEmitter<T> = new EventEmitter();
}
