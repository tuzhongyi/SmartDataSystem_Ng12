import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Enum } from 'src/app/enum/enum-helper';
import { Gender } from 'src/app/enum/gender.enum';
import { AbstractSelectComponent } from './select.component.a';

@Component({
  selector: 'gender-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class GenderSelectComponent extends AbstractSelectComponent<Gender> {
  init(): void {
    let e = new Enum(Gender);
    let array = e.toArray();
    array.unshift(undefined);
    array.forEach((x) => {
      this.models.push(x);
    });
  }

  language(models: Gender[]): string[] {
    return models.map((x) => {
      return Language.Gender(x);
    });
  }
}
