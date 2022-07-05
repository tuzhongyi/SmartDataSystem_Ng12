import { Component, OnInit } from '@angular/core';
import { LabelListBusiness } from './label-list.business';

@Component({
  selector: 'howell-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.less'],
  providers: [
    LabelListBusiness
  ]
})
export class LabelListComponent implements OnInit {

  constructor(private _business: LabelListBusiness) { }

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let res = await this._business.init();
    console.log(res)
  }

}
