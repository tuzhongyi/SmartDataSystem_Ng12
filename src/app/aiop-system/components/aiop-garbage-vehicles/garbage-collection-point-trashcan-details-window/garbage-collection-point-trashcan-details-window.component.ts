import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { CollectionTrashCan } from 'src/app/network/model/garbage-station/trash-can.model';

@Component({
  selector: 'garbage-collection-point-trashcan-details-window',
  templateUrl:
    './garbage-collection-point-trashcan-details-window.component.html',
  styleUrls: [
    './garbage-collection-point-trashcan-details-window.component.less',
  ],
})
export class GarbageCollectionPointTrashcanDetailsWindowComponent
  extends WindowComponent
  implements OnInit
{
  @Input()
  open?: EventEmitter<CollectionTrashCan>;
  @Output()
  no: EventEmitter<void> = new EventEmitter();
  @Output()
  yes: EventEmitter<CollectionTrashCan> = new EventEmitter();

  constructor(private toastr: ToastrService) {
    super();
    this.style.width = '800px';
    this.style.height = 'auto';
  }

  model?: CollectionTrashCan;

  ngOnInit(): void {
    if (this.open) {
      this.open.subscribe((x) => {
        this.model = x;
        this.Model.show = true;
      });
    }
  }

  onMaxVolumeChanged(value: any) {
    if (this.model) {
      this.model.MaxVolume = value;
    }
  }

  check() {
    if (this.model) {
      if (!this.model.Name) {
        this.toastr.warning('请填写名称');
        return false;
      }
    }
    return true;
  }

  onyes() {
    if (this.check()) {
      this.yes.emit(this.model);
      this.Model.show = false;
    }
  }
  oncancel() {
    this.no.emit();
    this.Model.show = false;
  }
}
