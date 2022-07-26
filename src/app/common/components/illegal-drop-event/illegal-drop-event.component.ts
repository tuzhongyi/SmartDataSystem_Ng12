import { Component, OnInit } from '@angular/core';
import { IllegalDropEventBusiness } from './illegal-drop-event.business';

@Component({
  selector: 'howell-illegal-drop-event',
  templateUrl: './illegal-drop-event.component.html',
  styleUrls: ['./illegal-drop-event.component.less'],
  providers: [
    IllegalDropEventBusiness
  ]
})
export class IllegalDropEventComponent implements OnInit {

  constructor(private _business: IllegalDropEventBusiness) { }

  async ngOnInit() {
    let res = await this._business.init();
    console.log(res)
  }

}
