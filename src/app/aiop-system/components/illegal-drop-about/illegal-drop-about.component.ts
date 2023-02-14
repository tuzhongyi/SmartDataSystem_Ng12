import { Component, OnInit } from '@angular/core';
import { CommonTabModel } from 'src/app/common/components/common-tab/common-tab.model';
import { EventNumberChartComponent } from 'src/app/common/components/event-number-chart/event-number-chart.component';
import { EventNumberStatisticComponent } from 'src/app/common/components/event-number-statistic/event-number-statistic.component';
import { IllegalDropEventComponent } from 'src/app/aiop-system/components/illegal-drop-event/illegal-drop-event.component';
import { Enum } from 'src/app/enum/enum-helper';

@Component({
  selector: 'app-illegal-drop-about',
  templateUrl: './illegal-drop-about.component.html',
  styleUrls: ['./illegal-drop-about.component.less'],
  providers: [],
})
export class IllegalDropAbout implements OnInit {
  tabHeaders: CommonTabModel[] = [];
  componentExpression = IllegalDropEventComponent;

  constructor() {
    this.tabHeaders.push(new CommonTabModel('事件', IllegalDropEventComponent));
    this.tabHeaders.push(
      new CommonTabModel('总图表', EventNumberStatisticComponent)
    );
    this.tabHeaders.push(
      new CommonTabModel('细分图表', EventNumberChartComponent)
    );
  }
  ngOnInit(): void {}

  clickTab(tabModel: CommonTabModel) {
    this.componentExpression = tabModel.componentExpression;
  }
}
