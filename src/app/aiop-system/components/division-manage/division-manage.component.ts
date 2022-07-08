import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TreeBusinessEnum } from 'src/app/enum/tree-business.enum';
import { DivisionManageBusiness } from './division-manage.business';
import { TreeComponent } from 'src/app/common/components/tree/tree.component';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormState } from 'src/app/enum/form-state.enum';
import { Language } from 'src/app/common/tools/language';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { DivisionManageModel } from 'src/app/view-model/division-manange.model';
import { ConfirmDialogEnum } from 'src/app/enum/confim-dialog.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { DivisionTreeConverter, DivisionTreeSource } from "src/app/converter/division-tree.converter"
import { DivisionTreeComponent } from 'src/app/common/components/division-tree/division-tree.component';


@Component({
  templateUrl: './division-manage.component.html',
  styleUrls: ['division-manage.component.less'],
  providers: [DivisionManageBusiness],
})
export class DivisionManageComponent implements OnInit, AfterViewInit {

  private _currentNode?: CommonFlatNode<DivisionTreeSource>;
  private _resourceType: UserResourceType = UserResourceType.None;

  //树
  showStation = false;
  holdStatus = false;




  // 表单
  FormState = FormState;
  state: FormState = FormState.none;
  addPlaceHolder = '';
  showDialog = false;

  myForm = new FormGroup({
    Id: new FormControl('', [Validators.required, Validators.pattern(/^[\d]+$/)]),
    Name: new FormControl('', Validators.required),
    ParentName: new FormControl(''),
    Description: new FormControl('')
  });


  get title() {
    if (this.state == FormState.none) {
      let normal = this._resourceType == UserResourceType.None ? Language.UserResourceType(UserResourceType.City) : Language.UserResourceType(this._resourceType)
      return normal + '详情'
    } else if (this.state == FormState.add) {
      let add = Language.UserResourceType(EnumHelper.GetResourceChildType(this._resourceType));
      return '添加' + add;
    } else if (this.state == FormState.edit) {
      let edit = this._resourceType == UserResourceType.None ? Language.UserResourceType(UserResourceType.City) : Language.UserResourceType(this._resourceType)
      return '编辑' + edit;
    }
    return ''

  }

  get type() {
    if (this._currentNode) {
      if (this._currentNode.RawData instanceof GarbageStation) {
        return UserResourceType.Station
      } else {
        return EnumHelper.ConvertDivisionToUserResource(this._currentNode.RawData.DivisionType)
      }
    }
    return UserResourceType.None
  }
  get enableAddBtn() {
    return !this._currentNode || this.type == UserResourceType.City || this.type == UserResourceType.County;
  }
  get enableDelBtn() {
    return (
      !!this._currentNode &&
      this.type != UserResourceType.None &&
      this.type != UserResourceType.Station
    );
  }

  get enableEditBtn() {
    return (
      !!this._currentNode &&
      this.type != UserResourceType.None &&
      this.type != UserResourceType.Station
    );
  }

  @ViewChild(DivisionTreeComponent) tree?: DivisionTreeComponent;

  get Id() {
    return this.myForm.get('Id') as FormControl;
  }
  get Name() {
    return this.myForm.get('Name') as FormControl
  }
  get ParentName() {
    return this.myForm.get('ParentName') as FormControl
  }
  get Description() {
    return this.myForm.get('Description') as FormControl
  }

  constructor(
    private _business: DivisionManageBusiness,
    private _toastrService: ToastrService,
    private _converter: DivisionTreeConverter,
  ) { }

  ngOnInit(): void {
    this.myForm.disable();
  }

  ngAfterViewInit(): void {

  }
  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]): void {
    this._currentNode = nodes[0];
    console.log('外部结果', nodes)
    this.state = FormState.none;
    this._resourceType = this.type
    this.holdStatus = false;
    this._updateForm();
  }

  addBtnClick() {
    if (this.state == FormState.add) return
    this.holdStatus = true;
    this.addPlaceHolder = '请填写数字';
    this.state = FormState.add;
    this._updateForm();
  }
  editBtnClick() {
    if (this.state == FormState.edit) return
    this.holdStatus = true;
    this.state = FormState.edit;
    this._updateForm();
    console.log('edit')

  }
  deleteBtnClick() {
    this.showDialog = true;
    console.log('delete')

  }
  async dialogMsgEvent(status: ConfirmDialogEnum) {
    this.showDialog = false;
    if (status == ConfirmDialogEnum.confirm) {
      this._deleteNode()
    } else if (status == ConfirmDialogEnum.cancel) {

    }
  }

  onSubmit() {
    if (this.Id.invalid) {
      if (this.Id.errors && 'required' in this.Id.errors) {
        this._toastrService.error('请输入区划ID');
        return;
      }
      if (this.Id.errors && 'pattern' in this.Id.errors) {
        this._toastrService.error('区划ID为数字')
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
    }
    else if (this.state == FormState.edit) {
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
          Description: data.Description ?? ''
        })
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
        })
      }
    } else if (this.state == FormState.edit) {
      this.myForm.disable();

      if (this._currentNode) {
        let data = this._currentNode.RawData;
        this.myForm.patchValue({
          Name: this._currentNode.Name,
          Id: this._currentNode.Id,
          ParentName: this._currentNode.ParentNode?.Name ?? '',
          Description: data.Description ?? ''
        })
        this.Name.enable();
        this.Description.enable();
      }

    }
  }


  private async _addNode() {
    if (this.tree) {
      let id = this.Id.value
      let name = this.Name.value
      let des = this.Description.value
      let model = new DivisionManageModel(id + '', name, des);
      let parentId = this._currentNode ? this._currentNode.Id : '';
      let res = await this._business.addDivision(parentId, model);
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
      let id = this.Id.value
      let name = this.Name.value
      let des = this.Description.value
      let model = new DivisionManageModel(id + '', name, des);
      let res = await this._business.editDivision(id, model);
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

      let res = await this._business.deleteDivision(this._currentNode.Id);
      if (res) {
        this.tree.deleteNode(this._currentNode);
        this._toastrService.success('删除成功');
      }
    }
  }
}
