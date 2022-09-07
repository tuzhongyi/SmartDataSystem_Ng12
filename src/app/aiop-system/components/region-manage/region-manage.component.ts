import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegionTreeComponent } from 'src/app/common/components/region-tree/region-tree.component';
import { TreeComponent } from 'src/app/common/components/tree/tree.component';
import { RegionTreeConverter, RegionTreeSource } from 'src/app/converter/region-tree.converter';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { TreeBusinessEnum } from 'src/app/enum/tree-business.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
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
  private _currentNode?: CommonFlatNode<RegionTreeSource>;


  state: FormState = FormState.none;
  FormState = FormState;
  holdStatus = true;

  myForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Description: new FormControl('')
  });
  showDialog = false;

  @ViewChild('tree') tree?: RegionTreeComponent;


  get title() {
    if (this.state == FormState.none) {
      return '区域详情'
    } else if (this.state == FormState.add) {

      return '添加' + this._currentNode?.Name + '下级区域';
    } else if (this.state == FormState.edit) {
      return '编辑' + this._currentNode?.Name;
    }
    return ''

  }

  get enableAddBtn() {
    return !!this._currentNode;
  }
  get enableDelBtn() {
    return !!this._currentNode && this._currentNode.Level != 0
  }

  get enableEditBtn() {
    return !!this._currentNode
  }

  get Name() {
    return this.myForm.get('Name') as FormControl
  }
  get Description() {
    return this.myForm.get('Description') as FormControl
  }


  constructor(private _business: RegionManageBusiness, private _toastrService: ToastrService, private _converter: RegionTreeConverter, private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
  addBtnClick() {
    if (this.state == FormState.add) return
    this.state = FormState.add;
    this._updateForm();
  }
  editBtnClick() {
    if (this.state == FormState.edit) return
    this.state = FormState.edit;
    this._updateForm();
  }
  deleteBtnClick() {
    this.showDialog = true;
    console.log('delete')
  }

  async dialogMsgEvent(status: DialogEnum) {
    this.showDialog = false;
    if (status == DialogEnum.confirm) {
      this._deleteNode()
    } else if (status == DialogEnum.cancel) {

    }
  }

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode[]) {
    this._currentNode = nodes[0];
    // console.log('外部结果', nodes)
    this.state = FormState.none;
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
      if (this._currentNode) {
        let data = this._currentNode.RawData;
        this.myForm.patchValue({
          Name: this._currentNode?.Name ?? '',
          Description: data.Description
        })
      }
    } else if (this.state == FormState.add) {
      this.myForm.enable();
      if (this._currentNode) {
        this.myForm.reset();
      }
    } else if (this.state == FormState.edit) {
      this.myForm.disable();
      if (this._currentNode) {
        let data = this._currentNode.RawData;
        this.myForm.patchValue({
          Name: this._currentNode?.Name ?? '',
          Description: data.Description
        })

      }
      this.Name.enable();
      this.Description.enable();

    }
  }

  private async _addNode() {
    if (this.tree) {
      let model = new RegionManageModel();
      model.Name = this.Name.value;
      model.Description = this.Description.value
      let parentId = this._currentNode ? this._currentNode.Id : '';
      let res = await this._business.addRegion(parentId, model);
      if (res) {
        console.log(res)
        this._toastrService.success('添加成功');
        const node = this._converter.Convert(res);
        this.tree.addNode(node);
        this.onReset();
      }
    }
  }
  private async _editNode() {
    if (this.tree) {
      let id = this._currentNode?.Id ?? '';;
      let model = new RegionManageModel();
      model.Name = this.Name.value;
      model.Description = this.Description.value

      let res = await this._business.editRegion(id, model);
      if (res) {
        this._toastrService.success('编辑成功');
        const node = this._converter.Convert(res);
        this.tree.editNode(node);
        this.onReset();
      }
    }
  }
  private async _deleteNode() {
    if (this.tree) {
      if (this._currentNode?.Id) {
        let res = await this._business.deleteRegion(this._currentNode.Id);
        if (res) {
          this._toastrService.success('删除成功');
          this.tree.deleteNode(this._currentNode);
          this.tree.setDefault()
        }
      }
    }
  }
}
