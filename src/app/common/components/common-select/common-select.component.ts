import { Component, Input, OnInit } from '@angular/core';
import { CommonSelectModel } from 'src/app/view-model/common-select.model';

@Component({
  selector: 'common-select',
  templateUrl: './common-select.component.html',
  styleUrls: ['./common-select.component.less']
})
export class CommonSelectComponent implements OnInit {

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
  // selectChange(e: Event) {
  //   this.show = false;
  //   let target = e.target as HTMLElement;
  //   console.log(JSON.parse(target.getAttribute('value')!))
  // }

}
