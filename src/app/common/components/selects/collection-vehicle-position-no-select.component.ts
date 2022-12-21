import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Enum } from 'src/app/enum/enum-helper';
import { VehiclePositionNo } from 'src/app/enum/position-no.enum';
import { AbstractSelectComponent } from './select.component.a';

@Component({
  selector: 'collection-vehicle-position-no-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class CollectionVehiclePositionNoSelectComponent extends AbstractSelectComponent<VehiclePositionNo> {
  init(): void {
    let e = new Enum(VehiclePositionNo);
    let array = e.toArray();
    array.forEach((x) => {
      this.models.push(x);
    });
  }

  language(models: VehiclePositionNo[]): string[] {
    return models.map((x) => {
      return Language.VehiclePositionNo(x);
    });
  }
}
