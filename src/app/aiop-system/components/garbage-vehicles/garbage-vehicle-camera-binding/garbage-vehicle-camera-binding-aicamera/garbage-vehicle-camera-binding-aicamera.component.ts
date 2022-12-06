import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  implements IComponent<IModel, AICamera[]>, OnInit, OnChanges
{
  @Input()
  business: IBusiness<IModel, AICamera[]>;

  @Input()
  selected: AICamera[] = [];
  @Output()
  selectedChange: EventEmitter<AICamera[]> = new EventEmitter();

  constructor(business: GarbageVehicleCameraBindingAICameraBusiness) {
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name && !changes.name.firstChange) {
      this.loadData();
    }
  }

  datas: AICamera[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(name?: string) {
    this.loading = true;
    this.business.load(name).then((datas) => {
      this.loading = false;
      this.datas = datas;
    });
  }

  onselect(e: Event, item: AICamera) {
    let index = this.selected.indexOf(item);
    if (index < 0) {
      this.selected.push(item);
    } else {
      this.selected.splice(index, 1);
    }
    this.selectedChange.emit(this.selected);
    e.stopPropagation();
  }

  onsearch(name: string) {
    this.loadData(name);
  }
}
