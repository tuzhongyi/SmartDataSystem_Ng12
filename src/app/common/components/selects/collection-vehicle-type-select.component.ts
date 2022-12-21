import { Component } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Enum } from 'src/app/enum/enum-helper';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { AbstractSelectComponent } from './select.component.a';

@Component({
  selector: 'collection-vehicle-type-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class CollectionVehicleTypeSelectComponent extends AbstractSelectComponent<VehicleType> {
  init(): void {
    let e = new Enum(VehicleType);
    let array = e.toArray();
    array.forEach((x) => {
      this.models.push(x);
    });
  }

  language(models: VehicleType[]): string[] {
    return models.map((x) => {
      return Language.VehicleType(x);
    });
  }
}
