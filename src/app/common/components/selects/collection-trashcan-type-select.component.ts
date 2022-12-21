import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Enum } from 'src/app/enum/enum-helper';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { AbstractSelectComponent } from './select.component.a';

@Component({
  selector: 'trashcan-type-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class CollectionTrashCanTypeSelectComponent extends AbstractSelectComponent<TrashCanType> {
  init(): void {
    let e = new Enum(TrashCanType);
    let array = e.toArray();
    array.unshift(undefined);
    array.forEach((x) => {
      this.models.push(x);
    });
    this.selected = undefined;
  }

  language(models: TrashCanType[]): string[] {
    return models.map((x) => {
      return Language.TrashCanType(x);
    });
  }
}
