import { Component, Input, OnInit } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { MAT_SELECTION_LIST_VALUE_ACCESSOR } from '@angular/material/list';
import { CommonSelectModel } from 'src/app/view-model/common-select.model';
import { CommonSelectDirective } from '../../directives/common-select.directive';
import { CommonOptionDirective } from '../../directives/common-select.option.directive';

@Component({
  selector: 'common-select',
  templateUrl: './common-select.component.html',
  styleUrls: ['./common-select.component.less'],
  providers: [
  ]
})
export class CommonSelectComponent implements OnInit {

  constructor(private aa: CommonSelectDirective, private bb: CommonOptionDirective) {
    console.log(aa)
  }
  // options = [
  //   new CommonSelectModel('a', 'sdf'),
  //   new CommonSelectModel('b', 'ooo')
  // ]
  show = false;

  selectedItems = [];

  ngOnInit(): void {
  }
  toggleHandler() {
    this.show = !this.show;
  }
  selectChange(e: Event) {
    this.show = false;
    // let target = e.target as HTMLElement;
    // console.log(target)
    console.log(this.aa.value)
  }

}
