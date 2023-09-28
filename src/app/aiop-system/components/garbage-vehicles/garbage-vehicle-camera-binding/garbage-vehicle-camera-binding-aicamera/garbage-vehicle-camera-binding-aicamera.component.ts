import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { IModel } from 'src/app/network/model/model.interface';
import { GarbageVehicleCameraBindingAICameraBusiness } from './garbage-vehicle-camera-binding-aicamera.business';

@Component({
  selector: 'garbage-vehicle-camera-binding-aicamera',
  templateUrl: './garbage-vehicle-camera-binding-aicamera.component.html',
  styleUrls: ['./garbage-vehicle-camera-binding-aicamera.component.less'],
  providers: [GarbageVehicleCameraBindingAICameraBusiness],
})
export class GarbageVehicleCameraBindingAICameraComponent
  implements IComponent<IModel, AICamera[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, AICamera[]>;
  @Input()
  canselect: boolean = true;

  @Input()
  selected: AICamera[] = [];
  @Output()
  selectedChange: EventEmitter<AICamera[]> = new EventEmitter();

  @Input()
  load?: EventEmitter<string[]> = new EventEmitter();

  constructor(business: GarbageVehicleCameraBindingAICameraBusiness) {
    this.business = business;
  }

  name?: string;

  datas: AICamera[] = [];
  loading = false;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData(this.name, x);
      });
    }
  }

  loadData(name?: string, filter?: string[]) {
    this.loading = true;
    this.business.load(name).then((datas) => {
      this.loading = false;
      if (filter) {
        datas = datas.filter((x) => !filter.some((id) => x.Id === id));
      }
      this.datas = datas;
    });
  }

  onselect(item: AICamera) {
    if (this.canselect) {
      let index = this.selected.indexOf(item);
      if (index < 0) {
        this.selected.push(item);
      } else {
        this.selected.splice(index, 1);
      }
      this.selectedChange.emit(this.selected);
    }
  }

  onsearch(name: string) {
    this.name = name;
    this.loadData(name);
  }
}
