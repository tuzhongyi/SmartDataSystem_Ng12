import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
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
    private _divisionRequest: DivisionRequestService,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    let userResource = this._localStorageService.userResource;
    if (userResource && userResource.length > 0) {
      let divisionId = userResource[0].Id;
      this._divisionRequest.get(divisionId).then((res) => console.log(res));
    }
  }
}
