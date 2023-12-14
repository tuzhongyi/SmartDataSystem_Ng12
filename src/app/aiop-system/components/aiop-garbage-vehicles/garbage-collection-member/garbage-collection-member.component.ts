import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { AiopGarbageCollectionMemberTableArgs } from 'src/app/common/components/tables/aiop-garbage-collection-member-table/aiop-garbage-collection-member-table.model';
import { FileReadType } from 'src/app/common/components/upload-control/upload-control.model';
import { Creater } from 'src/app/common/tools/creater';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { CollectionMember } from 'src/app/network/model/garbage-station/member.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { GarbageCollectionMemberBusiness } from './garbage-collection-member.business';
import {
  IGarbageCollectionMemberBusiness,
  IGarbageCollectionMemberComponent,
} from './garbage-collection-member.model';

@Component({
  selector: 'garbage-collection-member',
  templateUrl: './garbage-collection-member.component.html',
  styleUrls: ['./garbage-collection-member.component.less'],
  providers: [GarbageCollectionMemberBusiness],
})
export class GarbageCollectionMemberComponent
  implements IGarbageCollectionMemberComponent, OnInit
{
  @Input()
  business: IGarbageCollectionMemberBusiness;

  constructor(
    business: GarbageCollectionMemberBusiness,
    private toastr: ToastrService
  ) {
    this.business = business;
  }

  ngOnInit(): void {}
  state: FormState = FormState.none;
  args = new AiopGarbageCollectionMemberTableArgs();
  load: EventEmitter<AiopGarbageCollectionMemberTableArgs> = new EventEmitter();
  open: EventEmitter<CollectionMember> = new EventEmitter();
  enabled = {
    add: false,
    delete: false,
  };

  dialog = new ConfirmDialogModel('确认删除', '删除该项');

  private _selected: CollectionMember[] = [];
  public get selected(): CollectionMember[] {
    return this._selected;
  }
  public set selected(v: CollectionMember[]) {
    this._selected = v;
    this.enabled.delete = this._selected && this._selected.length > 0;
  }

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    let division = nodes[0].RawData as Division;
    this.args.divisionId = division.Id;
    this.enabled.add = !!this.args.divisionId;
    this.args.tofirst = true;
    this.load.emit(this.args);
  }

  tocreate() {
    this.open.emit(Creater.CollectionMember());
    this.state = FormState.add;
  }
  toupdate(model: CollectionMember) {
    this.business.get(model.Id).then((point) => {
      this.open.emit(point);
      this.state = FormState.edit;
    });
  }
  todelete() {
    this.dialog.content = `删除${this.selected.length}个选项?`;
    this.dialog.show = true;
  }
  onsearch(name: string) {
    this.args.name = name;
    this.args.tofirst = true;
    this.load.emit(this.args);
  }

  onyes(model: CollectionMember) {
    switch (this.state) {
      case FormState.add:
        this.oncreate(model);
        break;
      case FormState.edit:
        this.onupdate(model);
        break;
      default:
        break;
    }
  }

  ondelete(result: DialogEnum) {
    if (result === DialogEnum.confirm) {
      this.business
        .delete(this.selected.map((x) => x.Id))
        .then((x) => {
          this.toastr.success('删除成功');
          this.args.tofirst = false;
          this.load.emit(this.args);
        })
        .catch((x) => {
          this.toastr.warning('删除失败');
        });
    }
    this.dialog.show = false;
  }

  oncreate(model: CollectionMember) {
    model.DivisionId = this.args.divisionId;
    this.business
      .create(model)
      .then((x) => {
        this.toastr.success('创建成功');
        this.args.tofirst = false;
        this.load.emit(this.args);
      })
      .catch((x) => {
        this.toastr.warning('创建失败');
      });
  }
  onupdate(model: CollectionMember) {
    this.business
      .update(model)
      .then((x) => {
        this.toastr.success('修改成功');
        this.args.tofirst = false;
        this.load.emit(this.args);
      })
      .catch((x) => {
        this.toastr.warning('修改失败');
      });
  }
  FileReadType = FileReadType;
  onupload(data: any) {
    this.business.upload(data).then((x) => {
      this.args.tofirst = false;
      this.load.emit(this.args);
    });
  }
  ondownload() {
    this.business.download();
  }
}