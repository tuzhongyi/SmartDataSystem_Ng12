import { Component, Input, OnInit } from '@angular/core';
import { GarbageDropDurationPanelModel } from './garbage-drop-duration-panel.model';

@Component({
  selector: 'howell-garbage-drop-duration-panel',
  templateUrl: './garbage-drop-duration-panel.component.html',
  styleUrls: ['./garbage-drop-duration-panel.component.less'],
})
export class GarbageDropDurationPanelComponent implements OnInit {
  @Input()
  model = new GarbageDropDurationPanelModel();

  constructor() {}

  ngOnInit(): void {}
}
