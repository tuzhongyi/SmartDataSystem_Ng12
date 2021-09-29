import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/global/service/session-storage.service';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.less'],
})
export class DivisionListComponent implements OnInit {
  constructor(
    private _divisiondd: DivisionRequestService,
    private _sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    // divisionId
    let userResource = this._sessionStorageService.userResource;
    if (userResource && userResource.length > 0) {
      let divisionId = userResource[0].Id;

      let p = new GetDivisionsParams();
      p.ParentId = '310109011000';
      // this._divisiondd.list(p).then((res) => console.log(res));
    }
  }
}
