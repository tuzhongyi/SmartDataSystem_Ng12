import { Component, OnInit } from '@angular/core';
import { IBusiness } from 'src/app/business/Ibusiness';
import { Division } from 'src/app/network/model/division.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { RankBusiness } from './rank.business';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css'],
  // providers: [
  //   {
  //     provide: RankBusiness,
  //     useFactory: function (business: IBusiness<Division>) {
  //       return new RankBusiness(business);
  //     },
  //     deps: [DivisionRequestService],
  //   },
  // ],
})
export class RankComponent implements OnInit {
  // constructor(private _rankBusiness: RankBusiness) {}
  ngOnInit(): void {}
  // loadData() {
  //   debugger;
  //   console.log(this._rankBusiness);
  //   this._rankBusiness.toRank(this._rankBusiness.list());
  // }
  loadData() {}
}
