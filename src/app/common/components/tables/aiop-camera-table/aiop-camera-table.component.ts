import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { AICameraModel } from 'src/app/view-model/ai-camera.model';

import { AiopCameraTableBusiness as AIOPCameraTableBusiness } from './aiop-camera-table.business';
import { AiopCameraTableArgs as AIOPCameraTableArgs } from './aiop-camera-table.model';
import { AiopCameraTableService as AIOPCameraTableService } from './aiop-camera-table.service';

@Component({
  selector: 'aiop-camera-table',
  templateUrl: './aiop-camera-table.component.html',
  styleUrls: ['./aiop-camera-table.component.less'],
  providers: [AIOPCameraTableService, AIOPCameraTableBusiness],
})
export class AIOPCameraTableComponent
  implements IComponent<IModel, AICameraModel[]>, OnInit
{
  @Input() business: IBusiness<IModel[], AICameraModel[]>;
  @Input() args = new AIOPCameraTableArgs();
  @Input() load?: EventEmitter<AIOPCameraTableArgs>;
  @Input() init = true;

  @Input() selected: Map<string, AICameraModel> = new Map();
  @Output() selectedChange: EventEmitter<Map<string, AICameraModel>> =
    new EventEmitter();
  @Output() loaded: EventEmitter<AICameraModel[]> = new EventEmitter();

  constructor(business: AIOPCameraTableBusiness) {
    this.business = business;
  }

  widths = ['40%', '20%', '40%'];

  datas: AICameraModel[] = [];
  loading = false;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData();
      });
    }
    if (this.init) {
      this.loadData();
    }
  }

  async loadData() {
    this.loading = true;
    this.business.load(this.args).then((datas) => {
      this.datas = datas;
      this.loading = false;
      this.loaded.emit(this.datas);
    });
  }

  onselect(item: AICameraModel) {
    if (this.selected.has(item.Id)) {
      this.selected.delete(item.Id);
    } else {
      this.selected.set(item.Id, item);
    }
    this.selectedChange.emit(this.selected);
  }
}
