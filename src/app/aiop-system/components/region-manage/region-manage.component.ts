import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormState } from 'src/app/enum/form-state.enum';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';

@Component({
  selector: 'howell-region-manage',
  templateUrl: './region-manage.component.html',
  styleUrls: ['./region-manage.component.less']
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

  constructor() { }

  ngOnInit(): void {
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
