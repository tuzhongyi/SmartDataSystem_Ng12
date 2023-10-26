import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { Enum } from 'src/app/enum/enum-helper';
import { CollectionPoint } from 'src/app/network/model/garbage-station/collection-point.model';

@Component({
  selector: 'garbage-collection-point-details-window',
  templateUrl: './garbage-collection-point-details-window.component.html',
  styleUrls: ['./garbage-collection-point-details-window.component.less'],
})
export class GarbageCollectionPointDetailsWindowComponent
  extends WindowComponent
  implements OnInit
{
  @Input()
  open?: EventEmitter<CollectionPoint>;
  @Output()
  no: EventEmitter<void> = new EventEmitter();
  @Output()
  yes: EventEmitter<CollectionPoint> = new EventEmitter();

  constructor() {
    super();
    this.style.width = '800px';
    this.style.height = 'auto';
  }

  model?: CollectionPoint;
  classifications: CollectionPointClassification[] = [];

  ngOnInit(): void {
    if (this.open) {
      this.open.subscribe((x) => {
        this.model = x;
        this.Model.show = true;
      });
    }
    this.initClassifications();
  }

  initClassifications() {
    let e = new Enum(CollectionPointClassification);
    let array = e.toArray();
    array.forEach((x) => {
      this.classifications.push(x);
    });
  }

  onyes() {
    this.yes.emit(this.model);
    this.Model.show = false;
  }
  oncancel() {
    this.no.emit();
    this.Model.show = false;
  }
}
