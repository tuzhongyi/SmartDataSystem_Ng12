import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GarbageComponentsModule } from '../components/garbage-components.module';
import { DaPuQiaoIndexComponent } from './components/dapuqiao-index/dapuqiao-index.component';
import { DaPuQiaoMainEventLevelComponent } from './components/dapuqiao-main-event-level/dapuqiao-main-event-level.component';
import { DapuqiaoMainEventStatisticComponent } from './components/dapuqiao-main-event-statistic/dapuqiao-main-event-statistic.component';
import { DaPuQiaoMainEventVisionComponent } from './components/dapuqiao-main-event-vision/dapuqiao-main-event-vision.component';
import { DapuqiaoMainLineEventComponent } from './components/dapuqiao-main-line-event/dapuqiao-main-line-event.component';
import { DaPuQiaoMainLineFeedbackComponent } from './components/dapuqiao-main-line-feedback/dapuqiao-main-line-feedback.component';
import { DaPuQiaoMainRecordLevelComponent } from './components/dapuqiao-main-record-level/dapuqiao-main-record-level.component';
import { DaPuQiaoMainStationCountComponent } from './components/dapuqiao-main-station-count/dapuqiao-main-station-count.component';
import { DapuqiaoMainSuperviseButtonComponent } from './components/dapuqiao-main-supervise-button/dapuqiao-main-supervise-button.component';
import { DapuqiaoMainSuperviseCompleteItemComponent } from './components/dapuqiao-main-supervise-complete-item/dapuqiao-main-supervise-complete-item.component';
import { DapuqiaoMainSuperviseCompleteComponent } from './components/dapuqiao-main-supervise-complete/dapuqiao-main-supervise-complete.component';
import { DapuqiaoMainSuperviseDetailsComponent } from './components/dapuqiao-main-supervise-details/dapuqiao-main-supervise-details.component';
import { GarbageDaPuQiaoRoutingModule } from './garbage-dapuqiao-routing.module';

@NgModule({
  declarations: [
    DaPuQiaoIndexComponent,
    DaPuQiaoMainEventLevelComponent,
    DapuqiaoMainEventStatisticComponent,
    DaPuQiaoMainStationCountComponent,
    DaPuQiaoMainRecordLevelComponent,
    DaPuQiaoMainEventVisionComponent,
    DapuqiaoMainLineEventComponent,
    DaPuQiaoMainLineFeedbackComponent,
    DapuqiaoMainSuperviseButtonComponent,
    DapuqiaoMainSuperviseDetailsComponent,
    DapuqiaoMainSuperviseCompleteItemComponent,
    DapuqiaoMainSuperviseCompleteComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GarbageDaPuQiaoRoutingModule,
    GarbageComponentsModule,
  ],
  providers: [AsyncPipe],
})
export class GarbageDaPuQiaoModule {}
