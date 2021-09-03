import { Component, OnInit } from '@angular/core';
import { GarbageRetentionRankBusiness } from '../../business/garbage-retention-rank.business';
import { GarbageRetentionConverter } from './garbage-retention.converter';

@Component({
  selector: 'app-garbage-retention-rank',
  templateUrl: './garbage-retention-rank.component.html',
  styleUrls: ['./garbage-retention-rank.component.css'],
  providers: [GarbageRetentionRankBusiness, GarbageRetentionConverter],
})
export class GarbageRetentionRankComponent implements OnInit {
  constructor(
    private _garbageRetentionRankService: GarbageRetentionRankBusiness,
    private _sdfsdf: GarbageRetentionConverter
  ) {
    console.log(this._sdfsdf);
  }

  ngOnInit(): void {}

  loadData() {
    let data = this._garbageRetentionRankService.list();
    this._sdfsdf.toRank();
  }
}
