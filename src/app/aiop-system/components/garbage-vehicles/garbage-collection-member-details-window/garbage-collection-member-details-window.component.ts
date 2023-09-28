import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { CollectionMember } from 'src/app/network/model/member.model';

@Component({
  selector: 'garbage-collection-member-details-window',
  templateUrl: './garbage-collection-member-details-window.component.html',
  styleUrls: ['./garbage-collection-member-details-window.component.less'],
})
export class GarbageCollectionMemberDetailsWindowComponent
  extends WindowComponent
  implements OnInit
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

  ngOnInit(): void {
    if (this.open) {
      this.open.subscribe((x) => {
        this.model = x;
        this.Model.show = true;
      });
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
