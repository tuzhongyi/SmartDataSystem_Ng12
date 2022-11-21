import { Component, OnInit } from '@angular/core';
import { CollectionEventLineBusiness } from './collection-event-line.business';

@Component({
  selector: 'collection-event-line',
  templateUrl: './collection-event-line.component.html',
  styleUrls: ['./collection-event-line.component.less'],
  providers: [CollectionEventLineBusiness],
})
export class CollectionEventLineComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
