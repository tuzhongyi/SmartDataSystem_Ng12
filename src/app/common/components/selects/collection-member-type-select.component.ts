import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Enum } from 'src/app/enum/enum-helper';
import { CollectionMemberType } from 'src/app/enum/member-type.enum';
import { AbstractSelectComponent } from './select.component.a';

@Component({
  selector: 'collection-member-type-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class CollectionMemberTypeSelectComponent extends AbstractSelectComponent<CollectionMemberType> {
  language(models: CollectionMemberType[]): string[] {
    return models.map((x) => {
      return Language.CollectionMemberType(x);
    });
  }
  init() {
    let e = new Enum(CollectionMemberType);
    let array = e.toArray();
    array.forEach((x) => {
      this.models.push(x);
    });
    this.selected = CollectionMemberType.Other;
  }
}
