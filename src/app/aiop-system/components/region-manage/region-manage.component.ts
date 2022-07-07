import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TreeComponent } from 'src/app/common/components/tree/tree.component';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { ConfirmDialogEnum } from 'src/app/enum/confim-dialog.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { TreeBusinessEnum } from 'src/app/enum/tree-business.enum';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { RegionManageModel } from 'src/app/view-model/region-manage.model';
import { RegionManageBusiness } from './region-manage.business';

@Component({
  selector: 'howell-region-manage',
  templateUrl: './region-manage.component.html',
  styleUrls: ['./region-manage.component.less'],
  providers: [
    RegionManageBusiness
  ]
})
export class RegionManageComponent implements OnInit {
  currentNode?: FlatTreeNode;



  state: FormState = FormState.none;
  FormState = FormState;
  holdStatus = true;

  myForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Description: new FormControl('')
  });
  businessProvider = TreeBusinessEnum.Region;
  showDialog = false;


  @ViewChild('tree') tree?: TreeComponent;


  get title() {
    if (this.state == FormState.none) {
      return '区域详情'
    } else if (this.state == FormState.add) {

      return '添加' + this.currentNode?.name + '下级区域';
    } else if (this.state == FormState.edit) {
      return '编辑' + this.currentNode?.name;
    }
    return ''

  }

  get enableAddBtn() {
    return !!this.currentNode
  }
  get enableDelBtn() {
    return (
      !!this.currentNode && this.currentNode.level != 0
    );
  }

  get enableEditBtn() {
    return !!this.currentNode
  }


  get Name() {
    return this.myForm.get('Name') as FormControl
  }
  get Description() {
    return this.myForm.get('Description') as FormControl
  }



  constructor(private _business: RegionManageBusiness, private _toastrService: ToastrService, private _converter: TreeConverter,
  ) { }

  ngOnInit(): void {
    this.init();
  }
  async init() {

  }
  addBtnClick() {
    if (this.state == FormState.add) return
    this.state = FormState.add;
    this._updateForm();
    console.log('add')
  }
  editBtnClick() {
    if (this.state == FormState.edit) return
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
    console.log('外部结果', nodes)
    this.state = FormState.none;
    // this.resourceType = this.currentNode?.type ?? UserResourceType.None;
    this._updateForm();

  }
  onSubmit() {
    if (this.Name.invalid) {
      if (this.Name.errors && 'required' in this.Name.errors) {
        this._toastrService.error('请输入名称');
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
    this.state = FormState.none;
    this._updateForm();

  }

  private _updateForm() {
    if (this.state == FormState.none) {
      this.myForm.disable();
      this.myForm.setValue({
        Name: this.currentNode?.name ?? '',
        Description: this.currentNode?.description ?? ''
      })

    } else if (this.state == FormState.add) {
      this.myForm.enable();
      if (this.currentNode) {
        this.myForm.reset();

      }
    } else if (this.state == FormState.edit) {
      this.myForm.disable();
      this.myForm.setValue({
        Name: this.currentNode?.name ?? '',
        Description: this.currentNode?.description ?? ''
      })
      this.Name.enable();
      this.Description.enable();
    }
  }

  private async _addNode() {
    // if (this.tree) {
    //   let name = this.Name.value
    //   let des = this.Description.value
    //   let model = new RegionManageModel(name, des);
    //   let parentId = this.currentNode ? this.currentNode.id : '';
    //   let res = await this._business.addRegion(parentId, model);
    //   if (res) {
    //     console.log(res)
    //     this._toastrService.success('添加成功');
    //     const node = this._converter.Convert(res);
    //     this.tree.addNode(node);

    //     this.onReset();
    //   }
    // }
  }
  private async _editNode() {
    // if (this.tree) {

    //   let id = this.currentNode?.id ?? '';;
    //   let name = this.Name.value
    //   let des = this.Description.value
    //   let model = new RegionManageModel(name, des);

    //   let res = await this._business.editRegion(id, model);
    //   if (res) {
    //     console.log(res)
    //     this._toastrService.success('编辑成功');
    //     const node = this._converter.Convert(res);
    //     this.tree.editNode(node);
    //     // 提交成功后，更新数据
    //     if (this.currentNode) {
    //       this.currentNode.name = name;
    //       this.currentNode.description = des;
    //     }
    //     this.onReset();
    //   }
    // }
  }
  private async _deleteNode() {
    // if (this.tree) {
    //   if (this.currentNode?.id) {
    //     let res = await this._business.deleteRegion(this.currentNode.id);
    //     if (res) {
    //       this._toastrService.success('删除成功');
    //       this.tree.deleteNode(res.Id);
    //     }
    //   }
    // }
  }
}
