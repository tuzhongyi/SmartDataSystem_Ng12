import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { FileReadType } from 'src/app/common/components/upload-control/upload-control.model';
import { Creater } from 'src/app/common/tools/creater';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { Division } from 'src/app/network/model/division.model';
import { CollectionTrashCan } from 'src/app/network/model/trash-can.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { GarbageCollectionPointTrashCanManagerBusiness } from './garbage-collection-point-trashcan-manager.business';
import {
  IGarbageCollectionPointTrashCanManagerBusiness,
  IGarbageCollectionPointTrashCanManagerComponent,
} from './garbage-collection-point-trashcan-manager.model';

@Component({
  selector: 'garbage-collection-point-trashcan-manager',
  templateUrl: './garbage-collection-point-trashcan-manager.component.html',
  styleUrls: ['./garbage-collection-point-trashcan-manager.component.less'],
  providers: [GarbageCollectionPointTrashCanManagerBusiness],
})
export class GarbageCollectionPointTrashCanManagerComponent
  implements IGarbageCollectionPointTrashCanManagerComponent, OnInit
{
  @Input()
  business: IGarbageCollectionPointTrashCanManagerBusiness;
  constructor(
    business: GarbageCollectionPointTrashCanManagerBusiness,
    private toastr: ToastrService
  ) {
    this.business = business;
  }

  ngOnInit(): void {}
  state: FormState = FormState.none;
  load: EventEmitter<string> = new EventEmitter();
  open: EventEmitter<CollectionTrashCan> = new EventEmitter();
  enabled = {
    add: false,
    delete: false,
  };

  divisionId?: string;

  dialog = new ConfirmDialogModel('确认删除', '删除该项');

  private _selected: CollectionTrashCan[] = [];
  public get selected(): CollectionTrashCan[] {
    return this._selected;
  }
  public set selected(v: CollectionTrashCan[]) {
    this._selected = v;
    this.enabled.delete = this._selected && this._selected.length > 0;
  }

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    let division = nodes[0].RawData as Division;
    this.divisionId = division.Id;
    this.enabled.add = !!this.divisionId;
  }

  tocreate() {
    this.open.emit(Creater.CollectionTrashCan());
    this.state = FormState.add;
  }
  toupdate(model: CollectionTrashCan) {
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
    this.load.emit(name);
  }

  onyes(model: CollectionTrashCan) {
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
          this.load.emit();
        })
        .catch((x) => {
          this.toastr.warning('删除失败');
        });
    }
    this.dialog.show = false;
  }

  oncreate(model: CollectionTrashCan) {
    model.DivisionId = this.divisionId;
    this.business
      .create(model)
      .then((x) => {
        this.toastr.success('创建成功');
        this.load.emit();
      })
      .catch((x) => {
        this.toastr.warning('创建失败');
      });
  }
  onupdate(model: CollectionTrashCan) {
    this.business
      .update(model)
      .then((x) => {
        this.toastr.success('修改成功');
        this.load.emit();
      })
      .catch((x) => {
        this.toastr.warning('修改失败');
      });
  }
  FileReadType = FileReadType;
  onupload(data: any) {
    this.business.upload(data).then((x) => {
      this.load.emit();
    });
  }
  ondownload() {
    this.business.download();
  }
}
