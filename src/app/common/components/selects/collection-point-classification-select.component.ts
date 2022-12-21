import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { Enum } from 'src/app/enum/enum-helper';
import { AbstractSelectComponent } from './select.component.a';

@Component({
  selector: 'collection-point-classification-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class CollectionPointClassificationSelectComponent extends AbstractSelectComponent<CollectionPointClassification> {
  init() {
    let e = new Enum(CollectionPointClassification);
    let array = e.toArray();
    array.forEach((x) => {
      this.models.push(x);
    });
    this.selected = CollectionPointClassification.Other;
  }

  language(models: CollectionPointClassification[]): string[] {
    return models.map((x) => {
      return Language.CollectionPointClassification(x);
    });
  }
}
