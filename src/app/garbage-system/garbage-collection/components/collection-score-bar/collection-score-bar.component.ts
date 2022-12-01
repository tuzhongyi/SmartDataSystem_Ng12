import { Component, OnInit } from '@angular/core';
import { CollectionScoreBarInnerBusiness } from './collection-score-bar-inner.business';

@Component({
  selector: 'collection-score-bar',
  templateUrl: './collection-score-bar.component.html',
  styleUrls: ['./collection-score-bar.component.less'],
  providers: [CollectionScoreBarInnerBusiness],
})
export class CollectionScoreBarComponent implements OnInit {
  constructor(public innerBusiness: CollectionScoreBarInnerBusiness) {}

  ngOnInit(): void {}
}
