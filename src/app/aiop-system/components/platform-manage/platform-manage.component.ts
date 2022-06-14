import { Component, OnInit } from '@angular/core';
import { DivisionsUrl } from 'src/app/network/url/aiop/Garbage-management/divisions.url';
import { PlatformManageBusiness } from './platform-manage.business';

@Component({
  selector: 'howell-platform-manage',
  templateUrl: './platform-manage.component.html',
  styleUrls: ['./platform-manage.component.less'],
  providers: [
    PlatformManageBusiness
  ]
})
export class PlatformManageComponent implements OnInit {

  constructor(private _business: PlatformManageBusiness) { }

  ngOnInit(): void {
    this._business.list()
  }

}
