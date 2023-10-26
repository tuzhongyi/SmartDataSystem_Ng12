import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  DivisionManageModel,
  IDivisionManageComponent,
  TDivisionManageBusiness,
} from 'src/app/aiop-system/components/division-manage/division-manange.model';
import { Language } from 'src/app/common/tools/language';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { FormState } from 'src/app/enum/form-state.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { DivisionManageBusiness } from './division-manage.business';

import { DivisionTreeComponent } from 'src/app/common/components/division-tree/division-tree.component';
import { DivisionTreeConverter } from 'src/app/common/components/division-tree/division-tree.converter';
import {
  DivisionTreeSource,
  IDivisionTreeBusiness,
} from 'src/app/common/components/division-tree/division-tree.model';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { DivisionNode } from 'src/app/network/model/garbage-station/division-tree.model';

@Component({
  selector: 'howell-division-manage',
  templateUrl: './division-manage.component.html',
  styleUrls: ['division-manage.component.less'],
  providers: [DivisionManageBusiness],
})
export class DivisionManageComponent
  implements IDivisionManageComponent, OnInit, AfterViewInit
{
  @Input()
  business: TDivisionManageBusiness;
  @Input()
  treeBusiness?: IDivisionTreeBusiness;

  private _currentNode?: CommonFlatNode<DivisionTreeSource>;

  //树
  showStation = true;
  holdStatus = false;

  selectStrategy = SelectStrategy.Single;
  defaultIds = [];

  // 表单
  FormState = FormState;
  state: FormState = FormState.none;
  addPlaceHolder = '';
  showDialog = false;

  myForm = new FormGroup({
    Id: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\d]+$/),
    ]),
    Name: new FormControl('', Validators.required),
    ParentName: new FormControl(''),
    Description: new FormControl(''),
  });

  get title() {
    if (this.state == FormState.none) {
      let normal =
        this.type == DivisionType.None
          ? Language.DivisionType(DivisionType.City)
          : Language.DivisionType(this.type);
      return normal + '详情';
    } else if (this.state == FormState.add) {
      let child = EnumHelper.GetDivisionChildType(this.type);
      if (this.type === DivisionType.None) {
        child = DivisionType.City;
      }
      let language = Language.DivisionType(child);
      return '添加' + language;
    } else if (this.state == FormState.edit) {
      let language = Language.DivisionType(this.type);
      return '编辑' + language;
    }
    return '';
  }

  get type() {
    if (this._currentNode) {
      if (
        this._currentNode.RawData instanceof Division ||
        this._currentNode.RawData instanceof DivisionNode
      ) {
        return this._currentNode.RawData.DivisionType;
      }
    }
    return DivisionType.None;
  }
  get enableAddBtn() {
    return (
      !this._currentNode ||
      this.type == DivisionType.City ||
      this.type == DivisionType.County
    );
  }
  get enableDelBtn() {
    return !!this._currentNode && this.type != DivisionType.None;
  }

  get enableEditBtn() {
    return !!this._currentNode && this.type != DivisionType.None;
  }

  @ViewChild(DivisionTreeComponent) tree?: DivisionTreeComponent;

  get Id() {
    return this.myForm.get('Id') as FormControl;
  }
  get Name() {
    return this.myForm.get('Name') as FormControl;
  }
  get ParentName() {
    return this.myForm.get('ParentName') as FormControl;
  }
  get Description() {
    return this.myForm.get('Description') as FormControl;
  }

  constructor(
    business: DivisionManageBusiness,
    private _toastrService: ToastrService,
    private _converter: DivisionTreeConverter
  ) {
    this.business = business;
  }

  ngOnInit(): void {
    this.myForm.disable();
  }

  ngAfterViewInit(): void {}
  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]): void {
    this._currentNode = nodes[0];
    console.log('外部结果', nodes);
    this.state = FormState.none;
    this.holdStatus = false;
    this._updateForm();
  }

  addBtnClick() {
    if (this.state == FormState.add) return;
    this.holdStatus = true;
    this.addPlaceHolder = '请填写数字';
    this.state = FormState.add;
    this._updateForm();
  }
  editBtnClick() {
    if (this.state == FormState.edit) return;
    this.holdStatus = true;
    this.state = FormState.edit;
    this._updateForm();
    console.log('edit');
  }
  deleteBtnClick() {
    this.showDialog = true;
    console.log('delete');
  }
  async dialogMsgEvent(status: DialogEnum) {
    this.showDialog = false;
    if (status == DialogEnum.confirm) {
      this._deleteNode();
    } else if (status == DialogEnum.cancel) {
    }
  }

  onSubmit() {
    if (this.Id.invalid) {
      if (this.Id.errors && 'required' in this.Id.errors) {
        this._toastrService.error('请输入区划ID');
        return;
      }
      if (this.Id.errors && 'pattern' in this.Id.errors) {
        this._toastrService.error('区划ID为数字');
        return;
      }
    }
    if (this.Name.invalid) {
      if (this.Name.errors && 'required' in this.Name.errors) {
        this._toastrService.error('请输入区划名称');
        return;
      }
    }
    if (this.state == FormState.add) {
      this._addNode();
    } else if (this.state == FormState.edit) {
      this._editNode();
    }
  }

  onReset() {
    this.holdStatus = false;
    this.state = FormState.none;
    this.addPlaceHolder = '';
    this._updateForm();
  }

  private _updateForm() {
    if (this.state == FormState.none) {
      this.myForm.disable();
      if (this._currentNode) {
        let data = this._currentNode.RawData;
        this.myForm.patchValue({
          Name: this._currentNode.Name,
          Id: this._currentNode.Id,
          ParentName: this._currentNode.ParentNode?.Name ?? '',
          Description: (data as Division).Description ?? '',
        });
      } else {
        this.myForm.reset();
      }
    } else if (this.state == FormState.add) {
      this.myForm.enable();
      this.ParentName.disable();
      if (this._currentNode) {
        this.myForm.reset();
        this.myForm.patchValue({
          ParentName: this._currentNode.ParentNode?.Name ?? '',
        });
      }
    } else if (this.state == FormState.edit) {
      this.myForm.disable();

      if (this._currentNode) {
        let data = this._currentNode.RawData;
        this.myForm.patchValue({
          Name: this._currentNode.Name,
          Id: this._currentNode.Id,
          ParentName: this._currentNode.ParentNode?.Name ?? '',
          Description: (data as Division).Description ?? '',
        });
        this.Name.enable();
        this.Description.enable();
      }
    }
  }

  private async _addNode() {
    if (this.tree) {
      let model = new DivisionManageModel();
      model.Id = this.myForm.getRawValue().Id ?? '';
      model.Name = this.myForm.getRawValue().Name ?? '';
      model.Description = this.myForm.getRawValue().Description ?? '';

      let parentId = this._currentNode ? this._currentNode.Id : '';
      let res = await this.business.create(parentId, model);
      if (res) {
        this._toastrService.success('添加成功');
        const node = this._converter.Convert(res);
        this.tree.addNode(node);
        this.onReset();
      }
    }
  }
  private async _editNode() {
    if (this.tree) {
      let model = new DivisionManageModel();
      model.Id = this.myForm.getRawValue().Id ?? '';
      model.Name = this.myForm.getRawValue().Name ?? '';
      model.Description = this.myForm.getRawValue().Description ?? '';

      let res = await this.business.update(model.Id, model);
      if (res) {
        this._toastrService.success('编辑成功');
        const node = this._converter.Convert(res);
        this.tree.editNode(node);
        this.onReset();
      }
    }
  }
  private async _deleteNode() {
    if (this.tree && this._currentNode) {
      let res = await this.business.delete(this._currentNode.Id);
      if (res) {
        this.tree.deleteNode(this._currentNode);
        this._toastrService.success('删除成功');
      }
    }
  }
}
