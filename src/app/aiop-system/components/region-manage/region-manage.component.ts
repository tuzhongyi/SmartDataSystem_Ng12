import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormState } from 'src/app/enum/form-state.enum';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
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
  state: FormState = FormState.none;
  FormState = FormState;

  holdStatus = false;
  title = '区域详情';

  myForm = new FormGroup({
    Id: new FormControl('', [Validators.required, Validators.pattern(/^[\d]*$/)]),
    Name: new FormControl('', Validators.required),
    ParentName: new FormControl(''),
    Description: new FormControl('')
  });
  addPlaceHolder = '';

  constructor(private _business: RegionManageBusiness) { }

  ngOnInit(): void {
    this.init();
  }
  async init() {
    let res = await this._business.loadData();
    // console.log(res)
  }
  addBtnClick() {

  }
  deleteBtnClick() {

  }
  searchEvent(condition: string) {

  }

  // 点击树节点
  selectTreeNode(nodes: FlatTreeNode[]) {


  }
  onSubmit() {

  }
  onReset() {

  }

}
