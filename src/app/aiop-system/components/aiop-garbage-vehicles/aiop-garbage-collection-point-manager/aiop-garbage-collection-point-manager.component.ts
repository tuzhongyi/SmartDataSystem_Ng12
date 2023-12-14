import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { AIOPGarbageCollectionPointTableArgs } from 'src/app/common/components/tables/aiop-garbage-collection-point-table/aiop-garbage-collection-point-table.model';
import {
  FileReadType,
  FileResult,
} from 'src/app/common/components/upload-control/upload-control.model';
import { Creater } from 'src/app/common/tools/creater';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { CollectionPoint } from 'src/app/network/model/garbage-station/collection-point.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { AIOPGarbageCollectionPointManagerBusiness } from './aiop-garbage-collection-point-manager.business';
import {
  IGarbageCollectionPointBusiness,
  IGarbageCollectionPointComponent,
} from './aiop-garbage-collection-point-manager.model';

@Component({
  selector: 'aiop-garbage-collection-point-manager',
  templateUrl: './aiop-garbage-collection-point-manager.component.html',
  styleUrls: ['./aiop-garbage-collection-point-manager.component.less'],
  providers: [AIOPGarbageCollectionPointManagerBusiness],
})
export class AIOPGarbageCollectionPointManagerComponent
  implements IGarbageCollectionPointComponent, OnInit
{
  @Input()
  business: IGarbageCollectionPointBusiness;
  constructor(
    business: AIOPGarbageCollectionPointManagerBusiness,
    private toastr: ToastrService
  ) {
    this.business = business;
  }

  FileReadType = FileReadType;

  state: FormState = FormState.none;
  args = new AIOPGarbageCollectionPointTableArgs();
  load: EventEmitter<AIOPGarbageCollectionPointTableArgs> = new EventEmitter();
  open: EventEmitter<CollectionPoint> = new EventEmitter();
  enabled = {
    add: false,
    delete: false,
  };

  dialog = new ConfirmDialogModel('确认删除', '删除该项');

  private _selected: CollectionPoint[] = [];
  public get selecteds(): CollectionPoint[] {
    return this._selected;
  }
  public set selecteds(v: CollectionPoint[]) {
    this._selected = v;
    this.enabled.delete = this._selected && this._selected.length > 0;
  }

  ngOnInit(): void {}
  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    if (nodes && nodes.length > 0) {
      let division = nodes[0].RawData as Division;
      this.args.divisionId = division.Id;
      this.enabled.add = !!this.args.divisionId;
      this.args.tofirst = true;
      this.load.emit(this.args);
    }
  }

  tocreate() {
    this.open.emit(Creater.CollectionPoint());
    this.state = FormState.add;
  }
  toupdate(model: CollectionPoint) {
    this.business.get(model.Id).then((point) => {
      this.open.emit(point);
      this.state = FormState.edit;
    });
  }
  todelete() {
    this.dialog.content = `删除${this.selecteds.length}个选项?`;
    this.dialog.show = true;
  }
  onsearch(name: string) {
    this.args.name = name ? name : undefined;
    this.args.tofirst = true;
    this.load.emit(this.args);
  }

  onyes(model: CollectionPoint) {
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
        .delete(this.selecteds.map((x) => x.Id))
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

  oncreate(model: CollectionPoint) {
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
  onupdate(model: CollectionPoint) {
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

  async onupload(data: FileResult) {
    let result = await this.business.upload(data).then((x) => {
      this.args.tofirst = false;
      this.load.emit(this.args);
    });
  }
  ondownload() {
    this.business.download();
  }
}