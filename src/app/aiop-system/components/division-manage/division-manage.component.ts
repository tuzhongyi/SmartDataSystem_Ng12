import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { DivisionManageBusiness } from './division-manage.business';
import { TreeComponent } from 'src/app/common/components/tree/tree.component';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { TreeSelectEnum } from 'src/app/enum/tree-select.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormState } from 'src/app/enum/form-state.enum';
import { Language } from 'src/app/global/tool/language';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { DivisionManageModel } from 'src/app/view-model/division-manange.model';
import { ConfirmDialogEnum } from 'src/app/enum/confim-dialog.enum';


@Component({
  templateUrl: './division-manage.component.html',
  styleUrls: ['division-manage.component.less'],
  providers: [DivisionManageBusiness],
})
export class DivisionManageComponent implements OnInit {
  private _condition: string | Symbol = Symbol.for('DIVISION-TREE');

  // 要屏蔽的搜索字符串
  private _searchGuards: string[] = ['街道', '路居委会'];

  /**
   *  屏蔽: 街,街道,道,居,居委,居委会,委,委会,会
   */
  private _excludeGuards: string[] = [];

  /*****public ********/
  treeServiceModel = TreeServiceEnum.Station;
  treeSelectModel = TreeSelectEnum.Single;
  currentNode?: FlatTreeNode;
  resourceType: UserResourceType = UserResourceType.None;
  myForm = new FormGroup({
    Id: new FormControl('', [Validators.required, Validators.pattern(/^[\d]*$/)]),
    Name: new FormControl('', Validators.required),
    ParentName: new FormControl(''),
    Description: new FormControl('')
  });
  FormState = FormState;
  state: FormState = FormState.none;
  addPlaceHolder = '';
  holdStatus = false;
  showDialog = false;


  get title() {
    if (this.state == FormState.none) {
      let normal = this.resourceType == UserResourceType.None ? Language.UserResourceType(UserResourceType.City) : Language.UserResourceType(this.resourceType)
      return normal + '详情'
    } else if (this.state == FormState.add) {
      let add = Language.UserResourceType(EnumHelper.GetResourceChildType(this.resourceType));
      return '添加' + add;
    } else if (this.state == FormState.edit) {
      let edit = this.resourceType == UserResourceType.None ? Language.UserResourceType(UserResourceType.City) : Language.UserResourceType(this.resourceType)
      return '编辑' + edit;
    }
    return ''

  }

  get enableAddBtn() {
    return (
      !this.currentNode ||
      this.currentNode?.type == UserResourceType.City ||
      this.currentNode?.type == UserResourceType.County
    );
  }
  get enableDelBtn() {
    return (
      !!this.currentNode &&
      this.currentNode.type != UserResourceType.None &&
      this.currentNode.type != UserResourceType.Station
    );
  }

  get enableEditBtn() {
    return (
      !!this.currentNode &&
      this.currentNode.type != UserResourceType.None &&
      this.currentNode.type != UserResourceType.Station
    );
  }

  @ViewChild('tree') tree?: TreeComponent;

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
    private _converter: TreeConverter
  ) {
    this._searchGuards.reduce((previous, current) => {
      previous.push(...this._generateExclude(current));
      return previous;
    }, this._excludeGuards);
  }

  ngOnInit(): void {
    this.myForm.disable();
  }


  addBtnClick() {
    if (this.state == FormState.add) return
    this.holdStatus = true;
    this.addPlaceHolder = '请填写数字';
    this.state = FormState.add;
    this._updateForm();
    console.log('add')
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

  // 点击树节点
  selectTreeNode(nodes: FlatTreeNode[]) {
    this.currentNode = nodes[0];
    console.log(' currentnNode:', this.currentNode)
    this.state = FormState.none;
    this.resourceType = this.currentNode?.type ?? UserResourceType.None;
    this._updateForm();

  }
  onReset() {
    this.holdStatus = false;
    this.state = FormState.none;
    this.addPlaceHolder = '';
    this._updateForm();

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


  private _updateForm() {
    if (this.state == FormState.none) {
      this.myForm.disable();
      this.myForm.setValue({
        Name: this.currentNode?.name ?? '',
        Id: this.currentNode?.id ?? '',
        ParentName: this.currentNode?.parentNode?.name ?? '',
        Description: this.currentNode?.description ?? ''
      })

    } else if (this.state == FormState.add) {
      this.myForm.enable();
      this.ParentName.disable();
      if (this.currentNode) {
        this.myForm.reset();
        this.myForm.patchValue({
          ParentName: this.currentNode.name ?? ''
        })
      }
    } else if (this.state == FormState.edit) {
      this.myForm.disable();
      this.myForm.setValue({
        Name: this.currentNode?.name ?? '',
        Id: this.currentNode?.id ?? '',
        ParentName: this.currentNode?.parentNode?.name ?? '',
        Description: this.currentNode?.description ?? ''
      })
      this.Name.enable();
      this.Description.enable();
    }
  }


  private async _addNode() {
    if (this.tree) {
      let id = this.Id.value
      let name = this.Name.value
      let des = this.Description.value
      let model = new DivisionManageModel(id + '', name, des);
      let parentId = this.currentNode ? this.currentNode.id : '';
      let res = await this._business.addDivision(parentId, model);
      if (res) {
        this._toastrService.success('添加成功');
        const node = this._converter.Convert(model);
        node.parentId = parentId;
        node.type = EnumHelper.ConvertDivisionToUserResource(res.DivisionType);
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
        const node = this._converter.Convert(model);
        this.tree.editNode(node);
        // 提交成功后，更新数据
        if (this.currentNode) {
          this.currentNode.name = name;
          this.currentNode.description = des;
        }
        this.onReset();
      }
    }
  }
  private async _deleteNode() {
    if (this.tree) {
      if (this.currentNode?.id) {
        let res = await this._business.deleteDivision(this.currentNode.id);
        if (res) {
          this._toastrService.success('删除成功');
          this.tree.deleteNode(res.Id);
        }
      }
    }
  }

  async searchEventHandler(condition: string) {

    if (this._condition == condition && this._condition != '') {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }
    if (this._excludeGuards.includes(condition)) {
      this._toastrService.warning('关键字不能是: ' + condition);
      return;
    }

    this._condition = condition;

    if (this.tree) {
      let res = await this.tree.searchNode(condition);
      if (res && res.length) {
        this._toastrService.success('操作成功');
      } else {
        this._toastrService.warning('无匹配结果');
      }
    }
  }


  private _generateExclude(condition: string) {
    let res: string[] = [];
    for (let i = 0; i < condition.length; i++) {
      let len = condition.length - i;
      let temp = '';
      for (let j = 0; j < len; j++) {
        temp += condition[i + j];
        res.push(temp);
      }
    }

    return res;
  }
}
