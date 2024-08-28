import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { isEmpty } from 'src/app/common/tools/tool';
import { DeviceError } from 'src/app/network/model/ai-garbage/device-error.model';
import { RobotStatus } from 'src/app/network/model/ai-garbage/robot-status.model';

@Component({
  selector: 'ai-garbage-station-device-status-robot',
  templateUrl: './ai-garbage-station-device-status-robot.component.html',
  styleUrls: ['./ai-garbage-station-device-status-robot.component.less'],
})
export class AiGarbageStationDeviceStatusRobotComponent implements OnInit {
  @Input() models?: RobotStatus[];

  constructor() {}

  robots?: Selection<RobotStatus>;
  get robot() {
    if (this.robots) {
      return this.robots.selected;
    }
    return undefined;
  }
  get error() {
    if (this.errors) {
      return this.errors.selected;
    }
    return undefined;
  }

  errors?: Selection<DeviceError>;

  Color = ColorTool;
  Language = Language;
  isEmpty = isEmpty;

  ngOnInit(): void {
    this.robots = new Selection(this.models);
    this.robots.change.subscribe((x) => {
      if (x) {
        this.errors = new Selection(x.Errors);
      } else {
        this.errors = undefined;
      }
    });
  }
  test() {
    if (this.models && this.models.length > 0) {
      let plain = instanceToPlain(this.models[0]);
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
      this.models.push(model);
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
