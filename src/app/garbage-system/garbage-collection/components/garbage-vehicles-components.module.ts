/*
 * @Author: pmx
 * @Date: 2021-09-15 14:43:30
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-16 17:03:46
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularResizeEventModule } from 'angular-resize-event';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { GarbageCollectionIndexComponent } from './collection-index/collection-index.component';
import { GarbageCollectionDivisionListComponent } from './collection-division-list/collection-division-list.component';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import { NegativeCommentRankComponent } from './negative-comment-rank/negative-comment-rank.component';
import { GarbageVehiclesEventStatisticComponent } from './collection-event-statistic/vehicles-event-statistic.component';
import { GarbageComponentsModule } from 'src/app/garbage-system/components/garbage-components.module';
import { GarbageVehiclesDeviceStateComponent } from './collection-device-state/collection-device-state.component';
import { CollectionVehicleComponent } from './collection-vehicle/collection-vehicle.component';
import { CollectionPointWeightComponent } from './collection-point-weight/collection-point-weight.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CollectionStatisticComponent } from './collection-statistic/collection-statistic.component';
import { CollectionScoreComponent } from './collection-score/collection-score.component';
import { CollectionScoreRankComponent } from './collection-score-rank/collection-score-rank.component';
import { CollectionWeightRankComponent } from './collection-weight-rank/collection-weight-rank.component';
import { CollectionMapControlComponent } from './collection-map-control/collection-map-control.component';
import { CollectionMapRouteComponent } from './collection-map-route/collection-map-route.component';
import { CollectionMapRouteDeviceListComponent } from './collection-map-route/collection-map-route-device-list/collection-map-route-device-list.component';
import { CollectionMapRouteControlComponent } from './collection-map-route/collection-map-route-control/collection-map-route-control.component';
import { CollectionScorePieComponent } from './collection-score-pie/collection-score-pie.component';
import { CollectionPointPieComponent } from './collection-point-pie/collection-point-pie.component';
import { CollectionEventLineComponent } from './collection-event-line/collection-event-line.component';

@NgModule({
  declarations: [
    GarbageCollectionIndexComponent,
    GarbageCollectionDivisionListComponent,
    NegativeCommentRankComponent,
    GarbageVehiclesEventStatisticComponent,
    GarbageVehiclesDeviceStateComponent,
    CollectionVehicleComponent,
    CollectionPointWeightComponent,
    CollectionStatisticComponent,
    CollectionScoreComponent,
    CollectionScoreRankComponent,
    CollectionWeightRankComponent,
    CollectionMapControlComponent,
    CollectionMapRouteComponent,
    CollectionMapRouteDeviceListComponent,
    CollectionMapRouteControlComponent,
    CollectionScorePieComponent,
    CollectionPointPieComponent,
    CollectionEventLineComponent,
  ],
  imports: [
    CommonModule,
    AngularResizeEventModule,
    HowellModule,
    MaterialModule,
    FormsModule,
    GarbageComponentsModule,
    NgxEchartsModule,
  ],
  providers: [DownloadBusiness],
  exports: [],
})
export class GarbageCollectionComponentsModule {}
