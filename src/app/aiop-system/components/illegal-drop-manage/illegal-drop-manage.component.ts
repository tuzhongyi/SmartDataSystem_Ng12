import { Component, OnInit } from '@angular/core';
import { CommonTabModel } from 'src/app/common/components/common-tab/common-tab.model';
import { EventNumberChartComponent } from 'src/app/common/components/event-number-chart/event-number-chart.component';
import { EventNumberStatisticComponent } from 'src/app/common/components/event-number-statistic/event-number-statistic.component';
import { IllegalDropEventComponent } from 'src/app/common/components/illegal-drop-event/illegal-drop-event.component';
import { Enum } from 'src/app/enum/enum-helper';

@Component({
  selector: 'app-illegal-drop-manage',
  templateUrl: './illegal-drop-manage.component.html',
  styleUrls: ['./illegal-drop-manage.component.less'],
  providers: [],
})
export class IllegalDropManage implements OnInit {
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
