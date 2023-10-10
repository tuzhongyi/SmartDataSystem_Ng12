import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GarbageComponentsModule } from '../components/garbage-components.module';
import { GarbageCommitteesRoutingModule } from './garbage-committees-routing.module';
import { CommitteesHistroyTableComponent } from './histroy-table/committees-history-table.component';
import { CommitteesIndexComponent } from './index/index.component';
import { CommitteesMessageBarComponent } from './message-bar/message-bar.component';
import { MobileBindingComponent } from './mobile/mobile-binding/mobile-binding.component';
import { MobileChangeComponent } from './mobile/mobile-change/mobile-change.component';
import { MobileViewComponent } from './mobile/mobile-change/view/mobile-view.component';
import { CommitteesNavicationComponent } from './navication/committees-navication.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { DivisionInformationComponent } from './station-information/station-information.component';
import { CommitteesStatisticComponent } from './statistic/committees-statistic.component';
import { StatisticSummaryEventRatioChartComponent } from './summary/charts/event-ratio/statistic-summary-event-ratio-chart.component';
import { StatisticSummaryIllegalDropChartComponent } from './summary/charts/line-chart/statistic-summary-line-chart.component';
import { StatisticSummaryStationEventChartComponent } from './summary/charts/station-event/statistic-summary-station-event-chart.component';
import { StatisticSummaryChartsComponent } from './summary/charts/statistic-summary-charts.component';
import { StatisticSummaryTaskChartComponent } from './summary/charts/task-statistic/statistic-summary-task-chart.component';
import { StatisticSummaryHeaderComponent } from './summary/header/statistic-summary-header.component';
import { StatisticSummaryComponent } from './summary/statistic-summary.component';
import { TaskTableComponent } from './task-table/task-table.component';

@NgModule({
  declarations: [
    CommitteesIndexComponent,
    CommitteesNavicationComponent,
    DivisionInformationComponent,
    CommitteesStatisticComponent,
    TaskTableComponent,
    CommitteesHistroyTableComponent,
    CommitteesMessageBarComponent,

    MobileChangeComponent,
    MobileViewComponent,
    MobileBindingComponent,

    PasswordChangeComponent,

    StatisticSummaryComponent,
    StatisticSummaryHeaderComponent,
    StatisticSummaryChartsComponent,
    StatisticSummaryTaskChartComponent,
    StatisticSummaryStationEventChartComponent,
    StatisticSummaryIllegalDropChartComponent,
    StatisticSummaryEventRatioChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GarbageCommitteesRoutingModule,
    GarbageComponentsModule,
  ],
})
export class GarbageCommitteesModule {}
