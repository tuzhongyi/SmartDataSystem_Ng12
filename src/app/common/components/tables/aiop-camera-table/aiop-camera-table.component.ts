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
import { IModel } from 'src/app/network/model/model.interface';
import { AICameraModel } from 'src/app/view-model/ai-camera.model';

import { AiopCameraTableBusiness } from './aiop-camera-table.business';

@Component({
  selector: 'aiop-camera-table',
  templateUrl: './aiop-camera-table.component.html',
  styleUrls: ['../table.less', './aiop-camera-table.component.less'],
  providers: [AiopCameraTableBusiness],
})
export class AiopCameraTableComponent
  implements IComponent<IModel, AICameraModel[]>, OnInit, OnChanges
{
  @Input()
  business: IBusiness<IModel[], AICameraModel[]>;
  @Input()
  condition?: string;
  @Input()
  selected: AICameraModel[] = [];
  @Output()
  selectedChange: EventEmitter<AICameraModel[]> = new EventEmitter();

  constructor(business: AiopCameraTableBusiness) {
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.condition && !changes.condition.firstChange) {
      this.loadData(this.condition);
    }
  }

  widths = ['40%', '30%', '30%'];

  datas: AICameraModel[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadData(this.condition);
  }

  async loadData(condition?: string) {
    this.loading = true;
    this.business.load(condition).then((datas) => {
      this.loading = false;
      this.datas = datas;
    });
  }

  onselect(item: AICameraModel) {
    let index = this.selected.indexOf(item);
    if (index < 0) {
      this.selected.push(item);
    } else {
      this.selected.splice(index, 1);
    }
    this.selectedChange.emit(this.selected);
  }
}
