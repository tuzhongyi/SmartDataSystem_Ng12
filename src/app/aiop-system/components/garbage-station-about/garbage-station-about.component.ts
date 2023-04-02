import { Component, OnInit } from '@angular/core';
import { CommonTabModel } from 'src/app/common/components/common-tab/common-tab.model';
import { GarbageStationListComponent } from '../garbage-station-list/garbage-station-list.component';

@Component({
  selector: 'garbage-station-about',
  templateUrl: './garbage-station-about.component.html',
  styleUrls: ['./garbage-station-about.component.less'],
})
export class GarbageStationAboutComponent implements OnInit {
  tabHeaders: CommonTabModel[] = [];
  componentExpression = GarbageStationListComponent;

  constructor() {
    this.tabHeaders.push(
      new CommonTabModel('列表', GarbageStationListComponent)
    );
  }

  ngOnInit(): void {}
  clickTab(tabModel: CommonTabModel) {
    this.componentExpression = tabModel.componentExpression;
  }
}
