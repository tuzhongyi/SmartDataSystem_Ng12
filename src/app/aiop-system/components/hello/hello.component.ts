import { Component, OnInit } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { StationRequestService } from 'src/app/network/request/station/garbage-station-request.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
})
export class HelloComponent implements OnInit {
  constructor(
    private divisionService: DivisionRequestService,
    private stationService: StationRequestService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  async loadData() {
    let params = new GetDivisionsParams();
    params.PageSize = 99999;
    params.DivisionType = DivisionType.County;
    params.ParentId = '310101000000';
    let res = await this.divisionService.list(params);
    console.log(res);
  }
}
