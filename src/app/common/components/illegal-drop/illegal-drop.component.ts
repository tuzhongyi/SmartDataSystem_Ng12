import { Component, OnInit } from '@angular/core';
import { ClassConstructor } from 'class-transformer';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { CommonTabModel } from 'src/app/common/components/common-tab/common-tab.model';
import { EventNumberChartComponent } from '../event-number-chart/event-number-chart.component';
import { EventNumberStatisticComponent } from '../event-number-statistic/event-number-statistic.component';
import { IllegalDropEventComponent } from '../../../aiop-system/components/illegal-drop-event/illegal-drop-event.component';

@Component({
  selector: 'howell-illegal-drop',
  templateUrl: './illegal-drop.component.html',
  styleUrls: ['./illegal-drop.component.less'],
})
export class IllegalDropComponent implements OnInit {
  tabHeaders: CommonTabModel[] = [];

  currentComponent = IllegalDropEventComponent;
  current = 2;

  // 虹口区: 310109000000
  // 欧阳路街道: 310109009000

  resourceId: string = '310109000000';

  resourceType: UserResourceType = UserResourceType.County;

  resourceDefault: UserResourceType = UserResourceType.Committees;

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
    this.currentComponent = tabModel.componentExpression;
  }
}
