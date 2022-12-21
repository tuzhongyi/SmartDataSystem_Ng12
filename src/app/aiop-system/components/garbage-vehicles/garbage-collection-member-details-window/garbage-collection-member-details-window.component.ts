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
import { CollectionMember } from 'src/app/network/model/member.model';

@Component({
  selector: 'garbage-collection-member-details-window',
  templateUrl: './garbage-collection-member-details-window.component.html',
  styleUrls: ['./garbage-collection-member-details-window.component.less'],
})
export class GarbageCollectionMemberDetailsWindowComponent
  extends WindowComponent
  implements OnInit, OnChanges
{
  @Input()
  open?: EventEmitter<CollectionMember>;
  @Output()
  no: EventEmitter<void> = new EventEmitter();
  @Output()
  yes: EventEmitter<CollectionMember> = new EventEmitter();

  constructor(private toastr: ToastrService) {
    super();
    this.style.width = '800px';
    this.style.height = 'auto';
  }

  model?: CollectionMember;

  ngOnInit(): void {}
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

  onNoChanged(value: any) {
    if (this.model) {
      this.model.No = value;
    }
  }

  check() {
    if (this.model) {
      if (!this.model.Name) {
        this.toastr.warning('请填写姓名');
        return false;
      }
      if (!this.model.MobileNo) {
        this.toastr.warning('请填写手机号码');
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
