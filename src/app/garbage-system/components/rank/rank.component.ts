import { Component, OnInit } from '@angular/core';
import { IBusiness } from 'src/app/business/Ibusiness';
import { DivisionRequestService } from 'src/app/request/division/division-request.service';
import { StationParams } from 'src/app/request/station/garbage-station-request.params';
import { StationRequestService } from 'src/app/request/station/garbage-station-request.service';
import { RankBusiness } from './rank.business';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css'],
  providers: [
    {
      provide: RankBusiness,
      useFactory: function (business: IBusiness) {
        return new RankBusiness(business);
      },
      deps: [DivisionRequestService],
    },
  ],
})
export class RankComponent implements OnInit {
  constructor(private _rankBusiness: RankBusiness) {}

  ngOnInit(): void {}

  loadData() {
    debugger;
    console.log(this._rankBusiness);
    this._rankBusiness.list();
  }
}
