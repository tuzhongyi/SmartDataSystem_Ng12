import { Component, OnInit } from '@angular/core';
import { DivisionRequestService } from 'src/app/request/division/division-request.service';
import { RankBusiness } from './rank/rank.business';

@Component({
  selector: 'app-garbage-retention-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css'],
  providers: [],
})
export class GarbageRetentionRankComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  loadData() {}
}
