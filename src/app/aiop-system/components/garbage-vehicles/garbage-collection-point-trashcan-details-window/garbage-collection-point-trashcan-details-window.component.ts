import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { Enum } from 'src/app/enum/enum-helper';
import { Gender } from 'src/app/enum/gender.enum';
import { CollectionMemberType } from 'src/app/enum/member-type.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { CollectionTrashCan } from 'src/app/network/model/trash-can.model';

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
  implements OnInit, OnChanges
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

  types: TrashCanType[] = [];

  ngOnInit(): void {
    this.initTypes();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.open) {
      if (this.open) {
        this.open.subscribe((x) => {
          this.model = x;
          this.Model.show = true;
        });
      }
    }
  }

  initTypes() {
    let e = new Enum(TrashCanType);
    let array = e.toArray();
    array.forEach((x) => {
      this.types.push(x);
    });
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
