import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GarbageComponentsModule } from '../garbage-system/components/garbage-components.module';
import { ElectricBikeRoutingModule } from './electric-bike-routing.module';
import { ElectricBikeIndexComponent } from './index/index.component';
import { GarbageCommitteesModule } from '../garbage-system/committees/garbage-committees.module';
import { ElectricBikeNavicationComponent } from './navication/navication.component';
import { IndexCardComponent } from './cards/index-card/index-card.component';
import { AlarmComponent } from './alarm/alarm.component';
import { DeviceStatisticComponent } from './device-statistic/device-statistic.component';
import { DeviceStatusComponent } from './device-status/device-status.component';
import { AngularResizeEventModule } from 'angular-resize-event';
import { ElectricBikeWindowComponents } from './windows/windows.module';
import { ElectricBikeWidescreenComponents } from './widescreen/widescreen.module';

@NgModule({
  declarations: [
    IndexCardComponent,
    ElectricBikeIndexComponent,
    ElectricBikeNavicationComponent,
    AlarmComponent,
    DeviceStatisticComponent,
    DeviceStatusComponent,
    ...ElectricBikeWindowComponents,

    ...ElectricBikeWidescreenComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ElectricBikeRoutingModule,
    GarbageComponentsModule,
    GarbageCommitteesModule,
    AngularResizeEventModule,
  ],
})
export class ElectricBikeModule {}
